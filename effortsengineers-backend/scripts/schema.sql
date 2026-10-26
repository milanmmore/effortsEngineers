CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price NUMERIC(10,2),
  brand VARCHAR(100),
  category VARCHAR(100),
  oem_no VARCHAR(100),
  stock_quantity INTEGER NOT NULL DEFAULT 0,
  stock_status TEXT,
  image_url TEXT,
  series VARCHAR(150),
  part_number VARCHAR(100),
  photo_id TEXT,
  file_name TEXT,
  compatible_models TEXT,
  material_size TEXT,
  photo_status TEXT,
  photo_source TEXT,
  photo_view TEXT,
  alt_text TEXT,
  page_url TEXT,
  remarks TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE products
  ADD COLUMN IF NOT EXISTS brand VARCHAR(100),
  ADD COLUMN IF NOT EXISTS category VARCHAR(100),
  ADD COLUMN IF NOT EXISTS oem_no VARCHAR(100),
  ADD COLUMN IF NOT EXISTS stock_quantity INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS image_url TEXT,
  ADD COLUMN IF NOT EXISTS stock_status TEXT,
  ADD COLUMN IF NOT EXISTS series VARCHAR(150),
  ADD COLUMN IF NOT EXISTS part_number VARCHAR(100),
  ADD COLUMN IF NOT EXISTS photo_id TEXT,
  ADD COLUMN IF NOT EXISTS file_name TEXT,
  ADD COLUMN IF NOT EXISTS compatible_models TEXT,
  ADD COLUMN IF NOT EXISTS material_size TEXT,
  ADD COLUMN IF NOT EXISTS photo_status TEXT,
  ADD COLUMN IF NOT EXISTS photo_source TEXT,
  ADD COLUMN IF NOT EXISTS photo_view TEXT,
  ADD COLUMN IF NOT EXISTS alt_text TEXT,
  ADD COLUMN IF NOT EXISTS page_url TEXT,
  ADD COLUMN IF NOT EXISTS remarks TEXT;

CREATE UNIQUE INDEX IF NOT EXISTS products_photo_id_unique ON products (photo_id);

CREATE TABLE clients (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150),
  phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE quotations (
  id SERIAL PRIMARY KEY,
  client_id INT REFERENCES clients(id),
  product_id INT REFERENCES products(id),
  quantity INT NOT NULL,
  total NUMERIC(10,2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  quotation_id INT REFERENCES quotations(id),
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

create table inventory (
  id SERIAL PRIMARY KEY,
  product_id INT REFERENCES products(id),
  quantity INT NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE dashboard (
  id SERIAL PRIMARY KEY,
  metric_name VARCHAR(100) NOT NULL,
  metric_value NUMERIC(10,2),
  recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE catalog (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price NUMERIC(10,2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role VARCHAR(20) DEFAULT 'client',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

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