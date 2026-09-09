-- Run with psql as a role allowed to create databases.
SELECT 'CREATE DATABASE effortsengineers'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'effortsengineers')\gexec

\connect effortsengineers

-- Catalog table
CREATE TABLE IF NOT EXISTS catalog (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price NUMERIC(10,2) NOT NULL,
    stock INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Clients table
CREATE TABLE IF NOT EXISTS clients (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Quotations table
CREATE TABLE IF NOT EXISTS quotations (
    id SERIAL PRIMARY KEY,
    client_id INT NOT NULL,
    catalog_id INT NOT NULL,
    quantity INT NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (client_id) REFERENCES clients(id),
    FOREIGN KEY (catalog_id) REFERENCES catalog(id)
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    client_id INT NOT NULL,
    quotation_id INT,
    total_amount NUMERIC(12,2),
    status VARCHAR(50) DEFAULT 'processing',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (client_id) REFERENCES clients(id),
    FOREIGN KEY (quotation_id) REFERENCES quotations(id)
);

-- Inventory table (linked to catalog)
CREATE TABLE IF NOT EXISTS inventory (
    id SERIAL PRIMARY KEY,
    catalog_id INT NOT NULL,
    quantity INT NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (catalog_id) REFERENCES catalog(id)
);

-- Dashboard data (for forecasting, KPIs)
CREATE TABLE IF NOT EXISTS dashboard (
    id SERIAL PRIMARY KEY,
    metric_name VARCHAR(255) NOT NULL,
    metric_value NUMERIC(12,2),
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Authentication table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role VARCHAR(50) DEFAULT 'client',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
