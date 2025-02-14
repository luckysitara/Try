import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function OpenMEVSolana() {
  return (
    <Card className="max-w-3xl mx-auto my-8">
      <CardHeader>
        <CardTitle className="text-3xl">Open MEV: Revolutionizing Solana's MEV Landscape with Toby Network</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">
          Maximal Extractable Value (MEV) has been a hot topic in the blockchain world, particularly in the Ethereum
          ecosystem. Now, with the rise of Solana, we're seeing new innovations in this space. Enter Toby Network, a
          groundbreaking project that's set to revolutionize MEV on Solana.
        </p>
        <p className="mb-4">
          MEV refers to the maximum value that can be extracted from block production in excess of the standard block
          reward and gas fees. This often involves strategies like front-running, back-running, and sandwich attacks.
          While MEV can be seen as a necessary evil in blockchain ecosystems, it often leads to inefficiencies and
          unfair advantages for those with the technical know-how to exploit it.
        </p>
        <p className="mb-4">
          Toby Network aims to democratize MEV on Solana by creating an open, transparent, and fair system for MEV
          extraction. Unlike traditional MEV extraction, which often happens behind closed doors, Toby Network brings
          this process into the open, allowing all participants to benefit.
        </p>
        <p className="mb-4">
          The key innovation of Toby Network lies in its decentralized order flow auction mechanism. This system allows
          traders to submit their transactions to a network of searchers who compete to offer the best execution price.
          This competition ensures that traders get the best possible price for their trades, while also distributing
          MEV more fairly among network participants.
        </p>
        <p>
          As Solana continues to grow and evolve, innovations like Toby Network will play a crucial role in shaping a
          more efficient and equitable blockchain ecosystem. By bringing MEV out of the shadows and into the open, Toby
          Network is not just improving Solana - it's setting a new standard for how MEV can be handled across all
          blockchain platforms.
        </p>
      </CardContent>
    </Card>
  )
}

