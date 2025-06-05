-- Seed initial data for the food storage system

-- Insert storage zones
INSERT INTO storage_zones (zone_name, zone_code, capacity_kg, optimal_temperature, optimal_humidity, zone_type) VALUES
('Zone A - Grains', 'A', 50000, 18.0, 45.0, 'grains'),
('Zone B - Cereals', 'B', 35000, 17.5, 40.0, 'cereals'),
('Zone C - Pulses', 'C', 25000, 18.5, 42.0, 'pulses'),
('Zone D - Seeds', 'D', 15000, 17.0, 38.0, 'seeds')
ON CONFLICT (zone_code) DO NOTHING;

-- Insert sample products
INSERT INTO products (
  product_id, name, category, farmer_name, farm_location, harvest_date, 
  storage_date, quantity_kg, current_quantity_kg, storage_location, 
  status, expiry_date, qr_code
) VALUES
('W-2024-001', 'Premium Wheat', 'Grains', 'Green Valley Farm', 'Punjab, India', '2024-05-15', '2024-05-17', 2500.00, 2500.00, 'Zone A-1', 'Good', '2025-05-15', 'QR_W2024001'),
('R-2024-045', 'Basmati Rice', 'Grains', 'Sunrise Agriculture', 'Haryana, India', '2024-04-20', '2024-04-22', 1800.00, 1800.00, 'Zone B-2', 'Excellent', '2025-04-20', 'QR_R2024045'),
('C-2024-023', 'Sweet Corn', 'Cereals', 'Mountain View Ranch', 'Uttar Pradesh, India', '2024-05-28', '2024-05-30', 3200.00, 3200.00, 'Zone C-1', 'Fair', '2024-11-28', 'QR_C2024023'),
('L-2024-012', 'Red Lentils', 'Pulses', 'Organic Farms Co.', 'Rajasthan, India', '2024-03-10', '2024-03-12', 1200.00, 1200.00, 'Zone D-3', 'Good', '2025-03-10', 'QR_L2024012'),
('B-2024-015', 'Organic Barley', 'Cereals', 'Eco Valley Farms', 'Maharashtra, India', '2024-04-05', '2024-04-07', 2800.00, 2800.00, 'Zone B-1', 'Good', '2025-04-05', 'QR_B2024015'),
('Q-2024-008', 'Quinoa Seeds', 'Seeds', 'Himalayan Organics', 'Himachal Pradesh, India', '2024-03-20', '2024-03-22', 800.00, 800.00, 'Zone D-1', 'Excellent', '2025-03-20', 'QR_Q2024008')
ON CONFLICT (product_id) DO NOTHING;

-- Insert sample users
INSERT INTO users (username, email, full_name, role, permissions) VALUES
('admin', 'admin@veggievitals.com', 'System Administrator', 'admin', '{"all": true}'),
('john.smith', 'john.smith@veggievitals.com', 'John Smith', 'storage_manager', '{"inventory": true, "activities": true}'),
('maria.garcia', 'maria.garcia@veggievitals.com', 'Maria Garcia', 'treatment_specialist', '{"treatments": true, "activities": true}'),
('david.chen', 'david.chen@veggievitals.com', 'David Chen', 'quality_inspector', '{"quality": true, "analytics": true}'),
('sarah.wilson', 'sarah.wilson@veggievitals.com', 'Sarah Wilson', 'logistics_coordinator', '{"inventory": true, "traceability": true}')
ON CONFLICT (email) DO NOTHING;

-- Insert sample activities
INSERT INTO activities (activity_type, title, product_id, performed_by, description, chemical_used, quantity_applied, status, performed_at) VALUES
('movement', 'Grain Shuffling', 1, 'John Smith', 'Routine shuffling performed to prevent settling and maintain freshness', NULL, NULL, 'completed', CURRENT_TIMESTAMP - INTERVAL '2 hours'),
('treatment', 'Pest Treatment Applied', 2, 'Maria Garcia', 'Organic insecticide applied - Diatomaceous Earth. No harmful chemicals used.', 'Diatomaceous Earth', '2.5kg', 'completed', CURRENT_TIMESTAMP - INTERVAL '4 hours'),
('quality_check', 'Quality Inspection', 3, 'David Chen', 'Moisture content checked: 12.5%. Color and texture assessment: Good condition.', NULL, NULL, 'completed', CURRENT_TIMESTAMP - INTERVAL '6 hours'),
('environmental', 'Temperature Adjustment', NULL, 'System', 'HVAC system adjusted due to high ambient temperature. Target: 18°C, Current: 19.5°C', NULL, NULL, 'completed', CURRENT_TIMESTAMP - INTERVAL '8 hours'),
('movement', 'Product Relocation', 4, 'Sarah Wilson', 'Moved from Zone D-2 to Zone D-3 due to humidity concerns', NULL, NULL, 'completed', CURRENT_TIMESTAMP - INTERVAL '10 hours');

