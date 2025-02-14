import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function Portfolio() {
  const projects = [
    {
      name: "AI-based Malware Detector",
      description: "An advanced malware detection system using machine learning algorithms.",
      link: "#",
      tags: ["Python", "Machine Learning", "Cybersecurity"],
    },
    {
      name: "Solpay",
      description: "A crypto payment gateway built on the Solana blockchain.",
      link: "#",
      tags: ["Rust", "Solana", "Blockchain"],
    },
    {
      name: "v0 Project",
      description: "An interactive AI-powered development environment.",
      link: "https://v0-super-gcksvfxewe4-jszmoo.vercel.app",
      tags: ["Next.js", "AI", "React"],
    },
    {
      name: "Machine Learning Algorithm Trading Bot",
      description: "A bot that uses machine learning to trade stocks.",
      link: "#",
      tags: ["Python", "Machine Learning", "Finance"],
    },
    {
      name: "Voting With Payment System Plugin",
      description: "A plugin that allows users to vote and pay for their votes.",
      link: "#",
      tags: ["PHP", "MySQL", "Payment Gateway"],
    },
    {
      name: "Connect and Build (ecommerce/artisan/client platform)",
      description: "An e-commerce platform for artisans and clients.",
      link: "#",
      tags: ["React", "Node.js", "MongoDB"],
    },
    {
      name: "AI-based Vulnerability Web Tester",
      description: "A web application that tests for vulnerabilities using AI.",
      link: "#",
      tags: ["Python", "AI", "Web Security"],
    },
    {
      name: "Simple Linux Shell",
      description: "A simple Linux shell written in C.",
      link: "#",
      tags: ["C", "Linux"],
    },
    {
      name: "Nft-mint_vault_swap",
      description: "A platform for minting, storing, and swapping NFTs.",
      link: "#",
      tags: ["Solidity", "Ethereum"],
    },
    {
      name: "Sql-checker",
      description: "A tool for checking SQL queries for vulnerabilities.",
      link: "#",
      tags: ["Python", "SQL"],
    },
    {
      name: "Encryptor",
      description: "A tool for encrypting and decrypting files.",
      link: "#",
      tags: ["Python", "Cryptography"],
    },
  ]

  return (
    <div className="space-y-8 animate-fadeIn">
      <h1 className="text-4xl font-bold mb-8">My Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle>{project.name}</CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, tagIndex) => (
                  <Badge key={tagIndex} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Link
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                View Project
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Team Project</h2>
        <p>
          <Link href="https://youtube.com/your-team-project-video" className="text-blue-600 hover:underline">
            Watch our team project video
          </Link>
        </p>
        <p className="mt-2">
          <Link href="/team-project-slides.pdf" className="text-blue-600 hover:underline">
            View our team project slide deck
          </Link>
        </p>
      </div>
    </div>
  )
}

