"use client"

import { useState } from "react"
import type { Wallet } from "@solana/wallet-adapter-react"
import { useConnection } from "@solana/wallet-adapter-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Check, WalletIcon } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Note: These imports are placeholders. You'll need to implement or import actual functions for Solpay
import { connectWallet, generatePaymentLink, confirmPayment } from "./solpay-utils"

export default function SolpayForm() {
  const [wallet, setWallet] = useState<Wallet | null>(null)
  const [selectedToken, setSelectedToken] = useState("")
  const [amount, setAmount] = useState("")
  const [paymentLink, setPaymentLink] = useState("")
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const { connection } = useConnection()

  const handleConnectWallet = async () => {
    try {
      const connectedWallet = await connectWallet()
      setWallet(connectedWallet)
    } catch (error) {
      console.error("Failed to connect wallet:", error)
      setStatus("error")
    }
  }

  const handleSelectToken = (value: string) => {
    setSelectedToken(value)
  }

  const handleGenerateLink = async () => {
    if (!wallet || !selectedToken || !amount) return
    try {
      const link = await generatePaymentLink(wallet, selectedToken, Number.parseFloat(amount))
      setPaymentLink(link)
    } catch (error) {
      console.error("Failed to generate payment link:", error)
      setStatus("error")
    }
  }

  const handleConfirmPayment = async () => {
    if (!wallet || !selectedToken || !amount) return
    try {
      await confirmPayment(wallet, selectedToken, Number.parseFloat(amount), connection)
      setStatus("success")
    } catch (error) {
      console.error("Payment failed:", error)
      setStatus("error")
    }
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Solpay Payment</CardTitle>
        <CardDescription>Fast and secure payments on Solana</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="wallet">Wallet</Label>
            <Button id="wallet" onClick={handleConnectWallet} disabled={!!wallet}>
              {wallet ? "Connected" : "Connect Wallet"}
              <WalletIcon className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="token">Token</Label>
            <Select onValueChange={handleSelectToken} disabled={!wallet}>
              <SelectTrigger id="token">
                <SelectValue placeholder="Select token" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="SOL">SOL</SelectItem>
                <SelectItem value="USDC">USDC</SelectItem>
                <SelectItem value="USDT">USDT</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              placeholder="Enter amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              disabled={!wallet || !selectedToken}
            />
          </div>
          {paymentLink && (
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="link">Payment Link</Label>
              <Input id="link" value={paymentLink} readOnly />
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handleGenerateLink} disabled={!wallet || !selectedToken || !amount}>
          Generate Link
        </Button>
        <Button onClick={handleConfirmPayment} disabled={!wallet || !selectedToken || !amount}>
          Pay Now
        </Button>
      </CardFooter>
      {status === "success" && (
        <Alert variant="default">
          <Check className="h-4 w-4" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>Your payment was processed successfully.</AlertDescription>
        </Alert>
      )}
      {status === "error" && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>There was a problem with your payment. Please try again.</AlertDescription>
        </Alert>
      )}
    </Card>
  )
}

