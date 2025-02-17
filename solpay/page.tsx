"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Zap } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-primary mb-4">Welcome to Solpay</h1>
        <p className="text-xl text-muted-foreground mb-8">
          The fastest and most secure payment gateway for the Solana ecosystem
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="flex justify-center space-x-4 mb-16"
      >
        <Link href="/auth/signup">
          <Button size="lg">
            Get Started
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
        <Link href="/auth/signin">
          <Button variant="outline" size="lg">
            Sign In
          </Button>
        </Link>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <FeatureCard
          icon={<Zap className="h-10 w-10 text-primary" />}
          title="Lightning Fast"
          description="Process transactions in seconds on the Solana blockchain"
        />
        <FeatureCard
          icon={<Zap className="h-10 w-10 text-primary" />}
          title="Multi-Token Support"
          description="Accept payments in SOL, USDC, and other Solana tokens"
        />
        <FeatureCard
          icon={<Zap className="h-10 w-10 text-primary" />}
          title="Fiat Integration"
          description="Seamlessly handle both crypto and fiat transactions"
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="text-center"
      >
        <h2 className="text-2xl font-semibold mb-4">Trusted by leading Solana projects</h2>
        {/* Add logos of partner projects here */}
      </motion.div>
    </div>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <motion.div whileHover={{ scale: 1.05 }} className="bg-card text-card-foreground p-6 rounded-lg shadow-lg">
      <div className="mb-4">{icon}</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  )
}

