"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"

export function Webhooks() {
  const [webhooks, setWebhooks] = useState([
    { id: 1, url: "https://example.com/webhook1", event: "payment.success" },
    { id: 2, url: "https://example.com/webhook2", event: "payment.failed" },
  ])

  const [newWebhookUrl, setNewWebhookUrl] = useState("")
  const [newWebhookEvent, setNewWebhookEvent] = useState("")

  const handleCreateWebhook = () => {
    // In a real application, this would call an API to create a new webhook
    const newWebhook = {
      id: webhooks.length + 1,
      url: newWebhookUrl,
      event: newWebhookEvent,
    }
    setWebhooks([...webhooks, newWebhook])
    setNewWebhookUrl("")
    setNewWebhookEvent("")
    toast({
      title: "Webhook Created",
      description: "Your new webhook has been created successfully.",
    })
  }

  const handleDeleteWebhook = (id: number) => {
    // In a real application, this would call an API to delete the webhook
    setWebhooks(webhooks.filter((webhook) => webhook.id !== id))
    toast({
      title: "Webhook Deleted",
      description: "The webhook has been deleted successfully.",
      variant: "destructive",
    })
  }

  return (
    <div className="space-y-4">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="webhook-url">Webhook URL</Label>
        <Input
          type="url"
          id="webhook-url"
          value={newWebhookUrl}
          onChange={(e) => setNewWebhookUrl(e.target.value)}
          placeholder="https://example.com/webhook"
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="webhook-event">Event</Label>
        <Select value={newWebhookEvent} onValueChange={setNewWebhookEvent}>
          <SelectTrigger id="webhook-event">
            <SelectValue placeholder="Select event" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="payment.success">Payment Success</SelectItem>
            <SelectItem value="payment.failed">Payment Failed</SelectItem>
            <SelectItem value="payout.created">Payout Created</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button onClick={handleCreateWebhook}>Create New Webhook</Button>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>URL</TableHead>
            <TableHead>Event</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {webhooks.map((webhook) => (
            <TableRow key={webhook.id}>
              <TableCell>{webhook.url}</TableCell>
              <TableCell>{webhook.event}</TableCell>
              <TableCell>
                <Button variant="destructive" onClick={() => handleDeleteWebhook(webhook.id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

