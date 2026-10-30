-- Run against the Railway PostgreSQL database before deploying the catalog API.
-- Safe to re-run; this adds only catalog metadata columns and does not import rows.
BEGIN;

ALTER TABLE products
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

COMMIT;
