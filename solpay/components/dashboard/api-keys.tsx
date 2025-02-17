"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "@/components/ui/use-toast"

export function ApiKeys() {
  const [apiKeys, setApiKeys] = useState([
    { id: 1, name: "Production Key", key: "sk_live_...", type: "Live" },
    { id: 2, name: "Test Key", key: "sk_test_...", type: "Test" },
  ])

  const [newKeyName, setNewKeyName] = useState("")

  const handleCreateKey = () => {
    // In a real application, this would call an API to create a new key
    const newKey = {
      id: apiKeys.length + 1,
      name: newKeyName,
      key: `sk_${Math.random().toString(36).substr(2, 9)}`,
      type: "Test",
    }
    setApiKeys([...apiKeys, newKey])
    setNewKeyName("")
    toast({
      title: "API Key Created",
      description: "Your new API key has been created successfully.",
    })
  }

  const handleRevokeKey = (id: number) => {
    // In a real application, this would call an API to revoke the key
    setApiKeys(apiKeys.filter((key) => key.id !== id))
    toast({
      title: "API Key Revoked",
      description: "The API key has been revoked successfully.",
      variant: "destructive",
    })
  }

  return (
    <div className="space-y-4">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="key-name">New API Key Name</Label>
        <Input
          type="text"
          id="key-name"
          value={newKeyName}
          onChange={(e) => setNewKeyName(e.target.value)}
          placeholder="Enter key name"
        />
      </div>
      <Button onClick={handleCreateKey}>Create New API Key</Button>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Key</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {apiKeys.map((key) => (
            <TableRow key={key.id}>
              <TableCell>{key.name}</TableCell>
              <TableCell>{key.key}</TableCell>
              <TableCell>{key.type}</TableCell>
              <TableCell>
                <Button variant="destructive" onClick={() => handleRevokeKey(key.id)}>
                  Revoke
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

