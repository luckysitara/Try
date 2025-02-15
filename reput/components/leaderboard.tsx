"use client"

import { useState, useEffect } from "react"
import { Search, Trophy } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { User } from "@/lib/types"
import { motion } from "framer-motion"

export function Leaderboard() {
  const [users, setUsers] = useState<User[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [displayCount, setDisplayCount] = useState(20)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true)
        const response = await fetch("/api/users")
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        if (Array.isArray(data)) {
          setUsers(data)
        } else {
          throw new Error("Received invalid data format")
        }
      } catch (e) {
        console.error("Error fetching users:", e)
        setError(e instanceof Error ? e.message : "An unknown error occurred")
      } finally {
        setIsLoading(false)
      }
    }
    fetchUsers()
  }, [])

  const filteredAndSortedUsers = users
    .filter(
      (user) =>
        user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.state?.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return (a.total_xp ?? 0) - (b.total_xp ?? 0)
      } else {
        return (b.total_xp ?? 0) - (a.total_xp ?? 0)
      }
    })
    .slice(0, displayCount)

  if (isLoading) {
    return <div className="text-center text-foreground">Loading...</div>
  }

  if (error) {
    return <div className="text-center text-destructive">{error}</div>
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-4 bg-card/50 p-6 rounded-lg shadow-xl backdrop-blur-sm"
    >
      <h2 className="text-2xl font-bold text-primary">SuperteamNG XP System</h2>
      <div className="flex items-center justify-between">
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search User..."
            className="pl-9 bg-background/50 text-foreground placeholder-muted-foreground border-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={sortOrder} onValueChange={(value) => setSortOrder(value as "asc" | "desc")}>
          <SelectTrigger className="w-[180px] bg-background/50 text-foreground border-input">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="desc">XP High to Low</SelectItem>
            <SelectItem value="asc">XP Low to High</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-primary/20">
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Rank
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Name
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Total XP
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Monthly XP
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Skills
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedUsers.map((user, index) => (
              <motion.tr
                key={user.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="border-b border-primary/10 last:border-0"
              >
                <td className="px-4 py-3 text-foreground">
                  <div className="flex items-center gap-2">
                    {index < 3 && <Trophy className="h-4 w-4 text-secondary" />}
                    {index + 1}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div>
                    <div className="font-medium text-foreground">{user.name}</div>
                    <div className="text-sm text-muted-foreground">{user.state}</div>
                  </div>
                </td>
                <td className="px-4 py-3 text-right font-mono text-foreground">{user.total_xp?.toLocaleString()} XP</td>
                <td className="px-4 py-3 text-right">
                  <span className="text-primary">{user.monthly_xp?.toLocaleString()}</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-2">
                    {user.skills?.map((skill) => (
                      <span key={skill} className="rounded bg-secondary/20 px-2 py-1 text-xs text-foreground">
                        {skill}
                      </span>
                    ))}
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
      {users.length > displayCount && (
        <div className="text-center mt-4">
          <button
            onClick={() => setDisplayCount((prevCount) => prevCount + 20)}
            className="bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/80 transition-colors"
          >
            Load More
          </button>
        </div>
      )}
    </motion.div>
  )
}

