"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { motion } from "framer-motion"
import { FadeIn } from "./animations/FadeIn"

const blogPosts = [
  {
    title: "Minted for Tomorrow",
    excerpt: "Exploring the future of NFTs and digital collectibles...",
    date: "2024-03-15",
    link: "/blog/minted-for-tomorrow",
  },
  {
    title: "Open MEV: Revolutionizing Solana's MEV Landscape with Toby Network",
    excerpt: "A deep dive into Maximal Extractable Value (MEV) on Solana...",
    date: "2024-03-01",
    link: "/blog/open-mev-solana",
  },
  {
    title: "Hippocrat: Revolutionizing Healthcare on Solana",
    excerpt: "How Hippocrat is transforming healthcare with blockchain technology...",
    date: "2024-02-15",
    link: "/blog/hippocrat-healthcare-solana",
  },
  {
    title: "The Future of Blockchain Technology",
    excerpt: "Exploring the potential impact of blockchain on various industries...",
    date: "2024-01-30",
    link: "/blog/future-of-blockchain",
  },
  {
    title: "Cybersecurity Best Practices for 2024",
    excerpt: "Essential security measures every organization should implement...",
    date: "2024-01-15",
    link: "/blog/cybersecurity-best-practices-2024",
  },
  {
    title: "Getting Started with Rust for Blockchain Development",
    excerpt: "A beginner's guide to using Rust in blockchain projects...",
    date: "2024-01-01",
    link: "/blog/rust-for-blockchain",
  },
]

export function BlogPosts() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {blogPosts.map((post, index) => (
        <FadeIn key={index} delay={index * 0.2} direction="up">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>{new Date(post.date).toLocaleDateString()}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{post.excerpt}</p>
              </CardContent>
              <CardFooter>
                <Link href={post.link} className="text-blue-500 hover:underline hover:text-blue-600 transition-colors">
                  Read More
                </Link>
              </CardFooter>
            </Card>
          </motion.div>
        </FadeIn>
      ))}
    </div>
  )
}

