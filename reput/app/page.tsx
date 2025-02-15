"use client"

import Link from "next/link"
import { ThemeProvider } from "@/components/theme-provider"
import { Leaderboard } from "@/components/leaderboard"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useAuth } from "@/lib/auth-context"

const BlockchainAnimation = () => {
  return (
    <motion.div
      className="absolute top-0 left-0 w-full h-full pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-primary/20 rounded-full flex items-center justify-center text-primary text-xs"
          style={{
            width: Math.random() * 40 + 20,
            height: Math.random() * 40 + 20,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: Math.random() * 5 + 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          {i % 4 === 0 && "{ }"}
          {i % 4 === 1 && "< />"}
          {i % 4 === 2 && "0x"}
          {i % 4 === 3 && "[]"}
        </motion.div>
      ))}
    </motion.div>
  )
}

const CodeAnimation = () => {
  return (
    <motion.div
      className="absolute bottom-0 left-0 w-full h-32 pointer-events-none overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-primary/30 text-sm whitespace-nowrap"
          style={{
            left: `${i * 20}%`,
            top: `${Math.random() * 100}%`,
          }}
          initial={{ y: "100%" }}
          animate={{ y: "-100%" }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          {`const blockchain = new Blockchain();`}
          <br />
          {`blockchain.addBlock(new Block(data));`}
          <br />
          {`if (blockchain.isValid()) {`}
          <br />
          {`  console.log("Chain is valid");`}
          <br />
          {`}`}
        </motion.div>
      ))}
    </motion.div>
  )
}

export default function Home() {
  const { user } = useAuth()

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen bg-background relative overflow-hidden">
        <BlockchainAnimation />
        <CodeAnimation />
        <header className="border-b border-border bg-background/50 backdrop-blur-sm">
          <nav className="container mx-auto flex h-16 items-center justify-between px-4">
            <div className="text-xl font-bold text-foreground">SuperteamNG</div>
            <div className="flex items-center space-x-4">
              {user ? (
                <Link href="/dashboard">
                  <Button variant="ghost">Dashboard</Button>
                </Link>
              ) : (
                <Link href="/login">
                  <Button variant="ghost">Login</Button>
                </Link>
              )}
              <ThemeToggle />
            </div>
          </nav>
        </header>

        <main className="relative z-10">
          <motion.section
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto px-4 py-16 text-center"
          >
            <h1 className="mb-4 text-4xl font-bold text-foreground">
              Welcome to the SuperteamNG
              <br />
              Reputation System
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
              In our community, being able to know who to trust and who has proven shipping abilities is essential. Our
              Reputation System captures Member contributions and gives them XP so that Project Leads know which Members
              are reliable.
            </p>
          </motion.section>

          <section className="container mx-auto px-4 py-8">
            <Leaderboard />
          </section>
        </main>
      </div>
    </ThemeProvider>
  )
}

