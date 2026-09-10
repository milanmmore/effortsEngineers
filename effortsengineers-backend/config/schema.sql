-- Run once against your PostgreSQL database (or via `npm run db:init`)

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(160) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role VARCHAR(20) NOT NULL DEFAULT 'client', -- 'client' | 'admin'
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS catalog_items (
  id SERIAL PRIMARY KEY,
  sku VARCHAR(60) UNIQUE NOT NULL,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  category VARCHAR(100),
  price NUMERIC(12,2) NOT NULL DEFAULT 0,
  stock_quantity INTEGER NOT NULL DEFAULT 0,
  image_url TEXT,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS quotations (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  status VARCHAR(20) NOT NULL DEFAULT 'pending', -- pending | approved | rejected | converted
  notes TEXT,
  total_amount NUMERIC(12,2) NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS quotation_items (
  id SERIAL PRIMARY KEY,
  quotation_id INTEGER NOT NULL REFERENCES quotations(id) ON DELETE CASCADE,
  catalog_item_id INTEGER NOT NULL REFERENCES catalog_items(id),
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  unit_price NUMERIC(12,2) NOT NULL
);

CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  quotation_id INTEGER REFERENCES quotations(id),
  user_id INTEGER NOT NULL REFERENCES users(id),
  status VARCHAR(20) NOT NULL DEFAULT 'processing', -- processing | shipped | delivered | cancelled
  total_amount NUMERIC(12,2) NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  catalog_item_id INTEGER NOT NULL REFERENCES catalog_items(id),
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  unit_price NUMERIC(12,2) NOT NULL
);

CREATE TABLE IF NOT EXISTS inventory_logs (
  id SERIAL PRIMARY KEY,
  catalog_item_id INTEGER NOT NULL REFERENCES catalog_items(id),
  change_qty INTEGER NOT NULL, -- positive = restock, negative = deduction
  reason VARCHAR(120),
  created_by INTEGER REFERENCES users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
