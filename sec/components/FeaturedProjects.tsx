"use client"

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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {featuredProjects.map((project, index) => (
        <FadeIn key={index} delay={index * 0.2} direction={index % 2 === 0 ? "left" : "right"}>
          <div className="card">
            <ScaleIn delay={index * 0.3}>
              <h3 className="text-lg font-bold">{project.name}</h3>
              <p>{project.description}</p>
            </ScaleIn>
            <div className="flex flex-wrap gap-2 mt-2">
              {project.tags.map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="inline-block bg-secondary text-secondary-foreground px-2 py-1 rounded-full text-sm"
                  style={{ animationDelay: `${tagIndex * 100}ms` }}
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-4">
              <Link
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                View Project
              </Link>
            </div>
          </div>
        </FadeIn>
      ))}
    </div>
  )
}

