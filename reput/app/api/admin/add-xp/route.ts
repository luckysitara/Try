import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function POST(request: Request) {
  try {
    const { userId, xp, adminId } = await request.json()

    // Check admin permissions
    const { data: admin, error: adminError } = await supabase.from("admins").select("*").eq("id", adminId).single()

    if (adminError || !admin) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    // Get user
    const { data: user, error: userError } = await supabase.from("users").select("*").eq("id", userId).single()

    if (userError || !user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 })
    }

    if (!admin.is_super_admin && admin.state !== user.state) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    // Add transaction
    const { error: transactionError } = await supabase.from("transactions").insert({
      user_id: userId,
      amount: xp,
      description: "XP added by admin",
      approved_by: adminId,
    })

    if (transactionError) {
      console.error("Error adding transaction:", transactionError)
      return NextResponse.json({ success: false, message: "Failed to add XP" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Unexpected error:", error)
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 })
  }
}

