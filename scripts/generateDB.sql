-- generateDB.sql for effortsegineers

-- Drop existing tables for a clean slate
DROP TABLE IF EXISTS quotations CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS inventory CASCADE;
DROP TABLE IF EXISTS dashboard CASCADE;
DROP TABLE IF EXISTS catalog CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS clients CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Products table
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price NUMERIC(10,2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Clients table
CREATE TABLE clients (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150),
  phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Quotations table
CREATE TABLE quotations (
  id SERIAL PRIMARY KEY,
  client_id INT REFERENCES clients(id),
  product_id INT REFERENCES products(id),
  quantity INT NOT NULL,
  total NUMERIC(10,2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders table
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  quotation_id INT REFERENCES quotations(id),
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inventory table
CREATE TABLE inventory (
  id SERIAL PRIMARY KEY,
  product_id INT REFERENCES products(id),
  quantity INT NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Dashboard table
CREATE TABLE dashboard (
  id SERIAL PRIMARY KEY,
  metric_name VARCHAR(100) NOT NULL,
  metric_value NUMERIC(10,2),
  recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Catalog table
CREATE TABLE catalog (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price NUMERIC(10,2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role VARCHAR(20) DEFAULT 'client',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed admin user (for Jest setup)
INSERT INTO users (id, name, email, password_hash, role)
VALUES (999, 'Admin User', 'admin@example.com', 'hashedpassword', 'admin')
ON CONFLICT (id) DO NOTHING;

-- Seed sample clients
INSERT INTO clients (name, email, phone)
VALUES
('Acme Corp', 'contact@acme.com', '9876543210'),
('Global Traders', 'info@globaltraders.com', '9123456780')
ON CONFLICT DO NOTHING;

-- Seed sample products
INSERT INTO products (name, description, price)
VALUES
('Steel Rod', 'High quality steel rod', 1200.00),
('Copper Wire', 'Industrial grade copper wire', 800.00),
('Aluminium Sheet', 'Lightweight aluminium sheet', 1500.00)
ON CONFLICT DO NOTHING;

-- Seed sample catalog
INSERT INTO catalog (name, description, price)
VALUES
('Catalog Item A', 'Sample catalog entry A', 500.00),
('Catalog Item B', 'Sample catalog entry B', 750.00)
ON CONFLICT DO NOTHING;

-- Seed dashboard metrics
INSERT INTO dashboard (metric_name, metric_value)
VALUES
('Monthly Sales', 250000.00),
('Pending Orders', 5),
('Inventory Value', 500000.00)
ON CONFLICT DO NOTHING;

-- Inquiries table
CREATE TABLE IF NOT EXISTS inquiries (
  id SERIAL PRIMARY KEY,
  rfq_number VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150),
  phone VARCHAR(50),
  company VARCHAR(150),
  brand VARCHAR(100),
  model VARCHAR(100),
  message TEXT,
  status VARCHAR(50) DEFAULT 'new',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
