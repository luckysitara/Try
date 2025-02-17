"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

export function Navbar() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">Solpay</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/about"
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === "/about" ? "text-foreground" : "text-foreground/60",
              )}
            >
              About
            </Link>
            <Link
              href="/pricing"
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === "/pricing" ? "text-foreground" : "text-foreground/60",
              )}
            >
              Pricing
            </Link>
            <Link
              href="/docs"
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === "/docs" ? "text-foreground" : "text-foreground/60",
              )}
            >
              Docs
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">{/* Add search functionality if needed */}</div>
          <nav className="flex items-center">
            <Link href="/auth/signin">
              <Button variant="ghost" className="mr-2">
                Sign In
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button>Sign Up</Button>
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}

