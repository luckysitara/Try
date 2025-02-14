"use client"

import { Card, CardContent } from "@/components/ui/card"
import { SiRust, SiPython, SiJavascript, SiReact, SiSolidity, SiEthereum } from "react-icons/si"
import { motion } from "framer-motion"
import { Bounce } from "./animations/Bounce"

const techStack = [
  { name: "Rust", icon: SiRust },
  { name: "Python", icon: SiPython },
  { name: "JavaScript", icon: SiJavascript },
  { name: "React", icon: SiReact },
  { name: "Solidity", icon: SiSolidity },
  { name: "Ethereum", icon: SiEthereum },
]

export function TechStack() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {techStack.map((tech, index) => (
        <Bounce key={index} delay={index * 0.1}>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Card className="hover:shadow-lg transition-shadow duration-300 hover:border-primary">
              <CardContent className="flex flex-col items-center justify-center p-4">
                <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                  <tech.icon className="w-12 h-12 mb-2" />
                </motion.div>
                <span className="text-sm font-semibold">{tech.name}</span>
              </CardContent>
            </Card>
          </motion.div>
        </Bounce>
      ))}
    </div>
  )
}

