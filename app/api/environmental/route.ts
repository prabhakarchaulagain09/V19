import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const zoneId = searchParams.get("zone_id")
    const hours = searchParams.get("hours") || "24"

    let environmentalData

    if (zoneId) {
      // Get data for specific zone
      environmentalData = await sql`
        SELECT 
          ed.*,
          sz.zone_name,
          sz.zone_code,
          sz.optimal_temperature,
          sz.optimal_humidity
        FROM environmental_data ed
        JOIN storage_zones sz ON ed.zone_id = sz.id
        WHERE ed.zone_id = ${zoneId}
        AND ed.recorded_at >= NOW() - INTERVAL '${hours} hours'
        ORDER BY ed.recorded_at DESC
      `
    } else {
      // Get latest data for all zones
      environmentalData = await sql`
        SELECT DISTINCT ON (ed.zone_id) 
          ed.*,
          sz.zone_name,
          sz.zone_code,
          sz.optimal_temperature,
          sz.optimal_humidity,
          CASE 
            WHEN ABS(ed.temperature - sz.optimal_temperature) > 2 THEN 'alert'
            WHEN ABS(ed.temperature - sz.optimal_temperature) > 1 THEN 'warning'
            ELSE 'optimal'
          END as temperature_status,
          CASE 
            WHEN ABS(ed.humidity - sz.optimal_humidity) > 5 THEN 'alert'
            WHEN ABS(ed.humidity - sz.optimal_humidity) > 3 THEN 'warning'
            ELSE 'optimal'
          END as humidity_status
        FROM environmental_data ed
        JOIN storage_zones sz ON ed.zone_id = sz.id
        ORDER BY ed.zone_id, ed.recorded_at DESC
      `
    }

    return NextResponse.json({
      success: true,
      data: environmentalData,
    })
  } catch (error) {
    console.error("Environmental API Error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch environmental data" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { zone_id, temperature, humidity, air_quality_index, co2_level, pressure } = body

    if (!zone_id || temperature === undefined || humidity === undefined) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: zone_id, temperature, humidity" },
        { status: 400 },
      )
    }

    const [data] = await sql`
      INSERT INTO environmental_data (
        zone_id, temperature, humidity, air_quality_index, co2_level, pressure
      ) VALUES (
        ${zone_id}, ${temperature}, ${humidity}, ${air_quality_index}, ${co2_level}, ${pressure}
      ) RETURNING *
    `

    // Check for threshold violations and create alerts
    const [zone] = await sql`
      SELECT * FROM storage_zones WHERE id = ${zone_id}
    `

    if (zone) {
      const tempDiff = Math.abs(temperature - (zone.optimal_temperature || 18))
      const humidityDiff = Math.abs(humidity - (zone.optimal_humidity || 45))

      if (tempDiff > 2 || humidityDiff > 5) {
        const severity = tempDiff > 3 || humidityDiff > 8 ? "high" : "medium"
        const message = `Environmental conditions in ${zone.zone_name} are outside optimal range. Temperature: ${temperature}°C (optimal: ${zone.optimal_temperature}°C), Humidity: ${humidity}% (optimal: ${zone.optimal_humidity}%)`

        await sql`
          INSERT INTO alerts (
            alert_type, severity, title, message, zone_id, affected_products, confidence_score
          ) VALUES (
            'environmental', ${severity}, 'Environmental Alert - ${zone.zone_name}', 
            ${message}, ${zone_id}, '["All products in ${zone.zone_name}"]', 95.0
          )
        `
      }
    }

    return NextResponse.json({
      success: true,
      data,
      message: "Environmental data recorded successfully",
    })
  } catch (error) {
    console.error("Environmental Data Creation Error:", error)
    return NextResponse.json({ success: false, error: "Failed to record environmental data" }, { status: 500 })
  }
}
