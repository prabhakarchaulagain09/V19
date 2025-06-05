import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const status = searchParams.get("status")
    const search = searchParams.get("search")
    const limit = searchParams.get("limit") || "50"

    let query = `
      SELECT 
        p.*,
        ROUND((p.current_quantity_kg / p.quantity_kg * 100), 2) as remaining_percentage,
        CASE 
          WHEN p.expiry_date <= CURRENT_DATE + INTERVAL '30 days' THEN true
          ELSE false
        END as expiring_soon
      FROM products p
      WHERE 1=1
    `
    const params: any[] = []
    let paramIndex = 1

    if (category) {
      query += ` AND p.category = $${paramIndex}`
      params.push(category)
      paramIndex++
    }

    if (status) {
      query += ` AND p.status = $${paramIndex}`
      params.push(status)
      paramIndex++
    }

    if (search) {
      query += ` AND (p.name ILIKE $${paramIndex} OR p.product_id ILIKE $${paramIndex} OR p.farmer_name ILIKE $${paramIndex})`
      params.push(`%${search}%`)
      paramIndex++
    }

    query += ` ORDER BY p.created_at DESC LIMIT $${paramIndex}`
    params.push(Number.parseInt(limit))

    const products = await sql(query, params)

    return NextResponse.json({
      success: true,
      data: products,
      count: products.length,
    })
  } catch (error) {
    console.error("Products API Error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch products" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      product_id,
      name,
      category,
      farmer_name,
      farm_location,
      harvest_date,
      quantity_kg,
      storage_location,
      expiry_date,
      notes,
    } = body

    // Validate required fields
    if (!product_id || !name || !category || !farmer_name || !harvest_date || !quantity_kg || !storage_location) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    // Generate QR code
    const qr_code = `QR_${product_id.replace("-", "")}`

    const [product] = await sql`
      INSERT INTO products (
        product_id, name, category, farmer_name, farm_location,
        harvest_date, storage_date, quantity_kg, current_quantity_kg,
        storage_location, expiry_date, notes, qr_code
      ) VALUES (
        ${product_id}, ${name}, ${category}, ${farmer_name}, ${farm_location},
        ${harvest_date}, ${new Date().toISOString().split("T")[0]}, ${quantity_kg}, ${quantity_kg},
        ${storage_location}, ${expiry_date}, ${notes}, ${qr_code}
      ) RETURNING *
    `

    // Create initial supply chain event
    await sql`
      INSERT INTO supply_chain_events (
        product_id, event_type, event_date, location, actor, description
      ) VALUES (
        ${product.id}, 'intake', ${new Date().toISOString()}, 
        'FoodTrace Pro Facility', 'System', 
        'Product registered and stored in ${storage_location}'
      )
    `

    // Update zone utilization
    const zoneCode = storage_location.split("-")[0]
    await sql`
      UPDATE storage_zones 
      SET current_utilization_kg = current_utilization_kg + ${quantity_kg}
      WHERE zone_code = ${zoneCode}
    `

    return NextResponse.json({
      success: true,
      data: product,
      message: "Product created successfully",
    })
  } catch (error) {
    console.error("Create Product Error:", error)
    if (error instanceof Error && error.message.includes("duplicate key")) {
      return NextResponse.json({ success: false, error: "Product ID already exists" }, { status: 409 })
    }
    return NextResponse.json({ success: false, error: "Failed to create product" }, { status: 500 })
  }
}
