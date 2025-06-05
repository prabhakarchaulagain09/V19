import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/database"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const productId = params.id

    const [product] = await sql`
      SELECT 
        p.*,
        ROUND((p.current_quantity_kg / p.quantity_kg * 100), 2) as remaining_percentage,
        CASE 
          WHEN p.expiry_date <= CURRENT_DATE + INTERVAL '30 days' THEN true
          ELSE false
        END as expiring_soon
      FROM products p
      WHERE p.product_id = ${productId}
    `

    if (!product) {
      return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 })
    }

    // Get supply chain journey
    const journey = await sql`
      SELECT * FROM supply_chain_events 
      WHERE product_id = ${product.id}
      ORDER BY event_date ASC
    `

    // Get activities related to this product
    const activities = await sql`
      SELECT 
        a.*,
        sz.zone_name
      FROM activities a
      LEFT JOIN storage_zones sz ON a.zone_id = sz.id
      WHERE a.product_id = ${product.id}
      ORDER BY a.performed_at DESC
      LIMIT 20
    `

    // Get ML predictions for this product
    const predictions = await sql`
      SELECT * FROM ml_predictions
      WHERE target_entity_type = 'product' AND target_entity_id = ${product.id}
      ORDER BY created_at DESC
      LIMIT 10
    `

    return NextResponse.json({
      success: true,
      data: {
        product,
        journey,
        activities,
        predictions,
      },
    })
  } catch (error) {
    console.error("Get Product Error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch product" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const productId = params.id
    const body = await request.json()

    const [product] = await sql`
      UPDATE products 
      SET ${sql(body)}, updated_at = CURRENT_TIMESTAMP
      WHERE product_id = ${productId}
      RETURNING *
    `

    if (!product) {
      return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: product,
      message: "Product updated successfully",
    })
  } catch (error) {
    console.error("Update Product Error:", error)
    return NextResponse.json({ success: false, error: "Failed to update product" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const productId = params.id

    // Get product info first
    const [product] = await sql`
      SELECT * FROM products WHERE product_id = ${productId}
    `

    if (!product) {
      return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 })
    }

    // Delete related records first
    await sql`DELETE FROM supply_chain_events WHERE product_id = ${product.id}`
    await sql`DELETE FROM activities WHERE product_id = ${product.id}`
    await sql`DELETE FROM ml_predictions WHERE target_entity_type = 'product' AND target_entity_id = ${product.id}`

    // Delete the product
    await sql`DELETE FROM products WHERE id = ${product.id}`

    // Update zone utilization
    const zoneCode = product.storage_location.split("-")[0]
    await sql`
      UPDATE storage_zones 
      SET current_utilization_kg = GREATEST(0, current_utilization_kg - ${product.current_quantity_kg})
      WHERE zone_code = ${zoneCode}
    `

    return NextResponse.json({
      success: true,
      message: "Product deleted successfully",
    })
  } catch (error) {
    console.error("Delete Product Error:", error)
    return NextResponse.json({ success: false, error: "Failed to delete product" }, { status: 500 })
  }
}
