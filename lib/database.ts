import { neon } from "@neondatabase/serverless"

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set")
}

export const sql = neon(process.env.DATABASE_URL)

// Database types
export interface Product {
  id: number
  product_id: string
  name: string
  category: string
  farmer_name: string
  farm_location?: string
  harvest_date: string
  storage_date: string
  quantity_kg: number
  current_quantity_kg: number
  storage_location: string
  status: string
  expiry_date?: string
  initial_quality_score: number
  current_quality_score: number
  treatments_count: number
  notes?: string
  qr_code?: string
  created_at: string
  updated_at: string
}

export interface StorageZone {
  id: number
  zone_name: string
  zone_code: string
  capacity_kg: number
  current_utilization_kg: number
  optimal_temperature?: number
  optimal_humidity?: number
  zone_type?: string
  created_at: string
}

export interface EnvironmentalData {
  id: number
  zone_id: number
  temperature: number
  humidity: number
  air_quality_index?: number
  co2_level?: number
  pressure?: number
  recorded_at: string
}

export interface Activity {
  id: number
  activity_type: string
  title: string
  product_id?: number
  zone_id?: number
  performed_by: string
  description?: string
  chemical_used?: string
  quantity_applied?: string
  environmental_conditions?: any
  status: string
  performed_at: string
}

export interface Alert {
  id: number
  alert_type: string
  severity: string
  title: string
  message: string
  affected_products?: any
  zone_id?: number
  status: string
  confidence_score?: number
  action_required_by?: string
  resolved_at?: string
  created_at: string
}

export interface MLPrediction {
  id: number
  model_type: string
  prediction_type: string
  target_entity_type?: string
  target_entity_id?: number
  prediction_value: number
  confidence_score: number
  predicted_for_date?: string
  features?: any
  model_version?: string
  created_at: string
}

export interface SupplyChainEvent {
  id: number
  product_id: number
  event_type: string
  event_date: string
  location: string
  actor: string
  description?: string
  environmental_data?: any
  treatment_details?: any
  quality_metrics?: any
  created_at: string
}

export interface User {
  id: number
  username: string
  email: string
  full_name: string
  role: string
  permissions?: any
  last_login?: string
  created_at: string
}

// Database utilities
export class DatabaseError extends Error {
  constructor(
    message: string,
    public cause?: Error,
  ) {
    super(message)
    this.name = "DatabaseError"
  }
}

export async function withTransaction<T>(
  callback: (sql: typeof import("@neondatabase/serverless").neon) => Promise<T>,
): Promise<T> {
  try {
    return await callback(sql)
  } catch (error) {
    throw new DatabaseError("Transaction failed", error as Error)
  }
}

// Common queries
export const queries = {
  // Products
  getAllProducts: () => sql`SELECT * FROM products ORDER BY created_at DESC`,

  getProductById: (id: number) => sql`SELECT * FROM products WHERE id = ${id}`,

  getProductByProductId: (productId: string) => sql`SELECT * FROM products WHERE product_id = ${productId}`,

  // Storage zones
  getAllZones: () => sql`SELECT * FROM storage_zones ORDER BY zone_code`,

  getZoneUtilization: () => sql`
    SELECT 
      sz.*,
      COALESCE(SUM(p.current_quantity_kg), 0) as actual_utilization_kg,
      ROUND((COALESCE(SUM(p.current_quantity_kg), 0) / sz.capacity_kg * 100), 2) as utilization_percentage
    FROM storage_zones sz
    LEFT JOIN products p ON p.storage_location LIKE CONCAT(sz.zone_code, '%')
    GROUP BY sz.id
    ORDER BY sz.zone_code
  `,

  // Environmental data
  getLatestEnvironmentalData: () => sql`
    SELECT DISTINCT ON (zone_id) 
      ed.*,
      sz.zone_name,
      sz.zone_code
    FROM environmental_data ed
    JOIN storage_zones sz ON ed.zone_id = sz.id
    ORDER BY zone_id, recorded_at DESC
  `,

  // Activities
  getRecentActivities: (limit = 50) => sql`
    SELECT 
      a.*,
      p.name as product_name,
      p.product_id,
      sz.zone_name
    FROM activities a
    LEFT JOIN products p ON a.product_id = p.id
    LEFT JOIN storage_zones sz ON a.zone_id = sz.id
    ORDER BY a.performed_at DESC
    LIMIT ${limit}
  `,

  // Alerts
  getActiveAlerts: () => sql`
    SELECT 
      a.*,
      sz.zone_name
    FROM alerts a
    LEFT JOIN storage_zones sz ON a.zone_id = sz.id
    WHERE a.status = 'active'
    ORDER BY 
      CASE a.severity 
        WHEN 'high' THEN 1 
        WHEN 'medium' THEN 2 
        WHEN 'low' THEN 3 
      END,
      a.created_at DESC
  `,

  // ML Predictions
  getLatestPredictions: () => sql`
    SELECT DISTINCT ON (model_type, target_entity_type, target_entity_id)
      mp.*,
      p.name as product_name,
      p.product_id,
      sz.zone_name
    FROM ml_predictions mp
    LEFT JOIN products p ON mp.target_entity_id = p.id AND mp.target_entity_type = 'product'
    LEFT JOIN storage_zones sz ON mp.target_entity_id = sz.id AND mp.target_entity_type = 'zone'
    ORDER BY model_type, target_entity_type, target_entity_id, created_at DESC
  `,

  // Supply chain
  getProductJourney: (productId: number) => sql`
    SELECT * FROM supply_chain_events 
    WHERE product_id = ${productId}
    ORDER BY event_date ASC
  `,
}
