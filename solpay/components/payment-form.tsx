"use client"

import { useState, useEffect } from "react"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import { useJupiter } from "@jup-ag/react-hook"
import { PublicKey } from "@solana/web3.js"
import { TipLink } from "@tiplink/api"
import { QRCodeSVG } from "qrcode.react"
import { createPaymentRequest, processPayment } from "../lib/anchor-client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function PaymentForm() {
  const { connection } = useConnection()
  const { publicKey, sendTransaction } = useWallet()
  const [amount, setAmount] = useState("")
  const [description, setDescription] = useState("")
  const [selectedToken, setSelectedToken] = useState("SOL")
  const [paymentLink, setPaymentLink] = useState("")
  const [qrCode, setQrCode] = useState("")

  const jupiter = useJupiter({
    amount: Number.parseFloat(amount) * 1e9, // Convert to lamports
    inputMint: new PublicKey("So11111111111111111111111111111111111111112"), // SOL mint
    outputMint: new PublicKey(selectedToken),
    slippageBps: 50, // 0.5% slippage
  })

  useEffect(() => {
    if (paymentLink) {
      setQrCode(paymentLink)
    }
  }, [paymentLink])

  const handleCreatePayment = async () => {
    if (!publicKey) return

    try {
      const paymentRequest = await createPaymentRequest(
        connection,
        publicKey,
        Number.parseFloat(amount) * 1e9,
        description,
        selectedToken !== "SOL" ? new PublicKey(selectedToken) : null,
      )

      const tiplink = await TipLink.create()
      const paymentUrl = `${window.location.origin}/pay/${paymentRequest.toString()}`
      const tiplinkUrl = tiplink.url.toString() + "?amount=" + amount + "&recipient=" + publicKey.toString()

      setPaymentLink(tiplinkUrl)
    } catch (error) {
      console.error("Error creating payment:", error)
    }
  }

  const handleProcessPayment = async () => {
    if (!publicKey) return

    try {
      if (selectedToken !== "SOL") {
        const { execute } = await jupiter.exchange()
        const swapResult = await execute()
        if ("error" in swapResult) {
          throw new Error(swapResult.error)
        }
      }

      await processPayment(connection, publicKey, new PublicKey(paymentLink.split("recipient=")[1]))
    } catch (error) {
      console.error("Error processing payment:", error)
    }
  }

  return (
    <div className="space-y-4">
      <WalletMultiButton />
      <div>
        <Label htmlFor="amount">Amount</Label>
        <Input
          id="amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter description"
        />
      </div>
      <div>
        <Label htmlFor="token">Token</Label>
        <Select value={selectedToken} onValueChange={setSelectedToken}>
          <SelectTrigger id="token">
            <SelectValue placeholder="Select token" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="SOL">SOL</SelectItem>
            <SelectItem value="EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v">USDC</SelectItem>
            {/* Add more tokens as needed */}
          </SelectContent>
        </Select>
      </div>
      <Button onClick={handleCreatePayment}>Create Payment</Button>
      {paymentLink && (
        <div>
          <p>Payment Link: {paymentLink}</p>
          <QRCodeSVG value={qrCode} />
        </div>
      )}
      <Button onClick={handleProcessPayment}>Process Payment</Button>
    </div>
  )
}

