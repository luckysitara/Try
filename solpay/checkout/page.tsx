"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CheckoutPage() {
  const [amount, setAmount] = useState("100")
  const [currency, setCurrency] = useState("USD")
  const [paymentMethod, setPaymentMethod] = useState("crypto")

  const handlePayment = () => {
    // In a real application, this would initiate the payment process
    console.log("Processing payment:", { amount, currency, paymentMethod })
  }

  return (
    <div className="container mx-auto flex items-center justify-center min-h-screen">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="w-[400px]">
          <CardHeader>
            <CardTitle>Checkout</CardTitle>
            <CardDescription>Complete your purchase using Solpay</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
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
              <Tabs value={paymentMethod} onValueChange={setPaymentMethod}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="crypto">Crypto</TabsTrigger>
                  <TabsTrigger value="fiat">Fiat</TabsTrigger>
                </TabsList>
                <TabsContent value="crypto">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="wallet">Wallet Address</Label>
                    <Input id="wallet" placeholder="Enter your Solana wallet address" />
                  </div>
                </TabsContent>
                <TabsContent value="fiat">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="card">Card Number</Label>
                    <Input id="card" placeholder="Enter your card number" />
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={handlePayment}>
              Pay Now
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}

