import * as anchor from "@project-serum/anchor"
import type { Program } from "@project-serum/anchor"
import type { SolpayAnchor } from "../target/types/solpay_anchor"
import { expect } from "chai"

describe("solpay_anchor", () => {
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)

  const program = anchor.workspace.SolpayAnchor as Program<SolpayAnchor>

  const merchant = anchor.web3.Keypair.generate()
  const payer = anchor.web3.Keypair.generate()

  it("Creates a payment request", async () => {
    const amount = new anchor.BN(1_000_000_000) // 1 SOL
    const description = "Test payment"

    const [paymentRequest, _] = await anchor.web3.PublicKey.findProgramAddress(
      [Buffer.from("payment-request"), merchant.publicKey.toBuffer()],
      program.programId,
    )

    await program.methods
      .createPaymentRequest(amount, description)
      .accounts({
        paymentRequest: paymentRequest,
        merchant: merchant.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([merchant])
      .rpc()

    const paymentRequestAccount = await program.account.paymentRequest.fetch(paymentRequest)

    expect(paymentRequestAccount.merchant.toString()).to.equal(merchant.publicKey.toString())
    expect(paymentRequestAccount.amount.toNumber()).to.equal(amount.toNumber())
    expect(paymentRequestAccount.description).to.equal(description)
    expect(paymentRequestAccount.paid).to.be.false
  })

  it("Processes a payment", async () => {
    const amount = new anchor.BN(1_000_000_000) // 1 SOL
    const description = "Test payment"

    const [paymentRequest, _] = await anchor.web3.PublicKey.findProgramAddress(
      [Buffer.from("payment-request"), merchant.publicKey.toBuffer()],
      program.programId,
    )

    // Airdrop some SOL to the payer
    await provider.connection.requestAirdrop(payer.publicKey, 2_000_000_000)

    // Create payment request
    await program.methods
      .createPaymentRequest(amount, description)
      .accounts({
        paymentRequest: paymentRequest,
        merchant: merchant.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([merchant])
      .rpc()

    // Fund the payer account
    await provider.connection.requestAirdrop(payer.publicKey, amount.toNumber() + 100000000)

    // Process payment
    await program.methods
      .processPayment()
      .accounts({
        paymentRequest: paymentRequest,
        merchant: merchant.publicKey,
        payer: payer.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([payer])
      .rpc()

    const paymentRequestAccount = await program.account.paymentRequest.fetch(paymentRequest)

    expect(paymentRequestAccount.paid).to.be.true

    const merchantBalance = await provider.connection.getBalance(merchant.publicKey)
    expect(merchantBalance).to.be.at.least(amount.toNumber())
  })
})

