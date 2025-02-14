import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { FloatingActionButton } from "@/components/FloatingActionButton"
import type React from "react" // Import React

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Precious Udoessien - Software Engineer Portfolio",
  description: "Portfolio of Precious Udoessien, a software engineer specializing in blockchain and cybersecurity.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
            <FloatingActionButton />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'