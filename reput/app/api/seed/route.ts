import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"
import { NIGERIAN_STATES } from "@/lib/types"
import { createHash } from "crypto"

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

function getRandomItems(arr: any[], count: number) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

function hashPassword(password: string): string {
  return createHash("sha256").update(password).digest("hex")
}

export async function POST() {
  try {
    // Check if users already exist
    const { count: userCount, error: countError } = await supabase
      .from("users")
      .select("*", { count: "exact", head: true })

    if (countError) throw countError

    if (userCount && userCount > 0) {
      console.log("Users already exist, skipping user creation")
    } else {
      const users = []
      const transactions = []

      for (const [stateCode, stateName] of Object.entries(NIGERIAN_STATES)) {
        for (let i = 0; i < 5; i++) {
          const userId = `${stateCode}-USER-${i + 1}`
          const user = {
            id: userId,
            name: `${stateName} Member ${i + 1}`,
            state: stateCode,
            total_xp: 0,
            monthly_xp: 0,
            skills: getRandomItems(SKILLS, 3),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          }
          users.push(user)

          const xpAmounts = [100, 250, 500]
          const descriptions = ["Community contribution", "Project completion", "Workshop participation"]

          xpAmounts.forEach((amount, index) => {
            const transaction = {
              user_id: userId,
              amount,
              description: descriptions[index],
              approved_by: "system",
              created_at: new Date(2024, 0, index + 1).toISOString(),
            }
            transactions.push(transaction)
          })
        }
      }

      // Insert users
      const { error: usersError } = await supabase.from("users").insert(users)
      if (usersError) throw usersError

      // Insert transactions
      const { error: transactionsError } = await supabase.from("transactions").insert(transactions)
      if (transactionsError) throw transactionsError

      console.log("Users and transactions created successfully")
    }

    // Create admin accounts
    const admins = [
      {
        username: "superadmin",
        password: hashPassword("password"),
        is_super_admin: true,
      },
      ...Object.keys(NIGERIAN_STATES).map((state) => ({
        username: state.toLowerCase(),
        password: hashPassword("password"),
        state,
        is_super_admin: false,
      })),
    ]

    // Check if admins already exist
    const { data: existingAdmins, error: adminCheckError } = await supabase.from("admins").select("username")

    if (adminCheckError) throw adminCheckError

    const existingUsernames = new Set(existingAdmins?.map((admin) => admin.username) || [])

    const newAdmins = admins.filter((admin) => !existingUsernames.has(admin.username))

    if (newAdmins.length > 0) {
      const { error: adminsError } = await supabase.from("admins").insert(newAdmins)
      if (adminsError) throw adminsError
      console.log(`${newAdmins.length} new admin accounts created`)
    } else {
      console.log("No new admin accounts to create")
    }

    return NextResponse.json({ message: "Database seeded successfully" })
  } catch (error) {
    console.error("Error seeding database:", error)
    return NextResponse.json(
      { error: "Failed to seed database", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}

