"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"

export function Payouts() {
  const [payouts, setPayouts] = useState([
    { id: 1, amount: 1000, currency: "USD", status: "Completed", date: "2023-06-01" },
    { id: 2, amount: 500, currency: "USDC", status: "Pending", date: "2023-06-02" },
  ])

  const [newPayoutAmount, setNewPayoutAmount] = useState("")
  const [newPayoutCurrency, setNewPayoutCurrency] = useState("")

  const handleCreatePayout = () => {
    // In a real application, this would call an API to create a new payout
    const newPayout = {
      id: payouts.length + 1,
      amount: Number.parseFloat(newPayoutAmount),
      currency: newPayoutCurrency,
      status: "Pending",
      date: new Date().toISOString().split("T")[0],
    }
    setPayouts([...payouts, newPayout])
    setNewPayoutAmount("")
    setNewPayoutCurrency("")
    toast({
      title: "Payout Requested",
      description: "Your payout request has been submitted successfully.",
    })
  }

  return (
    <div className="space-y-4">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="payout-amount">Payout Amount</Label>
        <Input
          type="number"
          id="payout-amount"
          value={newPayoutAmount}
          onChange={(e) => setNewPayoutAmount(e.target.value)}
          placeholder="Enter amount"
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="payout-currency">Currency</Label>
        <Select value={newPayoutCurrency} onValueChange={setNewPayoutCurrency}>
          <SelectTrigger id="payout-currency">
            <SelectValue placeholder="Select currency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="USD">USD</SelectItem>
            <SelectItem value="USDC">USDC</SelectItem>
            <SelectItem value="SOL">SOL</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button onClick={handleCreatePayout}>Request Payout</Button>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Amount</TableHead>
            <TableHead>Currency</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payouts.map((payout) => (
            <TableRow key={payout.id}>
              <TableCell>{payout.amount}</TableCell>
              <TableCell>{payout.currency}</TableCell>
              <TableCell>{payout.status}</TableCell>
              <TableCell>{payout.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

