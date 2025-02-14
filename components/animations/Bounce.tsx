"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface BounceProps {
  children: ReactNode
  delay?: number
}

export function Bounce({ children, delay = 0 }: BounceProps) {
  return (
    <motion.div
      initial={{ y: -20 }}
      animate={{ y: 0 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 15,
        delay,
      }}
    >
      {children}
    </motion.div>
  )
}

