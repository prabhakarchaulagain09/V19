import type { NextRequest } from "next/server"
import { sql } from "@/lib/database"

export async function GET(request: NextRequest) {
  const encoder = new TextEncoder()

  const stream = new ReadableStream({
    start(controller) {
      const sendData = async () => {
        try {
          // Get latest environmental data
          const environmentalData = await sql`
            SELECT DISTINCT ON (zone_id) 
              ed.*,
              sz.zone_name,
              sz.zone_code
            FROM environmental_data ed
            JOIN storage_zones sz ON ed.zone_id = sz.id
            ORDER BY zone_id, recorded_at DESC
          `

          // Get latest alerts
          const alerts = await sql`
            SELECT * FROM alerts 
            WHERE status = 'active' 
            ORDER BY created_at DESC 
            LIMIT 5
          `

          // Get recent activities
          const activities = await sql`
            SELECT 
              a.*,
              p.name as product_name,
              p.product_id
            FROM activities a
            LEFT JOIN products p ON a.product_id = p.id
            ORDER BY a.performed_at DESC
            LIMIT 10
          `

          // Send data as SSE
          const data = {
            timestamp: new Date().toISOString(),
            environmental: environmentalData,
            alerts: alerts,
            activities: activities,
          }

          controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`))
        } catch (error) {
          console.error("SSE Error:", error)
          controller.error(error)
        }
      }

      // Send initial data
      sendData()

      // Send updates every 30 seconds
      const interval = setInterval(sendData, 30000)

      // Cleanup function
      return () => {
        clearInterval(interval)
      }
    },
  })

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  })
}
