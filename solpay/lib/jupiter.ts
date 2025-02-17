import { Connection, PublicKey } from "@solana/web3.js"
import { Jupiter } from "@jup-ag/core"

const connection = new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!, "confirmed")

export async function getJupiter() {
  const jupiter = await Jupiter.load({
    connection,
    cluster: "mainnet-beta",
    defaultSlippageBps: 50, // 0.5%
  })
  return jupiter
}

export async function getQuote(params: {
  inputMint: string
  outputMint: string
  amount: number
}) {
  const jupiter = await getJupiter()
  const { inputMint, outputMint, amount } = params
  const routes = await jupiter.computeRoutes({
    inputMint: new PublicKey(inputMint),
    outputMint: new PublicKey(outputMint),
    amount,
    slippageBps: 50,
  })

  if (routes.routesInfos.length === 0) {
    throw new Error("No routes found")
  }

  const bestRoute = routes.routesInfos[0]
  return bestRoute
}

export async function executeSwap(route: any, userPublicKey: string) {
  const jupiter = await getJupiter()
  const { transactions } = await jupiter.exchange({
    route,
    userPublicKey: new PublicKey(userPublicKey),
  })

  return transactions.txs[0]
}

