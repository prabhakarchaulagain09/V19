import { NextResponse } from "next/server"
import { sql } from "@/lib/database"

export async function GET() {
  try {
    // Get basic statistics
    const [productStats] = await sql`
      SELECT 
        COUNT(*) as total_products,
        COUNT(CASE WHEN status = 'Excellent' THEN 1 END) as excellent_products,
        COUNT(CASE WHEN status = 'Good' THEN 1 END) as good_products,
        COUNT(CASE WHEN status = 'Fair' THEN 1 END) as fair_products,
        COUNT(CASE WHEN status = 'Poor' THEN 1 END) as poor_products,
        SUM(current_quantity_kg) as total_quantity_kg,
        COUNT(CASE WHEN expiry_date <= CURRENT_DATE + INTERVAL '30 days' THEN 1 END) as expiring_soon
      FROM products
    `

    // Get zone utilization
    const zoneUtilization = await sql`
      SELECT 
        sz.zone_name,
        sz.zone_code,
        sz.capacity_kg,
        COALESCE(SUM(p.current_quantity_kg), 0) as current_utilization_kg,
        ROUND((COALESCE(SUM(p.current_quantity_kg), 0) / sz.capacity_kg * 100), 2) as utilization_percentage
      FROM storage_zones sz
      LEFT JOIN products p ON p.storage_location LIKE CONCAT(sz.zone_code, '%')
      GROUP BY sz.id, sz.zone_name, sz.zone_code, sz.capacity_kg
      ORDER BY sz.zone_code
    `

    // Get active alerts count by severity
    const alertStats = await sql`
      SELECT 
        severity,
        COUNT(*) as count
      FROM alerts
      WHERE status = 'active'
      GROUP BY severity
    `

    // Get recent activity counts
    const activityStats = await sql`
      SELECT 
        activity_type,
        COUNT(CASE WHEN performed_at >= CURRENT_DATE THEN 1 END) as today_count,
        COUNT(CASE WHEN performed_at >= CURRENT_DATE - INTERVAL '7 days' THEN 1 END) as week_count
      FROM activities
      GROUP BY activity_type
    `

    // Get environmental status
    const environmentalStatus = await sql`
      SELECT DISTINCT ON (ed.zone_id) 
        sz.zone_name,
        sz.zone_code,
        ed.temperature,
        ed.humidity,
        sz.optimal_temperature,
        sz.optimal_humidity,
        CASE 
          WHEN ABS(ed.temperature - COALESCE(sz.optimal_temperature, 18)) > 2 
            OR ABS(ed.humidity - COALESCE(sz.optimal_humidity, 45)) > 5 THEN 'alert'
          WHEN ABS(ed.temperature - COALESCE(sz.optimal_temperature, 18)) > 1 
            OR ABS(ed.humidity - COALESCE(sz.optimal_humidity, 45)) > 3 THEN 'warning'
          ELSE 'optimal'
        END as status
      FROM environmental_data ed
      JOIN storage_zones sz ON ed.zone_id = sz.id
      ORDER BY ed.zone_id, ed.recorded_at DESC
    `

    // Get latest ML predictions summary
    const mlInsights = await sql`
      SELECT DISTINCT ON (model_type)
        model_type,
        prediction_value,
        confidence_score,
        created_at
      FROM ml_predictions
      ORDER BY model_type, created_at DESC
    `

    // Calculate overall system health score
    const totalCapacity = zoneUtilization.reduce(
      (sum: number, zone: any) => sum + Number.parseFloat(zone.capacity_kg),
      0,
    )
    const totalUtilization = zoneUtilization.reduce(
      (sum: number, zone: any) => sum + Number.parseFloat(zone.current_utilization_kg),
      0,
    )
    const overallUtilization = Math.round((totalUtilization / totalCapacity) * 100)

    const highAlerts = alertStats.find((stat: any) => stat.severity === "high")?.count || 0
    const mediumAlerts = alertStats.find((stat: any) => stat.severity === "medium")?.count || 0

    const environmentalIssues = environmentalStatus.filter((env: any) => env.status === "alert").length
    const systemHealthScore = Math.max(0, 100 - highAlerts * 10 - mediumAlerts * 5 - environmentalIssues * 8)

    return NextResponse.json({
      success: true,
      data: {
        products: productStats,
        zones: zoneUtilization,
        alerts: alertStats,
        activities: activityStats,
        environmental: environmentalStatus,
        mlInsights: mlInsights,
        overview: {
          totalCapacity,
          totalUtilization,
          overallUtilization,
          systemHealthScore,
          totalAlerts: alertStats.reduce((sum: number, stat: any) => sum + Number.parseInt(stat.count), 0),
        },
      },
    })
  } catch (error) {
    console.error("Dashboard Stats Error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch dashboard statistics" }, { status: 500 })
  }
}
