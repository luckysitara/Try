import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function POST(request: Request) {
  try {
    const { name, state, xp, adminId } = await request.json()

    // Check admin permissions
    const { data: admin, error: adminError } = await supabase.from("admins").select("*").eq("id", adminId).single()

    if (adminError || !admin) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    if (!admin.is_super_admin) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    // Add user
    const { data: user, error: userError } = await supabase
      .from("users")
      .insert({ name, state, total_xp: xp, monthly_xp: xp })
      .select()
      .single()

    if (userError) {
      console.error("Error adding user:", userError)
      return NextResponse.json({ success: false, message: "Failed to add user" }, { status: 500 })
    }

    // Add initial XP transaction
    if (xp > 0) {
      const { error: transactionError } = await supabase.from("transactions").insert({
        user_id: user.id,
        amount: xp,
        description: "Initial XP",
        approved_by: adminId,
      })

      if (transactionError) {
        console.error("Error adding initial XP transaction:", transactionError)
      }
    }

    return NextResponse.json({ success: true, user })
  } catch (error) {
    console.error("Unexpected error:", error)
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 })
  }
}

