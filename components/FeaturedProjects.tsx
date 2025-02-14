"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { FadeIn } from "./animations/FadeIn"
import { ScaleIn } from "./animations/ScaleIn"

const featuredProjects = [
  {
    name: "SuperteamNG Reputation System",
    description:
      "A comprehensive reputation management system for SuperteamNG that tracks member contributions, assigns XP, and helps project leads identify reliable members. The system features automated contribution tracking, XP allocation, and detailed member profiles.",
    link: "https://v0-super-gcksvfxewe4-jszmoo.vercel.app",
    tags: ["Next.js", "TypeScript", "Blockchain"],
  },
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
]

export function FeaturedProjects() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {featuredProjects.map((project, index) => (
        <FadeIn key={index} delay={index * 0.2} direction={index % 2 === 0 ? "left" : "right"}>
          <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <ScaleIn delay={index * 0.3}>
                <CardTitle>{project.name}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </ScaleIn>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, tagIndex) => (
                  <Badge
                    key={tagIndex}
                    variant="secondary"
                    className="animate-fadeIn"
                    style={{ animationDelay: `${tagIndex * 100}ms` }}
                  >
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
                className="text-blue-500 hover:underline hover:text-blue-600 transition-colors"
              >
                View Project
              </Link>
            </CardFooter>
          </Card>
        </FadeIn>
      ))}
    </div>
  )
}