-- Insert environmental data
INSERT INTO environmental_data (zone_id, temperature, humidity, air_quality_index, co2_level, pressure) VALUES
(1, 18.2, 43.5, 85, 420.5, 1013.25),
(2, 19.8, 48.2, 78, 435.2, 1012.80),
(3, 17.5, 41.0, 90, 415.8, 1013.45),
(4, 18.8, 47.5, 82, 428.3, 1012.95);

-- Insert sample alerts
INSERT INTO alerts (alert_type, severity, title, message, affected_products, status, confidence_score, action_required_by) VALUES
('expiry', 'high', 'Products Nearing Expiration', '3 products will expire within the next 30 days', '["Sweet Corn (C-2024-023)", "Organic Barley (B-2024-015)", "Quinoa Seeds (Q-2024-008)"]', 'active', 94.0, CURRENT_DATE + INTERVAL '30 days'),
('environmental', 'high', 'High Humidity in Zone B', 'Humidity levels have exceeded safe thresholds (52%)', '["All products in Zone B"]', 'active', 87.5, CURRENT_DATE + INTERVAL '1 day'),
('pest', 'medium', 'Pest Activity Detected', 'Unusual pest activity detected in Zone B-2', '["Basmati Rice (R-2024-045)", "Organic Barley (B-2024-015)"]', 'active', 72.3, CURRENT_DATE + INTERVAL '7 days');

-- Insert ML predictions
INSERT INTO ml_predictions (model_type, prediction_type, target_entity_type, target_entity_id, prediction_value, confidence_score, predicted_for_date, model_version) VALUES
('waste', 'waste_reduction_percentage', 'zone', 1, -25.3, 92.0, CURRENT_DATE + INTERVAL '30 days', '1.2.1'),
('quality', 'quality_degradation_risk', 'product', 3, 78.0, 87.0, CURRENT_DATE + INTERVAL '5 days', '1.1.8'),
('treatment', 'treatment_effectiveness', 'zone', 2, 96.0, 94.0, CURRENT_DATE + INTERVAL '5 days', '1.0.9'),
('market', 'price_change_percentage', 'product', 1, 12.5, 89.0, CURRENT_DATE + INTERVAL '45 days', '1.3.2'),
('energy', 'energy_savings_percentage', 'zone', 3, -18.2, 91.0, CURRENT_DATE, '1.1.5');

-- Insert supply chain events
INSERT INTO supply_chain_events (product_id, event_type, event_date, location, actor, description, environmental_data, quality_metrics) VALUES
(1, 'harvest', '2024-05-15 08:00:00', 'Green Valley Farm, Punjab', 'Farmer: Rajesh Kumar', 'Harvested at optimal moisture content', '{"temperature": 25, "humidity": 40}', '{"moisture": 14.0, "grade": "A+"}'),
(1, 'transport', '2024-05-17 06:00:00', 'En Route to Veggie Vitals', 'Transport: QuickMove Logistics', 'Temperature-controlled transport', '{"temperature": 20, "humidity": 38}', '{"condition": "excellent"}'),
(1, 'intake', '2024-05-17 12:00:00', 'Veggie Vitals Facility', 'QC Team: Sarah Wilson', 'Quality check passed', '{"temperature": 18, "humidity": 42}', '{"moisture": 12.8, "pest_contamination": false}'),
(2, 'harvest', '2024-04-20 07:30:00', 'Sunrise Agriculture, Haryana', 'Farmer: Priya Sharma', 'Premium basmati rice harvest', '{"temperature": 28, "humidity": 35}', '{"moisture": 13.5, "grade": "Premium"}');

-- Update zone utilization based on products
UPDATE storage_zones SET current_utilization_kg = (
  SELECT COALESCE(SUM(current_quantity_kg), 0) 
  FROM products 
  WHERE storage_location LIKE CONCAT(zone_code, '%')
);

-- Insert system settings
INSERT INTO system_settings (setting_key, setting_value, description) VALUES
('environmental_thresholds', '{"temperature": {"min": 15, "max": 25}, "humidity": {"min": 35, "max": 50}}', 'Environmental monitoring thresholds'),
('ml_model_config', '{"update_frequency": "daily", "confidence_threshold": 85, "enabled_models": ["waste", "quality", "treatment", "market", "energy"]}', 'Machine learning model configuration'),
('alert_settings', '{"auto_resolve_hours": 24, "escalation_hours": 4, "notification_channels": ["email", "dashboard"]}', 'Alert system configuration'),
('quality_scoring', '{"excellent": {"min": 90}, "good": {"min": 70}, "fair": {"min": 50}, "poor": {"max": 50}}', 'Quality scoring criteria');
