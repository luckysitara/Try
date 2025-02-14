import { FloatingActionButton } from "@/components/FloatingActionButton"
import type React from "react" // Import React
import { ThemeProvider } from "next-themes" // Assuming next-themes is used
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Inter } from "next/font/google"
import "./globals.css"
import "../styles/globals.css"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Header />
          <main className="container mx-auto px-4 py-8">{children}</main>
          <Footer />
          <FloatingActionButton />
        </ThemeProvider>
      </body>
    </html>
  )
}

export const metadata = {
  generator: "v0.dev",
}



import './globals.css'