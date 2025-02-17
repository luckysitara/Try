use anchor_lang::prelude::*;
use anchor_lang::solana_program::system_program;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod solpay_anchor {
    use super::*;

    pub fn create_payment_request(
        ctx: Context<CreatePaymentRequest>,
        amount: u64,
        description: String,
        token_mint: Option<Pubkey>,
    ) -> Result<()> {
        let payment_request = &mut ctx.accounts.payment_request;
        let merchant = &ctx.accounts.merchant;

        payment_request.merchant = merchant.key();
        payment_request.amount = amount;
        payment_request.description = description;
        payment_request.paid = false;
        payment_request.token_mint = token_mint;

        Ok(())
    }

    pub fn process_payment(ctx: Context<ProcessPayment>) -> Result<()> {
        let payment_request = &mut ctx.accounts.payment_request;
        let merchant = &ctx.accounts.merchant;
        let payer = &ctx.accounts.payer;

        if payment_request.paid {
            return Err(ProgramError::PaymentAlreadyProcessed.into());
        }

        let amount = payment_request.amount;

        if let Some(token_mint) = payment_request.token_mint {
            // Token transfer logic here (simplified)
            // In a real implementation, you'd use the Token program to transfer tokens
            msg!("Token transfer of {} tokens from mint {}", amount, token_mint);
        } else {
            // SOL transfer
            let cpi_context = CpiContext::new(
                ctx.accounts.system_program.to_account_info(),
                system_program::Transfer {
                    from: payer.to_account_info(),
                    to: merchant.to_account_info(),
                },
            );
            system_program::transfer(cpi_context, amount)?;
        }

        payment_request.paid = true;

        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(amount: u64, description: String, token_mint: Option<Pubkey>)]
pub struct CreatePaymentRequest<'info> {
    #[account(
        init,
        payer = merchant,
        space = 8 + 32 + 8 + 200 + 1 + 32, // Discriminator + Pubkey + u64 + String (max 200 chars) + bool + Option<Pubkey>
        seeds = [b"payment-request", merchant.key().as_ref(), description.as_bytes()],
        bump
    )]
    pub payment_request: Account<'info, PaymentRequest>,
    #[account(mut)]
    pub merchant: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct ProcessPayment<'info> {
    #[account(
        mut,
        seeds = [b"payment-request", payment_request.merchant.as_ref(), payment_request.description.as_bytes()],
        bump,
        has_one = merchant,
    )]
    pub payment_request: Account<'info, PaymentRequest>,
    #[account(mut)]
    pub merchant: AccountInfo<'info>,
    #[account(mut)]
    pub payer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct PaymentRequest {
    pub merchant: Pubkey,
    pub amount: u64,
    pub description: String,
    pub paid: bool,
    pub token_mint: Option<Pubkey>,
}

#[error_code]
pub enum ProgramError {
    #[msg("This payment has already been processed")]
    PaymentAlreadyProcessed,
}

