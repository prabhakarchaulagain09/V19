import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status") || "active"
    const severity = searchParams.get("severity")
    const type = searchParams.get("type")

    let query = `
      SELECT 
        a.*,
        sz.zone_name,
        sz.zone_code
      FROM alerts a
      LEFT JOIN storage_zones sz ON a.zone_id = sz.id
      WHERE a.status = $1
    `
    const params: any[] = [status]
    let paramIndex = 2

    if (severity) {
      query += ` AND a.severity = $${paramIndex}`
      params.push(severity)
      paramIndex++
    }

    if (type) {
      query += ` AND a.alert_type = $${paramIndex}`
      params.push(type)
      paramIndex++
    }

    query += ` ORDER BY 
      CASE a.severity 
        WHEN 'high' THEN 1 
        WHEN 'medium' THEN 2 
        WHEN 'low' THEN 3 
      END,
      a.created_at DESC
    `

    const alerts = await sql(query, params)

    // Get alert statistics
    const stats = await sql`
      SELECT 
        status,
        severity,
        COUNT(*) as count
      FROM alerts
      WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'
      GROUP BY status, severity
      ORDER BY status, severity
    `

    return NextResponse.json({
      success: true,
      data: alerts,
      stats: stats,
      count: alerts.length,
    })
  } catch (error) {
    console.error("Alerts API Error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch alerts" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { alert_type, severity, title, message, affected_products, zone_id, confidence_score, action_required_by } =
      body

    if (!alert_type || !severity || !title || !message) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: alert_type, severity, title, message" },
        { status: 400 },
      )
    }

    let zoneDbId = null
    if (zone_id) {
      if (typeof zone_id === "string") {
        const [zone] = await sql`SELECT id FROM storage_zones WHERE zone_code = ${zone_id}`
        zoneDbId = zone?.id
      } else {
        zoneDbId = zone_id
      }
    }

    const [alert] = await sql`
      INSERT INTO alerts (
        alert_type, severity, title, message, affected_products,
        zone_id, confidence_score, action_required_by
      ) VALUES (
        ${alert_type}, ${severity}, ${title}, ${message}, ${JSON.stringify(affected_products)},
        ${zoneDbId}, ${confidence_score}, ${action_required_by}
      ) RETURNING *
    `

    return NextResponse.json({
      success: true,
      data: alert,
      message: "Alert created successfully",
    })
  } catch (error) {
    console.error("Create Alert Error:", error)
    return NextResponse.json({ success: false, error: "Failed to create alert" }, { status: 500 })
  }
}
