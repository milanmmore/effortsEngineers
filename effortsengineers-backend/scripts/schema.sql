-- =============================================================================
-- Efforts Engineers: full database schema (PostgreSQL)
-- Part 1 = your existing schema (unchanged except CREATE TABLE IF NOT EXISTS,
--          so the file can be re-run safely on a live database).
-- Part 2 = catalog structure added from the Parts Photo Master Sheet.
-- =============================================================================

-- -----------------------------------------------------------------------------
-- PART 1: EXISTING SCHEMA
-- -----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS products (
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

CREATE TABLE IF NOT EXISTS clients (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150),
  phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS quotations (
  id SERIAL PRIMARY KEY,
  client_id INT REFERENCES clients(id),
  product_id INT REFERENCES products(id),
  quantity INT NOT NULL,
  total NUMERIC(10,2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  quotation_id INT REFERENCES quotations(id),
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS inventory (
  id SERIAL PRIMARY KEY,
  product_id INT REFERENCES products(id),
  quantity INT NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS dashboard (
  id SERIAL PRIMARY KEY,
  metric_name VARCHAR(100) NOT NULL,
  metric_value NUMERIC(10,2),
  recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS catalog (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price NUMERIC(10,2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS users (
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

-- -----------------------------------------------------------------------------
-- PART 2: CATALOG STRUCTURE (from Efforts_Engineers_Parts_Photo_Master_Sheet.xlsx)
-- `products` stays the table of parts / photo slots. The tables below are the
-- reference data it points to. Existing text columns (brand, series, category,
-- compatible_models) are kept so current code keeps working.
-- -----------------------------------------------------------------------------

-- Brands (sheet: Lists)
CREATE TABLE IF NOT EXISTS brands (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  code VARCHAR(10) UNIQUE,                 -- GRA, SAB, KIR ... (NULL allowed for brands without a code)
  display_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE
);

-- Series (sheet: Series)
CREATE TABLE IF NOT EXISTS series (
  id SERIAL PRIMARY KEY,
  brand_id INT NOT NULL REFERENCES brands(id),
  name VARCHAR(150) NOT NULL UNIQUE,
  series_code VARCHAR(20) NOT NULL,
  slug TEXT NOT NULL,
  type_drive TEXT,
  display_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  UNIQUE (brand_id, slug),
  UNIQUE (brand_id, series_code)
);

-- Models (sheet: Model_List)
CREATE TABLE IF NOT EXISTS models (
  id SERIAL PRIMARY KEY,
  series_id INT NOT NULL REFERENCES series(id),
  name VARCHAR(100) NOT NULL,
  cylinders INT,
  data_confidence TEXT NOT NULL CHECK (data_confidence IN (
    'Confirmed (OEM page)',
    'Confirmed (OEM manual title)',
    'Seen in supplier / used listings',
    'Verify with team')),
  source_note TEXT,
  is_published BOOLEAN NOT NULL DEFAULT FALSE,
  UNIQUE (series_id, name)
);
CREATE INDEX IF NOT EXISTS idx_models_series ON models (series_id);

-- Part categories (sheet: Part_Categories)
CREATE TABLE IF NOT EXISTS part_categories (
  id SERIAL PRIMARY KEY,
  code VARCHAR(10) NOT NULL UNIQUE,        -- CLN, PST ...
  name VARCHAR(100) NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  photo_tip TEXT,                          -- internal, do not expose publicly
  display_order INT NOT NULL DEFAULT 0
);

-- Link products to the reference tables (existing rows get NULL until backfilled)
ALTER TABLE products
  ADD COLUMN IF NOT EXISTS series_id INT REFERENCES series(id),
  ADD COLUMN IF NOT EXISTS category_id INT REFERENCES part_categories(id),
  ADD COLUMN IF NOT EXISTS seq SMALLINT NOT NULL DEFAULT 1,       -- the -01, -02 suffix of photo_id
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

-- is_published: rows that already exist stay visible (column is added as TRUE),
-- but rows added from now on start hidden until someone reviews them.
ALTER TABLE products ADD COLUMN IF NOT EXISTS is_published BOOLEAN NOT NULL DEFAULT TRUE;
ALTER TABLE products ALTER COLUMN is_published SET DEFAULT FALSE;

CREATE INDEX IF NOT EXISTS idx_products_series_cat ON products (series_id, category_id);
CREATE INDEX IF NOT EXISTS idx_products_photo_status ON products (photo_status);

-- Keep updated_at fresh
CREATE OR REPLACE FUNCTION touch_updated_at() RETURNS trigger AS $$
BEGIN NEW.updated_at = CURRENT_TIMESTAMP; RETURN NEW; END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_products_touch ON products;
CREATE TRIGGER trg_products_touch BEFORE UPDATE ON products
FOR EACH ROW EXECUTE FUNCTION touch_updated_at();

-- Search support (typo-tolerant search on model, part number, description)
CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE INDEX IF NOT EXISTS idx_models_name_trgm   ON models   USING gin (name gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_products_name_trgm ON products USING gin (name gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_products_pno_trgm  ON products USING gin (part_number gin_trgm_ops);

-- Views ------------------------------------------------------------------------

-- Replaces the Summary sheet
CREATE OR REPLACE VIEW v_photo_progress AS
SELECT b.name AS brand,
       COUNT(DISTINCT s.id) AS series,
       (SELECT COUNT(*) FROM models m JOIN series s2 ON s2.id = m.series_id
         WHERE s2.brand_id = b.id) AS models_listed,
       COUNT(p.id) AS photo_slots,
       COUNT(*) FILTER (WHERE p.photo_status = 'To Shoot')       AS to_shoot,
       COUNT(*) FILTER (WHERE p.photo_status = 'Shot')           AS shot,
       COUNT(*) FILTER (WHERE p.photo_status = 'Edited')         AS edited,
       COUNT(*) FILTER (WHERE p.photo_status = 'Uploaded')       AS uploaded,
       COUNT(*) FILTER (WHERE p.photo_status = 'Not Applicable') AS not_applicable,
       CASE WHEN COUNT(p.id) - COUNT(*) FILTER (WHERE p.photo_status = 'Not Applicable') = 0 THEN 0
            ELSE ROUND(100.0 * COUNT(*) FILTER (WHERE p.photo_status = 'Uploaded')
                 / (COUNT(p.id) - COUNT(*) FILTER (WHERE p.photo_status = 'Not Applicable')), 1)
       END AS pct_uploaded
FROM brands b
LEFT JOIN series s   ON s.brand_id = b.id
LEFT JOIN products p ON p.series_id = s.id
GROUP BY b.id, b.name, b.display_order
ORDER BY b.display_order;

-- Public read model: published products only, internal workflow fields left out.
-- Rows linked to a series show compatible models from PUBLISHED models only;
-- older rows without a series link keep their own compatible_models text.
CREATE OR REPLACE VIEW v_products_public AS
SELECT p.id, p.photo_id, p.name, p.description, p.price,
       COALESCE(b.name, p.brand)    AS brand,
       b.slug                       AS brand_slug,
       COALESCE(s.name, p.series)   AS series,
       s.slug                       AS series_slug,
       COALESCE(c.name, p.category) AS category,
       c.slug                       AS category_slug,
       p.part_number, p.oem_no, p.material_size,
       p.stock_status, p.stock_quantity,
       p.image_url, p.file_name, p.alt_text, p.page_url,
       CASE WHEN p.series_id IS NULL THEN p.compatible_models
            ELSE (SELECT string_agg(m.name, ', ' ORDER BY m.id)
                    FROM models m WHERE m.series_id = p.series_id AND m.is_published)
       END AS compatible_models
FROM products p
LEFT JOIN series s          ON s.id = p.series_id
LEFT JOIN brands b          ON b.id = s.brand_id
LEFT JOIN part_categories c ON c.id = p.category_id
WHERE p.is_published
  AND (s.id IS NULL OR (s.is_active AND b.is_active));
