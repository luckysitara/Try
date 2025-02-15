import { type User, type XpTransaction, NIGERIAN_STATES } from "./types"

const SKILLS = [
  "Development",
  "Design",
  "Content Writing",
  "Project Management",
  "Marketing",
  "Community Management",
  "Operations",
  "Strategy",
  "Research",
  "Analytics",
]

// Helper to get random items from an array
const getRandomItems = (arr: any[], count: number) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

// Generate users and their XP transactions
export const generateMockData = () => {
  const users: User[] = []
  const transactions: XpTransaction[] = []

  Object.entries(NIGERIAN_STATES).forEach(([stateCode, stateName]) => {
    // Create 5 users for each state to ensure we have more than 10 users total
    for (let i = 0; i < 5; i++) {
      const userId = `${stateCode}-USER-${i + 1}`
      const user: User = {
        id: userId,
        name: `${stateName} Member ${i + 1}`,
        state: stateCode,
        totalXp: 0, // Will be calculated from transactions
        monthlyXp: 0, // Will be calculated from transactions
        skills: getRandomItems(SKILLS, 3),
        createdAt: new Date(2024, 0, 1), // January 1, 2024
        updatedAt: new Date(),
      }

      // Create 3 XP transactions for each user
      const xpAmounts = [100, 250, 500]
      const descriptions = ["Community contribution", "Project completion", "Workshop participation"]

      xpAmounts.forEach((amount, index) => {
        const transaction: XpTransaction = {
          id: `${userId}-TX-${index + 1}`,
          userId,
          amount,
          description: descriptions[index],
          approvedBy: "superadmin",
          createdAt: new Date(2024, 0, index + 1), // Spread over January 2024
        }
        transactions.push(transaction)

        // Add to user's total XP
        user.totalXp += amount
        // Add to monthly XP if transaction is from current month
        if (transaction.createdAt.getMonth() === new Date().getMonth()) {
          user.monthlyXp += amount
        }
      })

      users.push(user)
    }
  })

  return { users, transactions }
}

// Mock database
export const db = {
  users: generateMockData().users,
  transactions: generateMockData().transactions,

  // Admin accounts
  admins: [
    {
      id: "superadmin",
      username: "superadmin",
      password: "password", // In a real app, this would be hashed
      isSuperAdmin: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    // Create state admin accounts
    ...Object.keys(NIGERIAN_STATES).map((state) => ({
      id: `admin-${state}`,
      username: state.toLowerCase(),
      password: "password", // In a real app, this would be hashed
      state,
      isSuperAdmin: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    })),
  ],
}

// Helper functions to work with the mock data
export const mockDb = {
  // Get all users
  getUsers: () => db.users,

  // Get user by ID
  getUser: (id: string) => db.users.find((u) => u.id === id),

  // Get users by state
  getUsersByState: (state: string) => db.users.filter((u) => u.state === state),

  // Get transactions for a user
  getUserTransactions: (userId: string) => db.transactions.filter((t) => t.userId === userId),

  // Get admin by username
  getAdmin: (username: string) => db.admins.find((a) => a.username === username),

  // Add new transaction
  addTransaction: (transaction: XpTransaction) => {
    db.transactions.push(transaction)
    const user = db.users.find((u) => u.id === transaction.userId)
    if (user) {
      user.totalXp += transaction.amount
      if (transaction.createdAt.getMonth() === new Date().getMonth()) {
        user.monthlyXp += transaction.amount
      }
      user.updatedAt = new Date()
    }
  },
}

