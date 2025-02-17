"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { supabase } from "@/lib/supabase-client"

export function PaymentLinkGenerator() {
  const [amount, setAmount] = useState("")
  const [currency, setCurrency] = useState("USD")
  const [generatedLink, setGeneratedLink] = useState("")

  const handleGenerateLink = async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        throw new Error("Not authenticated")
      }

      const response = await fetch("/api/payment-links/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ amount: Number.parseFloat(amount), currency }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate payment link")
      }

      const data = await response.json()
      setGeneratedLink(data.paymentLink.url)
      toast({
        title: "Payment Link Generated",
        description: "Your payment link has been created successfully.",
      })
    } catch (error) {
      console.error("Error generating payment link:", error)
      toast({
        title: "Error",
        description: "Failed to generate payment link. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="amount">Amount</Label>
        <Input
          type="number"
          id="amount"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="currency">Currency</Label>
        <Select value={currency} onValueChange={setCurrency}>
          <SelectTrigger id="currency">
            <SelectValue placeholder="Select currency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="USD">USD</SelectItem>
            <SelectItem value="EUR">EUR</SelectItem>
            <SelectItem value="GBP">GBP</SelectItem>
            <SelectItem value="SOL">SOL</SelectItem>
            <SelectItem value="USDC">USDC</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button onClick={handleGenerateLink}>Generate Payment Link</Button>
      {generatedLink && (
        <div className="mt-4">
          <Label htmlFor="generated-link">Generated Payment Link</Label>
          <Input id="generated-link" value={generatedLink} readOnly className="mt-1" />
        </div>
      )}
    </div>
  )
}

