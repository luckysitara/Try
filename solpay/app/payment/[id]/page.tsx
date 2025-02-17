"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { useWallet } from "@solana/wallet-adapter-react"
import { SwapInterface } from "@/components/swap-interface"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"

export default function PaymentPage() {
  const { id } = useParams()
  const [paymentDetails, setPaymentDetails] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const wallet = useWallet()

  useEffect(() => {
    fetchPaymentDetails()
  }, []) // Removed unnecessary dependency 'id'

  async function fetchPaymentDetails() {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/payments/${id}`)
      if (!response.ok) {
        throw new Error("Failed to fetch payment details")
      }
      const data = await response.json()
      setPaymentDetails(data)
    } catch (error) {
      console.error("Error fetching payment details:", error)
      toast({
        title: "Error",
        description: "Failed to fetch payment details. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function handlePayment() {
    if (!wallet.publicKey) {
      toast({
        title: "Error",
        description: "Please connect your wallet first.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch("/api/payments/process", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentLinkId: id,
          fromPubkey: wallet.publicKey.toString(),
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to process payment")
      }

      const result = await response.json()
      toast({
        title: "Success",
        description: "Payment processed successfully.",
      })
    } catch (error) {
      console.error("Error processing payment:", error)
      toast({
        title: "Error",
        description: "Failed to process payment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return <div className="animate-pulse">Loading...</div>
  }

  if (!paymentDetails) {
    return <div>Payment not found</div>
  }

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <h1 className="text-3xl font-bold mb-6 text-solpay-purple">Payment Details</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8 animate-slide-in">
        <p className="text-lg mb-2">
          <span className="font-semibold">Amount:</span> {paymentDetails.amount} {paymentDetails.currency}
        </p>
        <p className="text-lg mb-4">
          <span className="font-semibold">Description:</span> {paymentDetails.description}
        </p>
        <Button
          onClick={handlePayment}
          disabled={isLoading || !wallet.publicKey}
          className="w-full bg-solpay-green hover:bg-solpay-blue text-white transition-colors duration-200"
        >
          {isLoading ? "Processing..." : "Pay Now"}
        </Button>
      </div>
      <SwapInterface amount={paymentDetails.amount} currency={paymentDetails.currency} />
    </div>
  )
}

