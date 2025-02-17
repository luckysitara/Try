"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "@/components/ui/use-toast"
import { supabase } from "@/lib/supabase-client"

interface ApiKey {
  id: string
  public_key: string
  created_at: string
  last_used_at: string | null
  revoked_at: string | null
}

export function ApiKeyManager() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([])
  const [newSecretKey, setNewSecretKey] = useState<string | null>(null)

  useEffect(() => {
    fetchApiKeys()
  }, [])

  const fetchApiKeys = async () => {
    const { data, error } = await supabase.from("api_keys").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching API keys:", error)
      toast({
        title: "Error",
        description: "Failed to fetch API keys. Please try again.",
        variant: "destructive",
      })
    } else {
      setApiKeys(data)
    }
  }

  const generateApiKey = async () => {
    try {
      const response = await fetch("/api/api-keys/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error("Failed to generate API key")
      }

      const { publicKey, secretKey } = await response.json()
      setNewSecretKey(secretKey)
      toast({
        title: "Success",
        description: "New API key generated successfully.",
      })
      fetchApiKeys()
    } catch (error) {
      console.error("Error generating API key:", error)
      toast({
        title: "Error",
        description: "Failed to generate API key. Please try again.",
        variant: "destructive",
      })
    }
  }

  const revokeApiKey = async (id: string) => {
    try {
      const { error } = await supabase.from("api_keys").update({ revoked_at: new Date().toISOString() }).eq("id", id)

      if (error) {
        throw error
      }

      toast({
        title: "Success",
        description: "API key revoked successfully.",
      })
      fetchApiKeys()
    } catch (error) {
      console.error("Error revoking API key:", error)
      toast({
        title: "Error",
        description: "Failed to revoke API key. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">API Keys</h2>
        <Button onClick={generateApiKey}>Generate New API Key</Button>
      </div>

      {newSecretKey && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4">
          <p className="font-bold">New API Key Generated</p>
          <p>Secret Key (copy this now, it won't be shown again): {newSecretKey}</p>
        </div>
      )}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Public Key</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Last Used</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {apiKeys.map((key) => (
            <TableRow key={key.id}>
              <TableCell>{key.public_key}</TableCell>
              <TableCell>{new Date(key.created_at).toLocaleString()}</TableCell>
              <TableCell>{key.last_used_at ? new Date(key.last_used_at).toLocaleString() : "Never"}</TableCell>
              <TableCell>{key.revoked_at ? "Revoked" : "Active"}</TableCell>
              <TableCell>
                {!key.revoked_at && (
                  <Button variant="destructive" onClick={() => revokeApiKey(key.id)}>
                    Revoke
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

