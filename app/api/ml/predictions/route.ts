import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const modelType = searchParams.get("model_type")
    const targetType = searchParams.get("target_type")
    const limit = searchParams.get("limit") || "50"

    let query = `
      SELECT 
        mp.*,
        p.name as product_name,
        p.product_id,
        sz.zone_name,
        sz.zone_code
      FROM ml_predictions mp
      LEFT JOIN products p ON mp.target_entity_id = p.id AND mp.target_entity_type = 'product'
      LEFT JOIN storage_zones sz ON mp.target_entity_id = sz.id AND mp.target_entity_type = 'zone'
      WHERE 1=1
    `
    const params: any[] = []
    let paramIndex = 1

    if (modelType) {
      query += ` AND mp.model_type = $${paramIndex}`
      params.push(modelType)
      paramIndex++
    }

    if (targetType) {
      query += ` AND mp.target_entity_type = $${paramIndex}`
      params.push(targetType)
      paramIndex++
    }

    query += ` ORDER BY mp.created_at DESC LIMIT $${paramIndex}`
    params.push(Number.parseInt(limit))

    const predictions = await sql(query, params)

    return NextResponse.json({
      success: true,
      data: predictions,
      count: predictions.length,
    })
  } catch (error) {
    console.error("ML Predictions API Error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch ML predictions" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      model_type,
      prediction_type,
      target_entity_type,
      target_entity_id,
      prediction_value,
      confidence_score,
      predicted_for_date,
      features,
      model_version,
    } = body

    if (!model_type || !prediction_type || prediction_value === undefined || !confidence_score) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    const [prediction] = await sql`
      INSERT INTO ml_predictions (
        model_type, prediction_type, target_entity_type, target_entity_id,
        prediction_value, confidence_score, predicted_for_date, features, model_version
      ) VALUES (
        ${model_type}, ${prediction_type}, ${target_entity_type}, ${target_entity_id},
        ${prediction_value}, ${confidence_score}, ${predicted_for_date}, 
        ${JSON.stringify(features)}, ${model_version}
      ) RETURNING *
    `

    // Create alerts for high-confidence negative predictions
    if (confidence_score > 85) {
      let alertTitle = ""
      let alertMessage = ""
      let severity = "medium"

      switch (prediction_type) {
        case "quality_degradation_risk":
          if (prediction_value > 70) {
            severity = prediction_value > 85 ? "high" : "medium"
            alertTitle = "Quality Risk Predicted"
            alertMessage = `ML model predicts ${prediction_value}% risk of quality degradation`
          }
          break
        case "waste_increase":
          if (prediction_value > 15) {
            severity = "medium"
            alertTitle = "Waste Increase Predicted"
            alertMessage = `ML model predicts ${prediction_value}% increase in waste`
          }
          break
      }

      if (alertTitle) {
        await sql`
          INSERT INTO alerts (
            alert_type, severity, title, message, confidence_score,
            action_required_by
          ) VALUES (
            'ml_prediction', ${severity}, ${alertTitle}, ${alertMessage}, ${confidence_score},
            ${predicted_for_date || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]}
          )
        `
      }
    }

    return NextResponse.json({
      success: true,
      data: prediction,
      message: "ML prediction stored successfully",
    })
  } catch (error) {
    console.error("Store ML Prediction Error:", error)
    return NextResponse.json({ success: false, error: "Failed to store ML prediction" }, { status: 500 })
  }
}
