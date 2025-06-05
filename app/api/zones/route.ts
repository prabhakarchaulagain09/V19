import { NextResponse } from "next/server"
import { sql } from "@/lib/database"

export async function GET() {
  try {
    const zones = await sql`
      SELECT 
        sz.*,
        COALESCE(SUM(p.current_quantity_kg), 0) as current_utilization_kg,
        ROUND((COALESCE(SUM(p.current_quantity_kg), 0) / sz.capacity_kg * 100), 2) as utilization_percentage,
        COUNT(p.id) as product_count
      FROM storage_zones sz
      LEFT JOIN products p ON p.storage_location LIKE CONCAT(sz.zone_code, '%')
      GROUP BY sz.id
      ORDER BY sz.zone_code
    `

    // Get latest environmental data for each zone
    const environmentalData = await sql`
      SELECT DISTINCT ON (zone_id) 
        zone_id,
        temperature,
        humidity,
        air_quality_index,
        recorded_at
      FROM environmental_data
      ORDER BY zone_id, recorded_at DESC
    `

    // Combine zone data with environmental data
    const zonesWithEnvironment = zones.map((zone: any) => {
      const envData = environmentalData.find((env: any) => env.zone_id === zone.id)
      return {
        ...zone,
        environmental: envData || null,
      }
    })

    return NextResponse.json({
      success: true,
      data: zonesWithEnvironment,
    })
  } catch (error) {
    console.error("Zones API Error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch zones" }, { status: 500 })
  }
}
