import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type")
    const productId = searchParams.get("product_id")
    const zoneId = searchParams.get("zone_id")
    const limit = searchParams.get("limit") || "50"

    let query = `
      SELECT 
        a.*,
        p.name as product_name,
        p.product_id,
        sz.zone_name
      FROM activities a
      LEFT JOIN products p ON a.product_id = p.id
      LEFT JOIN storage_zones sz ON a.zone_id = sz.id
      WHERE 1=1
    `
    const params: any[] = []
    let paramIndex = 1

    if (type) {
      query += ` AND a.activity_type = $${paramIndex}`
      params.push(type)
      paramIndex++
    }

    if (productId) {
      query += ` AND p.product_id = $${paramIndex}`
      params.push(productId)
      paramIndex++
    }

    if (zoneId) {
      query += ` AND a.zone_id = $${paramIndex}`
      params.push(Number.parseInt(zoneId))
      paramIndex++
    }

    query += ` ORDER BY a.performed_at DESC LIMIT $${paramIndex}`
    params.push(Number.parseInt(limit))

    const activities = await sql(query, params)

    // Get activity statistics
    const stats = await sql`
      SELECT 
        activity_type,
        COUNT(*) as count,
        COUNT(CASE WHEN performed_at >= CURRENT_DATE THEN 1 END) as today_count,
        COUNT(CASE WHEN performed_at >= CURRENT_DATE - INTERVAL '7 days' THEN 1 END) as week_count
      FROM activities
      GROUP BY activity_type
    `

    return NextResponse.json({
      success: true,
      data: activities,
      stats: stats,
      count: activities.length,
    })
  } catch (error) {
    console.error("Activities API Error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch activities" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      activity_type,
      title,
      product_id,
      zone_id,
      performed_by,
      description,
      chemical_used,
      quantity_applied,
      environmental_conditions,
    } = body

    if (!activity_type || !title || !performed_by) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: activity_type, title, performed_by" },
        { status: 400 },
      )
    }

    // Get product and zone IDs if provided as strings
    let productDbId = null
    let zoneDbId = null

    if (product_id) {
      const [product] = await sql`SELECT id FROM products WHERE product_id = ${product_id}`
      productDbId = product?.id
    }

    if (zone_id) {
      if (typeof zone_id === "string") {
        const [zone] = await sql`SELECT id FROM storage_zones WHERE zone_code = ${zone_id}`
        zoneDbId = zone?.id
      } else {
        zoneDbId = zone_id
      }
    }

    const [activity] = await sql`
      INSERT INTO activities (
        activity_type, title, product_id, zone_id, performed_by,
        description, chemical_used, quantity_applied, environmental_conditions
      ) VALUES (
        ${activity_type}, ${title}, ${productDbId}, ${zoneDbId}, ${performed_by},
        ${description}, ${chemical_used}, ${quantity_applied}, ${JSON.stringify(environmental_conditions)}
      ) RETURNING *
    `

    // Update product treatment count if it's a treatment activity
    if (activity_type === "treatment" && productDbId) {
      await sql`
        UPDATE products 
        SET treatments_count = treatments_count + 1
        WHERE id = ${productDbId}
      `
    }

    // Create supply chain event
    if (productDbId) {
      await sql`
        INSERT INTO supply_chain_events (
          product_id, event_type, event_date, location, actor, description,
          treatment_details
        ) VALUES (
          ${productDbId}, ${activity_type}, ${new Date().toISOString()},
          ${zoneDbId ? `Zone ${zone_id}` : "Storage Facility"}, ${performed_by}, ${description},
          ${chemical_used ? JSON.stringify({ chemical: chemical_used, quantity: quantity_applied }) : null}
        )
      `
    }

    return NextResponse.json({
      success: true,
      data: activity,
      message: "Activity logged successfully",
    })
  } catch (error) {
    console.error("Create Activity Error:", error)
    return NextResponse.json({ success: false, error: "Failed to log activity" }, { status: 500 })
  }
}
