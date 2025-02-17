import type { Program } from "@project-serum/anchor"
import { PublicKey } from "@solana/web3.js"
import type { Idl } from "@project-serum/anchor"

export interface SolpayAnchorProgram extends Program<SolpayAnchorIdl> {}

export interface SolpayAnchorIdl extends Idl {
  instructions: {
    createPaymentRequest: {
      args: {
        amount: number
        description: string
      }
      accounts: {
        paymentRequest: PublicKey
        merchant: PublicKey
        systemProgram: PublicKey
      }
    }
    processPayment: {
      args: {}
      accounts: {
        paymentRequest: PublicKey
        merchant: PublicKey
        payer: PublicKey
        systemProgram: PublicKey
      }
    }
  }
  accounts: {
    PaymentRequest: {
      merchant: PublicKey
      amount: number
      description: string
      paid: boolean
    }
  }
  errors: {
    PaymentAlreadyProcessed: {
      code: number
      msg: string
    }
  }
}

export const SolpayAnchor = {
  idlAddress: "Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS",
  programId: new PublicKey("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS"),
}

