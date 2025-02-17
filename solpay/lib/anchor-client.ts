import * as anchor from "@project-serum/anchor"
import { Program } from "@project-serum/anchor"
import { PublicKey, type Connection, Keypair } from "@solana/web3.js"
import { SolpayAnchor } from "./solpay_anchor"

export const initializeAnchorClient = (connection: Connection, wallet: anchor.Wallet) => {
  const provider = new anchor.AnchorProvider(connection, wallet, {})
  anchor.setProvider(provider)

  const programId = new PublicKey("YOUR_PROGRAM_ID_HERE")
  const program = new Program(SolpayAnchor, programId)

  return { program, provider }
}

export const createPaymentRequest = async (
  connection: Connection,
  merchant: PublicKey,
  amount: number,
  description: string,
  tokenMint: PublicKey | null,
) => {
  const wallet = new anchor.Wallet(Keypair.generate()) // This should be the merchant's wallet
  const { program } = initializeAnchorClient(connection, wallet)

  const [paymentRequest, _] = await PublicKey.findProgramAddress(
    [Buffer.from("payment-request"), merchant.toBuffer(), Buffer.from(description)],
    program.programId,
  )

  await program.methods
    .createPaymentRequest(new anchor.BN(amount), description, tokenMint)
    .accounts({
      paymentRequest: paymentRequest,
      merchant: merchant,
      systemProgram: anchor.web3.SystemProgram.programId,
    })
    .signers([wallet.payer])
    .rpc()

  return paymentRequest
}

export const processPayment = async (connection: Connection, payer: PublicKey, merchant: PublicKey) => {
  const wallet = new anchor.Wallet(Keypair.generate()) // This should be the payer's wallet
  const { program } = initializeAnchorClient(connection, wallet)

  const [paymentRequest, _] = await PublicKey.findProgramAddress(
    [Buffer.from("payment-request"), merchant.toBuffer()],
    program.programId,
  )

  await program.methods
    .processPayment()
    .accounts({
      paymentRequest: paymentRequest,
      merchant: merchant,
      payer: payer,
      systemProgram: anchor.web3.SystemProgram.programId,
    })
    .signers([wallet.payer])
    .rpc()
}

