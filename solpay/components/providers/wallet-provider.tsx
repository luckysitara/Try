"use client"

import type React from "react"

import { WalletModalProvider } from "@solana/wallet-adapter-react-ui"
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react"
import { endpoint, wallets } from "@/lib/wallet-config"
import { useMemo } from "react"

require("@solana/wallet-adapter-react-ui/styles.css")

export function SolanaWalletProvider({ children }: { children: React.ReactNode }) {
  const connectionConfig = useMemo(
    () => ({
      commitment: "confirmed" as const,
      confirmTransactionInitialTimeout: 60000,
    }),
    [],
  )

  return (
    <ConnectionProvider endpoint={endpoint} config={connectionConfig}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

