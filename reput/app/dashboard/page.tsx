"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

const DashboardAnimation = () => {
  return (
    <motion.div
      className="absolute top-0 left-0 w-full h-full pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-secondary/20 rounded-lg"
          style={{
            width: Math.random() * 200 + 100,
            height: Math.random() * 100 + 50,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      ))}
    </motion.div>
  )
}

export default function DashboardPage() {
  const { user, logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  if (!user) return null

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background relative overflow-hidden">
      <DashboardAnimation />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="z-10 text-center"
      >
        <h1 className="text-4xl font-bold mb-4 text-primary">Welcome, {user.username}!</h1>
        <p className="text-xl mb-8 text-muted-foreground">Your dashboard will be available soon.</p>
        <Button
          onClick={() => {
            logout()
            router.push("/")
          }}
          className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
        >
          Logout
        </Button>
      </motion.div>
    </div>
  )
}

