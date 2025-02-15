import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"
import { parse } from "csv-parse/sync"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const adminId = formData.get("adminId") as string

    // Check admin permissions
    const { data: admin, error: adminError } = await supabase.from("admins").select("*").eq("id", adminId).single()

    if (adminError || !admin) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    const csvContent = await file.text()
    const records = parse(csvContent, { columns: true, skip_empty_lines: true })

    for (const record of records) {
      const { data: user, error: userError } = await supabase.from("users").select("*").eq("id", record.userId).single()

      if (!userError && user && (admin.is_super_admin || admin.state === user.state)) {
        await supabase.from("transactions").insert({
          user_id: record.userId,
          amount: Number.parseInt(record.xp),
          description: record.description || "XP added via CSV upload",
          approved_by: adminId,
        })

        await supabase
          .from("users")
          .update({
            total_xp: user.total_xp + Number.parseInt(record.xp),
            monthly_xp: user.monthly_xp + Number.parseInt(record.xp),
          })
          .eq("id", user.id)
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error processing CSV:", error)
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 })
  }
}

