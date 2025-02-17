-- Create loyalty_points table
CREATE TABLE IF NOT EXISTS loyalty_points (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  points_balance INTEGER DEFAULT 0,
  total_points_earned INTEGER DEFAULT 0,
  last_transaction_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create loyalty_transactions table
CREATE TABLE IF NOT EXISTS loyalty_transactions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  points INTEGER NOT NULL,
  transaction_type TEXT NOT NULL, -- 'EARN' or 'REDEEM'
  payment_id UUID REFERENCES payment_links(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  merchant_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  amount DECIMAL(18, 8) NOT NULL,
  currency TEXT NOT NULL,
  interval TEXT NOT NULL, -- 'daily', 'weekly', 'monthly', 'yearly'
  next_payment_date TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT NOT NULL, -- 'active', 'paused', 'cancelled'
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create cross_chain_transactions table
CREATE TABLE IF NOT EXISTS cross_chain_transactions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  from_chain TEXT NOT NULL,
  to_chain TEXT NOT NULL,
  from_token TEXT NOT NULL,
  to_token TEXT NOT NULL,
  amount DECIMAL(18, 8) NOT NULL,
  status TEXT NOT NULL, -- 'pending', 'completed', 'failed'
  source_tx_hash TEXT,
  destination_tx_hash TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create multi_sig_wallets table
CREATE TABLE IF NOT EXISTS multi_sig_wallets (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  threshold INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create multi_sig_signers table
CREATE TABLE IF NOT EXISTS multi_sig_signers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  wallet_id UUID REFERENCES multi_sig_wallets(id) ON DELETE CASCADE,
  signer_pubkey TEXT NOT NULL,
  signer_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create stored procedure for adding loyalty points
CREATE OR REPLACE FUNCTION add_loyalty_points(
  p_user_id UUID,
  p_points INTEGER
)
RETURNS INTEGER
LANGUAGE plpgsql
AS $$
DECLARE
  v_current_balance INTEGER;
BEGIN
  -- Insert or update loyalty points
  INSERT INTO loyalty_points (user_id, points_balance, total_points_earned)
  VALUES (p_user_id, p_points, p_points)
  ON CONFLICT (user_id) DO UPDATE
  SET points_balance = loyalty_points.points_balance + p_points,
      total_points_earned = loyalty_points.total_points_earned + p_points,
      last_transaction_at = CURRENT_TIMESTAMP,
      updated_at = CURRENT_TIMESTAMP
  RETURNING points_balance INTO v_current_balance;

  -- Record the transaction
  INSERT INTO loyalty_transactions (
    user_id,
    points,
    transaction_type
  ) VALUES (
    p_user_id,
    p_points,
    'EARN'
  );

  RETURN v_current_balance;
END;
$$;

-- Create stored procedure for redeeming loyalty points
CREATE OR REPLACE FUNCTION redeem_loyalty_points(
  p_user_id UUID,
  p_points INTEGER
)
RETURNS INTEGER
LANGUAGE plpgsql
AS $$
DECLARE
  v_current_balance INTEGER;
BEGIN
  -- Check if user has enough points
  SELECT points_balance INTO v_current_balance
  FROM loyalty_points
  WHERE user_id = p_user_id;

  IF v_current_balance IS NULL OR v_current_balance < p_points THEN
    RAISE EXCEPTION 'Insufficient points balance';
  END IF;

  -- Update points balance
  UPDATE loyalty_points
  SET points_balance = points_balance - p_points,
      last_transaction_at = CURRENT_TIMESTAMP,
      updated_at = CURRENT_TIMESTAMP
  WHERE user_id = p_user_id
  RETURNING points_balance INTO v_current_balance;

  -- Record the transaction
  INSERT INTO loyalty_transactions (
    user_id,
    points,
    transaction_type
  ) VALUES (
    p_user_id,
    p_points,
    'REDEEM'
  );

  RETURN v_current_balance;
END;
$$;

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_loyalty_points_user_id ON loyalty_points(user_id);
CREATE INDEX IF NOT EXISTS idx_loyalty_transactions_user_id ON loyalty_transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_merchant_id ON subscriptions(merchant_id);
CREATE INDEX IF NOT EXISTS idx_cross_chain_transactions_user_id ON cross_chain_transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_multi_sig_wallets_id ON multi_sig_wallets(id);
CREATE INDEX IF NOT EXISTS idx_multi_sig_signers_wallet_id ON multi_sig_signers(wallet_id);

-- Enable Row Level Security (RLS)
ALTER TABLE loyalty_points ENABLE ROW LEVEL SECURITY;
ALTER TABLE loyalty_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE cross_chain_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE multi_sig_wallets ENABLE ROW LEVEL SECURITY;
ALTER TABLE multi_sig_signers ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own loyalty points"
ON loyalty_points FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own loyalty transactions"
ON loyalty_transactions FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can view their subscriptions"
ON subscriptions FOR SELECT
USING (auth.uid() = user_id OR auth.uid() = merchant_id);

CREATE POLICY "Users can view their cross-chain transactions"
ON cross_chain_transactions FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can view their multi-sig wallets"
ON multi_sig_wallets FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM multi_sig_signers
    WHERE wallet_id = multi_sig_wallets.id
    AND signer_pubkey = auth.jwt()->>'sub'
  )
);

CREATE POLICY "Users can view multi-sig signers"
ON multi_sig_signers FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM multi_sig_wallets
    WHERE id = multi_sig_signers.wallet_id
    AND EXISTS (
      SELECT 1 FROM multi_sig_signers ms
      WHERE ms.wallet_id = multi_sig_wallets.id
      AND ms.signer_pubkey = auth.jwt()->>'sub'
    )
  )
);

