"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { motion } from "framer-motion"
import type { User } from "@/lib/types"
import { NIGERIAN_STATES } from "@/lib/types"
import { toast } from "@/components/ui/use-toast"
import { EditUserModal } from "@/components/edit-user-modal"
import { XpHistoryModal } from "@/components/xp-history-modal"

export default function AdminDashboard() {
  const { admin, logout } = useAuth()
  const router = useRouter()
  const [users, setUsers] = useState<User[]>([])
  const [newUser, setNewUser] = useState({ name: "", state: "", xp: 0 })
  const [csvFile, setCsvFile] = useState<File | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [usersPerPage] = useState(10)

  useEffect(() => {
    if (!admin) {
      router.push("/admin/login")
    } else {
      fetchUsers()
    }
  }, [admin, router])

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/users")
      if (response.ok) {
        const data = await response.json()
        setUsers(data)
      } else {
        throw new Error("Failed to fetch users")
      }
    } catch (error) {
      console.error("Error fetching users:", error)
      toast({
        title: "Error",
        description: "Failed to fetch users. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch("/api/admin/add-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newUser, adminId: admin?.id }),
      })
      if (response.ok) {
        fetchUsers()
        setNewUser({ name: "", state: "", xp: 0 })
        toast({
          title: "Success",
          description: "User added successfully.",
        })
      } else {
        throw new Error("Failed to add user")
      }
    } catch (error) {
      console.error("Error adding user:", error)
      toast({
        title: "Error",
        description: "Failed to add user. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleAddXp = async (userId: string, xp: number) => {
    try {
      const response = await fetch("/api/admin/add-xp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, xp, adminId: admin?.id }),
      })
      if (response.ok) {
        fetchUsers()
        toast({
          title: "Success",
          description: "XP added successfully.",
        })
      } else {
        throw new Error("Failed to add XP")
      }
    } catch (error) {
      console.error("Error adding XP:", error)
      toast({
        title: "Error",
        description: "Failed to add XP. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleCsvUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!csvFile) return

    const formData = new FormData()
    formData.append("file", csvFile)
    formData.append("adminId", admin?.id || "")

    try {
      const response = await fetch("/api/admin/upload-csv", {
        method: "POST",
        body: formData,
      })
      if (response.ok) {
        fetchUsers()
        setCsvFile(null)
        toast({
          title: "Success",
          description: "CSV uploaded and processed successfully.",
        })
      } else {
        throw new Error("Failed to upload CSV")
      }
    } catch (error) {
      console.error("Error uploading CSV:", error)
      toast({
        title: "Error",
        description: "Failed to upload CSV. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleLogout = () => {
    logout()
    router.push("/admin/login")
  }

  const handleUpdateUser = async (updatedUser: User) => {
    try {
      const response = await fetch(`/api/admin/update-user`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      })
      if (response.ok) {
        toast({
          title: "Success",
          description: "User updated successfully.",
        })
      } else {
        throw new Error("Failed to update user")
      }
    } catch (error) {
      console.error("Error updating user:", error)
      toast({
        title: "Error",
        description: "Failed to update user. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Get current users
  const indexOfLastUser = currentPage * usersPerPage
  const indexOfFirstUser = indexOfLastUser - usersPerPage
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser)

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  if (!admin) return null

  return (
    <div className="min-h-screen bg-background p-8">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto bg-card rounded-lg shadow-xl p-8"
      >
        <h1 className="text-3xl font-bold mb-6 text-primary">Admin Dashboard</h1>
        <p className="mb-4 text-foreground">Welcome, {admin.username}!</p>
        <p className="mb-4 text-foreground">
          Role: {admin.is_super_admin ? "Super Admin" : `State Admin (${admin.state})`}
        </p>

        {admin.is_super_admin ? (
          <SuperAdminDashboard
            users={currentUsers}
            newUser={newUser}
            setNewUser={setNewUser}
            handleAddUser={handleAddUser}
            handleAddXp={handleAddXp}
            csvFile={csvFile}
            setCsvFile={setCsvFile}
            handleCsvUpload={handleCsvUpload}
            handleUpdateUser={handleUpdateUser}
          />
        ) : (
          <StateAdminDashboard
            users={currentUsers.filter((user) => user.state === admin.state)}
            state={admin.state!}
            handleAddXp={handleAddXp}
          />
        )}

        <Pagination className="mt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />
            </PaginationItem>
            {[...Array(Math.ceil(users.length / usersPerPage))].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink onClick={() => paginate(index + 1)} isActive={currentPage === index + 1}>
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === Math.ceil(users.length / usersPerPage)}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>

        <Button onClick={handleLogout} className="mt-8 bg-primary text-primary-foreground">
          Logout
        </Button>
      </motion.div>
    </div>
  )
}

function SuperAdminDashboard({
  users,
  newUser,
  setNewUser,
  handleAddUser,
  handleAddXp,
  csvFile,
  setCsvFile,
  handleCsvUpload,
  handleUpdateUser,
}: {
  users: User[]
  newUser: { name: string; state: string; xp: number }
  setNewUser: React.Dispatch<React.SetStateAction<{ name: string; state: string; xp: number }>>
  handleAddUser: (e: React.FormEvent) => Promise<void>
  handleAddXp: (userId: string, xp: number) => Promise<void>
  csvFile: File | null
  setCsvFile: React.Dispatch<React.SetStateAction<File | null>>
  handleCsvUpload: (e: React.FormEvent) => Promise<void>
  handleUpdateUser: (updatedUser: User) => Promise<void>
}) {
  return (
    <div>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Add New User</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddUser} className="space-y-4">
            <Input
              placeholder="Name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
            <Select value={newUser.state} onValueChange={(value) => setNewUser({ ...newUser, state: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select state" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(NIGERIAN_STATES).map(([code, name]) => (
                  <SelectItem key={code} value={code}>
                    {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              type="number"
              placeholder="Initial XP"
              value={newUser.xp}
              onChange={(e) => setNewUser({ ...newUser, xp: Number.parseInt(e.target.value) })}
            />
            <Button type="submit">Add User</Button>
          </form>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Upload CSV</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCsvUpload} className="space-y-4">
            <Input type="file" accept=".csv" onChange={(e) => setCsvFile(e.target.files?.[0] || null)} />
            <Button type="submit" disabled={!csvFile}>
              Upload CSV
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>State</TableHead>
                <TableHead>Total XP</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{NIGERIAN_STATES[user.state as keyof typeof NIGERIAN_STATES]}</TableCell>
                  <TableCell>{user.total_xp}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Input
                        type="number"
                        placeholder="Add XP"
                        className="w-24"
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            handleAddXp(user.id, Number.parseInt((e.target as HTMLInputElement).value))
                            ;(e.target as HTMLInputElement).value = ""
                          }
                        }}
                      />
                      <Button
                        onClick={() => {
                          const xp = prompt("Enter XP amount:")
                          if (xp) handleAddXp(user.id, Number.parseInt(xp))
                        }}
                      >
                        Add XP
                      </Button>
                      <EditUserModal user={user} onSave={handleUpdateUser} />
                      <XpHistoryModal userId={user.id} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

function StateAdminDashboard({
  users,
  state,
  handleAddXp,
}: { users: User[]; state: string; handleAddXp: (userId: string, xp: number) => Promise<void> }) {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Users in {NIGERIAN_STATES[state as keyof typeof NIGERIAN_STATES]}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Total XP</TableHead>
                <TableHead>Monthly XP</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.total_xp}</TableCell>
                  <TableCell>{user.monthly_xp}</TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      placeholder="Add XP"
                      className="w-24 mr-2"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          handleAddXp(user.id, Number.parseInt((e.target as HTMLInputElement).value))
                          ;(e.target as HTMLInputElement).value = ""
                        }
                      }}
                    />
                    <Button
                      onClick={() => {
                        const xp = prompt("Enter XP amount:")
                        if (xp) handleAddXp(user.id, Number.parseInt(xp))
                      }}
                    >
                      Add XP
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

