"use client"

import { useState, useEffect } from "react"
import { useWallet } from "@solana/wallet-adapter-react"
import { getQuote, executeSwap } from "@/lib/jupiter"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"

const tokens = [
  { symbol: "SOL", mint: "So11111111111111111111111111111111111111112" },
  { symbol: "USDC", mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v" },
  // Add more tokens as needed
]

export function SwapInterface({ amount, currency }: { amount: number; currency: string }) {
  const [inputToken, setInputToken] = useState(tokens[0])
  const [outputToken, setOutputToken] = useState(tokens[1])
  const [inputAmount, setInputAmount] = useState(amount.toString())
  const [outputAmount, setOutputAmount] = useState("0")
  const [isLoading, setIsLoading] = useState(false)
  const wallet = useWallet()

  useEffect(() => {
    if (inputToken && outputToken && inputAmount) {
      fetchQuote()
    }
  }, [inputToken, outputToken, inputAmount])

  async function fetchQuote() {
    setIsLoading(true)
    try {
      const quote = await getQuote({
        inputMint: inputToken.mint,
        outputMint: outputToken.mint,
        amount: Number.parseFloat(inputAmount) * 1e9, // Convert to lamports
      })
      setOutputAmount((quote.outAmount / 1e9).toString()) // Convert from lamports
    } catch (error) {
      console.error("Error fetching quote:", error)
      toast({
        title: "Error",
        description: "Failed to fetch swap quote. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function handleSwap() {
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
      const quote = await getQuote({
        inputMint: inputToken.mint,
        outputMint: outputToken.mint,
        amount: Number.parseFloat(inputAmount) * 1e9, // Convert to lamports
      })
      const swapTransaction = await executeSwap(quote, wallet.publicKey.toString())

      const signedTx = await wallet.signTransaction(swapTransaction)
      const txid = await wallet.sendTransaction(signedTx, wallet.connection)

      toast({
        title: "Success",
        description: `Swap executed successfully. Transaction ID: ${txid}`,
      })
    } catch (error) {
      console.error("Error executing swap:", error)
      toast({
        title: "Error",
        description: "Failed to execute swap. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-solpay-white p-6 rounded-lg shadow-lg animate-fade-in">
      <h2 className="text-2xl font-bold mb-4 text-solpay-purple">Swap Tokens</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
          <div className="flex space-x-2">
            <Input
              type="number"
              value={inputAmount}
              onChange={(e) => setInputAmount(e.target.value)}
              className="flex-grow"
            />
            <Select
              value={inputToken.symbol}
              onValueChange={(value) => setInputToken(tokens.find((t) => t.symbol === value)!)}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Token" />
              </SelectTrigger>
              <SelectContent>
                {tokens.map((token) => (
                  <SelectItem key={token.symbol} value={token.symbol}>
                    {token.symbol}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
          <div className="flex space-x-2">
            <Input type="number" value={outputAmount} readOnly className="flex-grow" />
            <Select
              value={outputToken.symbol}
              onValueChange={(value) => setOutputToken(tokens.find((t) => t.symbol === value)!)}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Token" />
              </SelectTrigger>
              <SelectContent>
                {tokens.map((token) => (
                  <SelectItem key={token.symbol} value={token.symbol}>
                    {token.symbol}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button
          onClick={handleSwap}
          disabled={isLoading || !wallet.publicKey}
          className="w-full bg-solpay-blue hover:bg-solpay-purple text-white transition-colors duration-200"
        >
          {isLoading ? "Loading..." : "Swap"}
        </Button>
      </div>
    </div>
  )
}

