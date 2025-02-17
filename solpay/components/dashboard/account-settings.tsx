"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function AccountSettings() {
  const [businessName, setBusinessName] = useState("My Solana Business")
  const [email, setEmail] = useState("business@example.com")
  const [description, setDescription] = useState("We accept Solana payments for our products and services.")

  const handleSave = () => {
    // In a real application, this would call an API to update the account settings
    console.log("Saving account settings:", { businessName, email, description })
  }

  return (
    <div className="space-y-4">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="business-name">Business Name</Label>
        <Input type="text" id="business-name" value={businessName} onChange={(e) => setBusinessName(e.target.value)} />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="description">Business Description</Label>
        <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <Button onClick={handleSave}>Save Settings</Button>
    </div>
  )
}

