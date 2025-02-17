"use client"

import { useState, useCallback } from "react"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import type { Token, QuoteResponse } from "@/lib/jupiter"
import { fetchTokenList, getQuote } from "@/lib/jupiter"
import { toast } from "@/components/ui/use-toast"

export function useJupiterSwap() {
  const { connection } = useConnection()
  const { publicKey, signTransaction } = useWallet()
  const [loading, setLoading] = useState(false)
  const [tokens, setTokens] = useState<Token[]>([])
  const [quote, setQuote] = useState<QuoteResponse | null>(null)

  const loadTokens = useCallback(async () => {
    try {
      setLoading(true)
      const tokenList = await fetchTokenList()
      setTokens(tokenList)
    } catch (error) {
      console.error("Error loading tokens:", error)
      toast({
        title: "Error",
        description: "Failed to load tokens. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }, [])

  const getSwapQuote = useCallback(
    async (inputMint: string, outputMint: string, amount: number) => {
      if (!publicKey) {
        toast({
          title: "Error",
          description: "Please connect your wallet first",
          variant: "destructive",
        })
        return
      }

      try {
        setLoading(true)
        const quoteResponse = await getQuote({
          inputMint,
          outputMint,
          amount,
        })

        if (!quoteResponse) {
          throw new Error("Failed to get quote")
        }

        setQuote(quoteResponse)
        return quoteResponse
      } catch (error) {
        console.error("Error getting swap quote:", error)
        toast({
          title: "Error",
          description: "Failed to get swap quote. Please try again.",
          variant: "destructive",
        })
        return null
      } finally {
        setLoading(false)
      }
    },
    [publicKey],
  )

  const executeSwap = useCallback(
    async (quoteResponse: QuoteResponse) => {
      if (!publicKey || !signTransaction) {
        toast({
          title: "Error",
          description: "Please connect your wallet first",
          variant: "destructive",
        })
        return
      }

      try {
        setLoading(true)
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/swap/execute`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            quoteResponse,
            userPublicKey: publicKey.toString(),
          }),
        })

        if (!response.ok) {
          throw new Error("Failed to execute swap")
        }

        const { signature } = await response.json()
        await connection.confirmTransaction(signature)

        toast({
          title: "Success",
          description: "Swap executed successfully!",
        })

        return signature
      } catch (error) {
        console.error("Error executing swap:", error)
        toast({
          title: "Error",
          description: "Failed to execute swap. Please try again.",
          variant: "destructive",
        })
        return null
      } finally {
        setLoading(false)
      }
    },
    [publicKey, signTransaction, connection],
  )

  return {
    loading,
    tokens,
    quote,
    loadTokens,
    getSwapQuote,
    executeSwap,
  }
}

