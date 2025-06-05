-- Create the main database schema for the food storage system

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  product_id VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  farmer_name VARCHAR(255) NOT NULL,
  farm_location VARCHAR(255),
  harvest_date DATE NOT NULL,
  storage_date DATE NOT NULL,
  quantity_kg DECIMAL(10,2) NOT NULL,
  current_quantity_kg DECIMAL(10,2) NOT NULL,
  storage_location VARCHAR(100) NOT NULL,
  status VARCHAR(50) DEFAULT 'Good',
  expiry_date DATE,
  initial_quality_score INTEGER DEFAULT 100,
  current_quality_score INTEGER DEFAULT 100,
  treatments_count INTEGER DEFAULT 0,
  notes TEXT,
  qr_code VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Storage zones table
CREATE TABLE IF NOT EXISTS storage_zones (
  id SERIAL PRIMARY KEY,
  zone_name VARCHAR(50) UNIQUE NOT NULL,
  zone_code VARCHAR(10) UNIQUE NOT NULL,
  capacity_kg DECIMAL(10,2) NOT NULL,
  current_utilization_kg DECIMAL(10,2) DEFAULT 0,
  optimal_temperature DECIMAL(4,1),
  optimal_humidity DECIMAL(4,1),
  zone_type VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Environmental monitoring table
CREATE TABLE IF NOT EXISTS environmental_data (
  id SERIAL PRIMARY KEY,
  zone_id INTEGER REFERENCES storage_zones(id),
  temperature DECIMAL(4,1) NOT NULL,
  humidity DECIMAL(4,1) NOT NULL,
  air_quality_index INTEGER,
  co2_level DECIMAL(6,2),
  pressure DECIMAL(8,2),
  recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Activities/treatments table
CREATE TABLE IF NOT EXISTS activities (
  id SERIAL PRIMARY KEY,
  activity_type VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  product_id INTEGER REFERENCES products(id),
  zone_id INTEGER REFERENCES storage_zones(id),
  performed_by VARCHAR(255) NOT NULL,
  description TEXT,
  chemical_used VARCHAR(255),
  quantity_applied VARCHAR(100),
  environmental_conditions JSONB,
  status VARCHAR(50) DEFAULT 'completed',
  performed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Alerts table
CREATE TABLE IF NOT EXISTS alerts (
  id SERIAL PRIMARY KEY,
  alert_type VARCHAR(50) NOT NULL,
  severity VARCHAR(20) NOT NULL,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  affected_products JSONB,
  zone_id INTEGER REFERENCES storage_zones(id),
  status VARCHAR(20) DEFAULT 'active',
  confidence_score DECIMAL(5,2),
  action_required_by DATE,
  resolved_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ML predictions table
CREATE TABLE IF NOT EXISTS ml_predictions (
  id SERIAL PRIMARY KEY,
  model_type VARCHAR(50) NOT NULL,
  prediction_type VARCHAR(50) NOT NULL,
  target_entity_type VARCHAR(50), -- 'product', 'zone', 'global'
  target_entity_id INTEGER,
  prediction_value DECIMAL(10,4) NOT NULL,
  confidence_score DECIMAL(5,2) NOT NULL,
  predicted_for_date DATE,
  features JSONB,
  model_version VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Supply chain tracking table
CREATE TABLE IF NOT EXISTS supply_chain_events (
  id SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES products(id),
  event_type VARCHAR(50) NOT NULL,
  event_date TIMESTAMP NOT NULL,
  location VARCHAR(255) NOT NULL,
  actor VARCHAR(255) NOT NULL,
  description TEXT,
  environmental_data JSONB,
  treatment_details JSONB,
  quality_metrics JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Users/staff table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL,
  permissions JSONB,
  last_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- System settings table
CREATE TABLE IF NOT EXISTS system_settings (
  id SERIAL PRIMARY KEY,
  setting_key VARCHAR(100) UNIQUE NOT NULL,
  setting_value JSONB NOT NULL,
  description TEXT,
  updated_by INTEGER REFERENCES users(id),
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_product_id ON products(product_id);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_status ON products(status);
CREATE INDEX IF NOT EXISTS idx_environmental_data_zone_recorded ON environmental_data(zone_id, recorded_at);
CREATE INDEX IF NOT EXISTS idx_activities_product_performed ON activities(product_id, performed_at);
CREATE INDEX IF NOT EXISTS idx_activities_type ON activities(activity_type);
CREATE INDEX IF NOT EXISTS idx_alerts_status_severity ON alerts(status, severity);
CREATE INDEX IF NOT EXISTS idx_ml_predictions_type_target ON ml_predictions(model_type, target_entity_type, target_entity_id);
CREATE INDEX IF NOT EXISTS idx_supply_chain_product_date ON supply_chain_events(product_id, event_date);

-- Create triggers for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
