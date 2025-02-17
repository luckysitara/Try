"use client"

import { useWallet } from "@solana/wallet-adapter-react"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import { Button } from "@/components/ui/button"

export function WalletConnectButton() {
  const { wallet, connected } = useWallet()

  if (!wallet) {
    return (
      <Button variant="outline" className="w-[200px]">
        Connect Wallet
      </Button>
    )
  }

  return <WalletMultiButton className="wallet-adapter-button" />
}

