"use client"

import { useState, useEffect } from "react"
import { useJupiterSwap } from "@/hooks/use-jupiter-swap"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, RefreshCcw, FlipHorizontalIcon as SwapHorizontal } from "lucide-react"
import { WalletConnectButton } from "./wallet-connect-button"

export function TokenSwap() {
  const { loading, tokens, quote, loadTokens, getSwapQuote, executeSwap } = useJupiterSwap()
  const [amount, setAmount] = useState("")
  const [inputToken, setInputToken] = useState("")
  const [outputToken, setOutputToken] = useState("")

  useEffect(() => {
    loadTokens()
  }, [loadTokens])

  const handleGetQuote = async () => {
    if (!inputToken || !outputToken || !amount) return
    await getSwapQuote(inputToken, outputToken, Number.parseFloat(amount))
  }

  const handleSwap = async () => {
    if (!quote) return
    await executeSwap(quote)
  }

  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>Swap Tokens</CardTitle>
        <CardDescription>Swap tokens using Jupiter aggregator</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <WalletConnectButton />

        <div className="space-y-2">
          <Label htmlFor="amount">Amount</Label>
          <Input
            id="amount"
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-[1fr,auto,1fr] gap-2 items-end">
          <div className="space-y-2">
            <Label>From</Label>
            <Select value={inputToken} onValueChange={setInputToken}>
              <SelectTrigger>
                <SelectValue placeholder="Select token" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Tokens</SelectLabel>
                  {tokens.map((token) => (
                    <SelectItem key={token.address} value={token.address}>
                      <div className="flex items-center gap-2">
                        {token.logoURI && (
                          <img
                            src={token.logoURI || "/placeholder.svg"}
                            alt={token.symbol}
                            className="w-4 h-4 rounded-full"
                          />
                        )}
                        {token.symbol}
                      </div>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="mb-2"
            onClick={() => {
              setInputToken(outputToken)
              setOutputToken(inputToken)
            }}
          >
            <SwapHorizontal className="h-4 w-4" />
          </Button>

          <div className="space-y-2">
            <Label>To</Label>
            <Select value={outputToken} onValueChange={setOutputToken}>
              <SelectTrigger>
                <SelectValue placeholder="Select token" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Tokens</SelectLabel>
                  {tokens.map((token) => (
                    <SelectItem key={token.address} value={token.address}>
                      <div className="flex items-center gap-2">
                        {token.logoURI && (
                          <img
                            src={token.logoURI || "/placeholder.svg"}
                            alt={token.symbol}
                            className="w-4 h-4 rounded-full"
                          />
                        )}
                        {token.symbol}
                      </div>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        {quote && (
          <div className="rounded-lg border bg-card p-3 text-card-foreground">
            <div className="text-sm">
              <p>
                Rate: 1 {tokens.find((t) => t.address === inputToken)?.symbol} ≈{" "}
                {(quote.outAmount / quote.inAmount).toFixed(6)} {tokens.find((t) => t.address === outputToken)?.symbol}
              </p>
              <p>Price Impact: {(quote.priceImpactPct * 100).toFixed(2)}%</p>
            </div>
          </div>
        )}

        <div className="flex gap-2">
          <Button
            className="flex-1"
            onClick={handleGetQuote}
            disabled={!inputToken || !outputToken || !amount || loading}
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCcw className="h-4 w-4" />}
            Get Quote
          </Button>
          <Button className="flex-1" onClick={handleSwap} disabled={!quote || loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Swap"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

