import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/database"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const alertId = Number.parseInt(params.id)
    const body = await request.json()
    const { status } = body

    if (!status) {
      return NextResponse.json({ success: false, error: "Status is required" }, { status: 400 })
    }

    const updateData: any = { status }
    if (status === "resolved") {
      updateData.resolved_at = new Date().toISOString()
    }

    const [alert] = await sql`
      UPDATE alerts 
      SET ${sql(updateData)}
      WHERE id = ${alertId}
      RETURNING *
    `

    if (!alert) {
      return NextResponse.json({ success: false, error: "Alert not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: alert,
      message: "Alert updated successfully",
    })
  } catch (error) {
    console.error("Update Alert Error:", error)
    return NextResponse.json({ success: false, error: "Failed to update alert" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const alertId = Number.parseInt(params.id)

    await sql`DELETE FROM alerts WHERE id = ${alertId}`

    return NextResponse.json({
      success: true,
      message: "Alert deleted successfully",
    })
  } catch (error) {
    console.error("Delete Alert Error:", error)
    return NextResponse.json({ success: false, error: "Failed to delete alert" }, { status: 500 })
  }
}
