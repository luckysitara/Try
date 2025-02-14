"use client"

import { TypeAnimation } from "react-type-animation"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ParticlesContainer } from "@/components/ParticlesContainer"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center text-center">
      <ParticlesContainer />
      <div className="z-10 space-y-6">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          Precious Udoessien
        </h1>
        <TypeAnimation
          sequence={["Software Engineer", 2000, "Blockchain Developer", 2000, "Cybersecurity Expert", 2000]}
          wrapper="p"
          speed={50}
          className="text-2xl sm:text-3xl md:text-4xl mb-8"
          repeat={Number.POSITIVE_INFINITY}
        />
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/bio">About Me</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/portfolio">My Work</Link>
          </Button>
          <Button asChild variant="secondary" size="lg">
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

