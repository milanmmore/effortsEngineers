-- Import generated from the Master_Photo_Sheet worksheet.
-- The worksheet serial-number column is intentionally excluded; empty cells become NULL.
-- Product name is derived from Brand, Series, and Part Category to satisfy products.name.
-- price, image_url, and stock_quantity are not provided by the worksheet; existing defaults/nullability apply.
BEGIN;

ALTER TABLE products
  ADD COLUMN IF NOT EXISTS series VARCHAR(150),
  ADD COLUMN IF NOT EXISTS part_number VARCHAR(100),
  ADD COLUMN IF NOT EXISTS photo_id TEXT,
  ADD COLUMN IF NOT EXISTS file_name TEXT,
  ADD COLUMN IF NOT EXISTS compatible_models TEXT,
  ADD COLUMN IF NOT EXISTS material_size TEXT,
  ADD COLUMN IF NOT EXISTS photo_status TEXT,
  ADD COLUMN IF NOT EXISTS photo_source TEXT,
  ADD COLUMN IF NOT EXISTS photo_view TEXT,
  ADD COLUMN IF NOT EXISTS stock_status TEXT,
  ADD COLUMN IF NOT EXISTS alt_text TEXT,
  ADD COLUMN IF NOT EXISTS page_url TEXT,
  ADD COLUMN IF NOT EXISTS remarks TEXT;

CREATE UNIQUE INDEX IF NOT EXISTS products_photo_id_unique ON products (photo_id);

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Grasso - Grasso V Series - Cylinder Liner', NULL, E'Grasso', E'Grasso V Series', E'Cylinder Liner', NULL, E'GRA-V-CLN-01', E'GRA-V-CLN-01.jpg', E'V 300, V 450, V 600, V 700, V 1100, V 1400', NULL, E'To Shoot', NULL, NULL, NULL, E'Grasso V Series Cylinder Liner spare part - Efforts Engineers', E'/grasso/v-series/cylinder-liner', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Grasso - Grasso V Series - Piston Assembly', NULL, E'Grasso', E'Grasso V Series', E'Piston Assembly', NULL, E'GRA-V-PST-01', E'GRA-V-PST-01.jpg', E'V 300, V 450, V 600, V 700, V 1100, V 1400', NULL, E'To Shoot', NULL, NULL, NULL, E'Grasso V Series Piston Assembly spare part - Efforts Engineers', E'/grasso/v-series/piston-assembly', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Grasso - Grasso V Series - Piston Ring Set', NULL, E'Grasso', E'Grasso V Series', E'Piston Ring Set', NULL, E'GRA-V-PRG-01', E'GRA-V-PRG-01.jpg', E'V 300, V 450, V 600, V 700, V 1100, V 1400', NULL, E'To Shoot', NULL, NULL, NULL, E'Grasso V Series Piston Ring Set spare part - Efforts Engineers', E'/grasso/v-series/piston-ring-set', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Grasso - Grasso V Series - Connecting Rod', NULL, E'Grasso', E'Grasso V Series', E'Connecting Rod', NULL, E'GRA-V-CRD-01', E'GRA-V-CRD-01.jpg', E'V 300, V 450, V 600, V 700, V 1100, V 1400', NULL, E'To Shoot', NULL, NULL, NULL, E'Grasso V Series Connecting Rod spare part - Efforts Engineers', E'/grasso/v-series/connecting-rod', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Grasso - Grasso V Series - Crankshaft', NULL, E'Grasso', E'Grasso V Series', E'Crankshaft', NULL, E'GRA-V-CRK-01', E'GRA-V-CRK-01.jpg', E'V 300, V 450, V 600, V 700, V 1100, V 1400', NULL, E'To Shoot', NULL, NULL, NULL, E'Grasso V Series Crankshaft spare part - Efforts Engineers', E'/grasso/v-series/crankshaft', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Grasso - Grasso V Series - Gudgeon Pin and Bush', NULL, E'Grasso', E'Grasso V Series', E'Gudgeon Pin and Bush', NULL, E'GRA-V-PIN-01', E'GRA-V-PIN-01.jpg', E'V 300, V 450, V 600, V 700, V 1100, V 1400', NULL, E'To Shoot', NULL, NULL, NULL, E'Grasso V Series Gudgeon Pin and Bush spare part - Efforts Engineers', E'/grasso/v-series/gudgeon-pin-and-bush', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Grasso - Grasso V Series - Main Bearing and Bush', NULL, E'Grasso', E'Grasso V Series', E'Main Bearing and Bush', NULL, E'GRA-V-BRG-01', E'GRA-V-BRG-01.jpg', E'V 300, V 450, V 600, V 700, V 1100, V 1400', NULL, E'To Shoot', NULL, NULL, NULL, E'Grasso V Series Main Bearing and Bush spare part - Efforts Engineers', E'/grasso/v-series/main-bearing-and-bush', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Grasso - Grasso V Series - Suction Valve Plate', NULL, E'Grasso', E'Grasso V Series', E'Suction Valve Plate', NULL, E'GRA-V-SVP-01', E'GRA-V-SVP-01.jpg', E'V 300, V 450, V 600, V 700, V 1100, V 1400', NULL, E'To Shoot', NULL, NULL, NULL, E'Grasso V Series Suction Valve Plate spare part - Efforts Engineers', E'/grasso/v-series/suction-valve-plate', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Grasso - Grasso V Series - Discharge Valve Assembly', NULL, E'Grasso', E'Grasso V Series', E'Discharge Valve Assembly', NULL, E'GRA-V-DVA-01', E'GRA-V-DVA-01.jpg', E'V 300, V 450, V 600, V 700, V 1100, V 1400', NULL, E'To Shoot', NULL, NULL, NULL, E'Grasso V Series Discharge Valve Assembly spare part - Efforts Engineers', E'/grasso/v-series/discharge-valve-assembly', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Grasso - Grasso V Series - Valve Spring and Cage', NULL, E'Grasso', E'Grasso V Series', E'Valve Spring and Cage', NULL, E'GRA-V-VSP-01', E'GRA-V-VSP-01.jpg', E'V 300, V 450, V 600, V 700, V 1100, V 1400', NULL, E'To Shoot', NULL, NULL, NULL, E'Grasso V Series Valve Spring and Cage spare part - Efforts Engineers', E'/grasso/v-series/valve-spring-and-cage', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Grasso - Grasso V Series - Cylinder Head Cover', NULL, E'Grasso', E'Grasso V Series', E'Cylinder Head Cover', NULL, E'GRA-V-HDC-01', E'GRA-V-HDC-01.jpg', E'V 300, V 450, V 600, V 700, V 1100, V 1400', NULL, E'To Shoot', NULL, NULL, NULL, E'Grasso V Series Cylinder Head Cover spare part - Efforts Engineers', E'/grasso/v-series/cylinder-head-cover', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Grasso - Grasso V Series - Gasket and Overhaul Kit', NULL, E'Grasso', E'Grasso V Series', E'Gasket and Overhaul Kit', NULL, E'GRA-V-GSK-01', E'GRA-V-GSK-01.jpg', E'V 300, V 450, V 600, V 700, V 1100, V 1400', NULL, E'To Shoot', NULL, NULL, NULL, E'Grasso V Series Gasket and Overhaul Kit spare part - Efforts Engineers', E'/grasso/v-series/gasket-and-overhaul-kit', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Grasso - Grasso V Series - Oil Pump Assembly', NULL, E'Grasso', E'Grasso V Series', E'Oil Pump Assembly', NULL, E'GRA-V-OPA-01', E'GRA-V-OPA-01.jpg', E'V 300, V 450, V 600, V 700, V 1100, V 1400', NULL, E'To Shoot', NULL, NULL, NULL, E'Grasso V Series Oil Pump Assembly spare part - Efforts Engineers', E'/grasso/v-series/oil-pump-assembly', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Grasso - Grasso V Series - Shaft Seal', NULL, E'Grasso', E'Grasso V Series', E'Shaft Seal', NULL, E'GRA-V-SHS-01', E'GRA-V-SHS-01.jpg', E'V 300, V 450, V 600, V 700, V 1100, V 1400', NULL, E'To Shoot', NULL, NULL, NULL, E'Grasso V Series Shaft Seal spare part - Efforts Engineers', E'/grasso/v-series/shaft-seal', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Grasso - Grasso V Series - Oil Filter and Strainer', NULL, E'Grasso', E'Grasso V Series', E'Oil Filter and Strainer', NULL, E'GRA-V-FLT-01', E'GRA-V-FLT-01.jpg', E'V 300, V 450, V 600, V 700, V 1100, V 1400', NULL, E'To Shoot', NULL, NULL, NULL, E'Grasso V Series Oil Filter and Strainer spare part - Efforts Engineers', E'/grasso/v-series/oil-filter-and-strainer', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Grasso - Grasso V Series - Unloader and Capacity Control', NULL, E'Grasso', E'Grasso V Series', E'Unloader and Capacity Control', NULL, E'GRA-V-ULD-01', E'GRA-V-ULD-01.jpg', E'V 300, V 450, V 600, V 700, V 1100, V 1400', NULL, E'To Shoot', NULL, NULL, NULL, E'Grasso V Series Unloader and Capacity Control spare part - Efforts Engineers', E'/grasso/v-series/unloader-and-capacity-control', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Grasso - Grasso V Series - Safety Head and Relief Valve', NULL, E'Grasso', E'Grasso V Series', E'Safety Head and Relief Valve', NULL, E'GRA-V-SAF-01', E'GRA-V-SAF-01.jpg', E'V 300, V 450, V 600, V 700, V 1100, V 1400', NULL, E'To Shoot', NULL, NULL, NULL, E'Grasso V Series Safety Head and Relief Valve spare part - Efforts Engineers', E'/grasso/v-series/safety-head-and-relief-valve', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Grasso - Grasso V HP and V XHP Series - Cylinder Liner', NULL, E'Grasso', E'Grasso V HP and V XHP Series', E'Cylinder Liner', NULL, E'GRA-VHP-CLN-01', E'GRA-VHP-CLN-01.jpg', E'V 350 XHP, V 550 XHP, V 750 XHP, V 950 XHP, V HP (sizes to add)', NULL, E'To Shoot', NULL, NULL, NULL, E'Grasso V HP and V XHP Series Cylinder Liner spare part - Efforts Engineers', E'/grasso/v-hp-xhp/cylinder-liner', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Grasso - Grasso V HP and V XHP Series - Piston Assembly', NULL, E'Grasso', E'Grasso V HP and V XHP Series', E'Piston Assembly', NULL, E'GRA-VHP-PST-01', E'GRA-VHP-PST-01.jpg', E'V 350 XHP, V 550 XHP, V 750 XHP, V 950 XHP, V HP (sizes to add)', NULL, E'To Shoot', NULL, NULL, NULL, E'Grasso V HP and V XHP Series Piston Assembly spare part - Efforts Engineers', E'/grasso/v-hp-xhp/piston-assembly', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Grasso - Grasso V HP and V XHP Series - Piston Ring Set', NULL, E'Grasso', E'Grasso V HP and V XHP Series', E'Piston Ring Set', NULL, E'GRA-VHP-PRG-01', E'GRA-VHP-PRG-01.jpg', E'V 350 XHP, V 550 XHP, V 750 XHP, V 950 XHP, V HP (sizes to add)', NULL, E'To Shoot', NULL, NULL, NULL, E'Grasso V HP and V XHP Series Piston Ring Set spare part - Efforts Engineers', E'/grasso/v-hp-xhp/piston-ring-set', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Grasso - Grasso V HP and V XHP Series - Connecting Rod', NULL, E'Grasso', E'Grasso V HP and V XHP Series', E'Connecting Rod', NULL, E'GRA-VHP-CRD-01', E'GRA-VHP-CRD-01.jpg', E'V 350 XHP, V 550 XHP, V 750 XHP, V 950 XHP, V HP (sizes to add)', NULL, E'To Shoot', NULL, NULL, NULL, E'Grasso V HP and V XHP Series Connecting Rod spare part - Efforts Engineers', E'/grasso/v-hp-xhp/connecting-rod', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Grasso - Grasso V HP and V XHP Series - Crankshaft', NULL, E'Grasso', E'Grasso V HP and V XHP Series', E'Crankshaft', NULL, E'GRA-VHP-CRK-01', E'GRA-VHP-CRK-01.jpg', E'V 350 XHP, V 550 XHP, V 750 XHP, V 950 XHP, V HP (sizes to add)', NULL, E'To Shoot', NULL, NULL, NULL, E'Grasso V HP and V XHP Series Crankshaft spare part - Efforts Engineers', E'/grasso/v-hp-xhp/crankshaft', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Grasso - Grasso V HP and V XHP Series - Gudgeon Pin and Bush', NULL, E'Grasso', E'Grasso V HP and V XHP Series', E'Gudgeon Pin and Bush', NULL, E'GRA-VHP-PIN-01', E'GRA-VHP-PIN-01.jpg', E'V 350 XHP, V 550 XHP, V 750 XHP, V 950 XHP, V HP (sizes to add)', NULL, E'To Shoot', NULL, NULL, NULL, E'Grasso V HP and V XHP Series Gudgeon Pin and Bush spare part - Efforts Engineers', E'/grasso/v-hp-xhp/gudgeon-pin-and-bush', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Grasso - Grasso V HP and V XHP Series - Main Bearing and Bush', NULL, E'Grasso', E'Grasso V HP and V XHP Series', E'Main Bearing and Bush', NULL, E'GRA-VHP-BRG-01', E'GRA-VHP-BRG-01.jpg', E'V 350 XHP, V 550 XHP, V 750 XHP, V 950 XHP, V HP (sizes to add)', NULL, E'To Shoot', NULL, NULL, NULL, E'Grasso V HP and V XHP Series Main Bearing and Bush spare part - Efforts Engineers', E'/grasso/v-hp-xhp/main-bearing-and-bush', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Grasso - Grasso V HP and V XHP Series - Suction Valve Plate', NULL, E'Grasso', E'Grasso V HP and V XHP Series', E'Suction Valve Plate', NULL, E'GRA-VHP-SVP-01', E'GRA-VHP-SVP-01.jpg', E'V 350 XHP, V 550 XHP, V 750 XHP, V 950 XHP, V HP (sizes to add)', NULL, E'To Shoot', NULL, NULL, NULL, E'Grasso V HP and V XHP Series Suction Valve Plate spare part - Efforts Engineers', E'/grasso/v-hp-xhp/suction-valve-plate', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Grasso - Grasso V HP and V XHP Series - Discharge Valve Assembly', NULL, E'Grasso', E'Grasso V HP and V XHP Series', E'Discharge Valve Assembly', NULL, E'GRA-VHP-DVA-01', E'GRA-VHP-DVA-01.jpg', E'V 350 XHP, V 550 XHP, V 750 XHP, V 950 XHP, V HP (sizes to add)', NULL, E'To Shoot', NULL, NULL, NULL, E'Grasso V HP and V XHP Series Discharge Valve Assembly spare part - Efforts Engineers', E'/grasso/v-hp-xhp/discharge-valve-assembly', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Grasso - Grasso V HP and V XHP Series - Valve Spring and Cage', NULL, E'Grasso', E'Grasso V HP and V XHP Series', E'Valve Spring and Cage', NULL, E'GRA-VHP-VSP-01', E'GRA-VHP-VSP-01.jpg', E'V 350 XHP, V 550 XHP, V 750 XHP, V 950 XHP, V HP (sizes to add)', NULL, E'To Shoot', NULL, NULL, NULL, E'Grasso V HP and V XHP Series Valve Spring and Cage spare part - Efforts Engineers', E'/grasso/v-hp-xhp/valve-spring-and-cage', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Grasso - Grasso V HP and V XHP Series - Cylinder Head Cover', NULL, E'Grasso', E'Grasso V HP and V XHP Series', E'Cylinder Head Cover', NULL, E'GRA-VHP-HDC-01', E'GRA-VHP-HDC-01.jpg', E'V 350 XHP, V 550 XHP, V 750 XHP, V 950 XHP, V HP (sizes to add)', NULL, E'To Shoot', NULL, NULL, NULL, E'Grasso V HP and V XHP Series Cylinder Head Cover spare part - Efforts Engineers', E'/grasso/v-hp-xhp/cylinder-head-cover', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Grasso - Grasso V HP and V XHP Series - Gasket and Overhaul Kit', NULL, E'Grasso', E'Grasso V HP and V XHP Series', E'Gasket and Overhaul Kit', NULL, E'GRA-VHP-GSK-01', E'GRA-VHP-GSK-01.jpg', E'V 350 XHP, V 550 XHP, V 750 XHP, V 950 XHP, V HP (sizes to add)', NULL, E'To Shoot', NULL, NULL, NULL, E'Grasso V HP and V XHP Series Gasket and Overhaul Kit spare part - Efforts Engineers', E'/grasso/v-hp-xhp/gasket-and-overhaul-kit', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Grasso - Grasso V HP and V XHP Series - Oil Pump Assembly', NULL, E'Grasso', E'Grasso V HP and V XHP Series', E'Oil Pump Assembly', NULL, E'GRA-VHP-OPA-01', E'GRA-VHP-OPA-01.jpg', E'V 350 XHP, V 550 XHP, V 750 XHP, V 950 XHP, V HP (sizes to add)', NULL, E'To Shoot', NULL, NULL, NULL, E'Grasso V HP and V XHP Series Oil Pump Assembly spare part - Efforts Engineers', E'/grasso/v-hp-xhp/oil-pump-assembly', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Grasso - Grasso V HP and V XHP Series - Shaft Seal', NULL, E'Grasso', E'Grasso V HP and V XHP Series', E'Shaft Seal', NULL, E'GRA-VHP-SHS-01', E'GRA-VHP-SHS-01.jpg', E'V 350 XHP, V 550 XHP, V 750 XHP, V 950 XHP, V HP (sizes to add)', NULL, E'To Shoot', NULL, NULL, NULL, E'Grasso V HP and V XHP Series Shaft Seal spare part - Efforts Engineers', E'/grasso/v-hp-xhp/shaft-seal', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Grasso - Grasso V HP and V XHP Series - Oil Filter and Strainer', NULL, E'Grasso', E'Grasso V HP and V XHP Series', E'Oil Filter and Strainer', NULL, E'GRA-VHP-FLT-01', E'GRA-VHP-FLT-01.jpg', E'V 350 XHP, V 550 XHP, V 750 XHP, V 950 XHP, V HP (sizes to add)', NULL, E'To Shoot', NULL, NULL, NULL, E'Grasso V HP and V XHP Series Oil Filter and Strainer spare part - Efforts Engineers', E'/grasso/v-hp-xhp/oil-filter-and-strainer', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Grasso - Grasso V HP and V XHP Series - Unloader and Capacity Control', NULL, E'Grasso', E'Grasso V HP and V XHP Series', E'Unloader and Capacity Control', NULL, E'GRA-VHP-ULD-01', E'GRA-VHP-ULD-01.jpg', E'V 350 XHP, V 550 XHP, V 750 XHP, V 950 XHP, V HP (sizes to add)', NULL, E'To Shoot', NULL, NULL, NULL, E'Grasso V HP and V XHP Series Unloader and Capacity Control spare part - Efforts Engineers', E'/grasso/v-hp-xhp/unloader-and-capacity-control', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Grasso - Grasso V HP and V XHP Series - Safety Head and Relief Valve', NULL, E'Grasso', E'Grasso V HP and V XHP Series', E'Safety Head and Relief Valve', NULL, E'GRA-VHP-SAF-01', E'GRA-VHP-SAF-01.jpg', E'V 350 XHP, V 550 XHP, V 750 XHP, V 950 XHP, V HP (sizes to add)', NULL, E'To Shoot', NULL, NULL, NULL, E'Grasso V HP and V XHP Series Safety Head and Relief Valve spare part - Efforts Engineers', E'/grasso/v-hp-xhp/safety-head-and-relief-valve', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Grasso - Grasso 5HP Series - Cylinder Liner', NULL, E'Grasso', E'Grasso 5HP Series', E'Cylinder Liner', NULL, E'GRA-5HP-CLN-01', E'GRA-5HP-CLN-01.jpg', E'35 HP, 45 HP, 55 HP, 65 HP', NULL, E'To Shoot', NULL, NULL, NULL, E'Grasso 5HP Series Cylinder Liner spare part - Efforts Engineers', E'/grasso/5hp/cylinder-liner', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Grasso - Grasso 5HP Series - Piston Assembly', NULL, E'Grasso', E'Grasso 5HP Series', E'Piston Assembly', NULL, E'GRA-5HP-PST-01', E'GRA-5HP-PST-01.jpg', E'35 HP, 45 HP, 55 HP, 65 HP', NULL, E'To Shoot', NULL, NULL, NULL, E'Grasso 5HP Series Piston Assembly spare part - Efforts Engineers', E'/grasso/5hp/piston-assembly', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Grasso - Grasso 5HP Series - Piston Ring Set', NULL, E'Grasso', E'Grasso 5HP Series', E'Piston Ring Set', NULL, E'GRA-5HP-PRG-01', E'GRA-5HP-PRG-01.jpg', E'35 HP, 45 HP, 55 HP, 65 HP', NULL, E'To Shoot', NULL, NULL, NULL, E'Grasso 5HP Series Piston Ring Set spare part - Efforts Engineers', E'/grasso/5hp/piston-ring-set', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Grasso - Grasso 5HP Series - Connecting Rod', NULL, E'Grasso', E'Grasso 5HP Series', E'Connecting Rod', NULL, E'GRA-5HP-CRD-01', E'GRA-5HP-CRD-01.jpg', E'35 HP, 45 HP, 55 HP, 65 HP', NULL, E'To Shoot', NULL, NULL, NULL, E'Grasso 5HP Series Connecting Rod spare part - Efforts Engineers', E'/grasso/5hp/connecting-rod', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Grasso - Grasso 5HP Series - Crankshaft', NULL, E'Grasso', E'Grasso 5HP Series', E'Crankshaft', NULL, E'GRA-5HP-CRK-01', E'GRA-5HP-CRK-01.jpg', E'35 HP, 45 HP, 55 HP, 65 HP', NULL, E'To Shoot', NULL, NULL, NULL, E'Grasso 5HP Series Crankshaft spare part - Efforts Engineers', E'/grasso/5hp/crankshaft', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Grasso - Grasso 5HP Series - Gudgeon Pin and Bush', NULL, E'Grasso', E'Grasso 5HP Series', E'Gudgeon Pin and Bush', NULL, E'GRA-5HP-PIN-01', E'GRA-5HP-PIN-01.jpg', E'35 HP, 45 HP, 55 HP, 65 HP', NULL, E'To Shoot', NULL, NULL, NULL, E'Grasso 5HP Series Gudgeon Pin and Bush spare part - Efforts Engineers', E'/grasso/5hp/gudgeon-pin-and-bush', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Grasso - Grasso 5HP Series - Main Bearing and Bush', NULL, E'Grasso', E'Grasso 5HP Series', E'Main Bearing and Bush', NULL, E'GRA-5HP-BRG-01', E'GRA-5HP-BRG-01.jpg', E'35 HP, 45 HP, 55 HP, 65 HP', NULL, E'To Shoot', NULL, NULL, NULL, E'Grasso 5HP Series Main Bearing and Bush spare part - Efforts Engineers', E'/grasso/5hp/main-bearing-and-bush', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Grasso - Grasso 5HP Series - Suction Valve Plate', NULL, E'Grasso', E'Grasso 5HP Series', E'Suction Valve Plate', NULL, E'GRA-5HP-SVP-01', E'GRA-5HP-SVP-01.jpg', E'35 HP, 45 HP, 55 HP, 65 HP', NULL, E'To Shoot', NULL, NULL, NULL, E'Grasso 5HP Series Suction Valve Plate spare part - Efforts Engineers', E'/grasso/5hp/suction-valve-plate', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Grasso - Grasso 5HP Series - Discharge Valve Assembly', NULL, E'Grasso', E'Grasso 5HP Series', E'Discharge Valve Assembly', NULL, E'GRA-5HP-DVA-01', E'GRA-5HP-DVA-01.jpg', E'35 HP, 45 HP, 55 HP, 65 HP', NULL, E'To Shoot', NULL, NULL, NULL, E'Grasso 5HP Series Discharge Valve Assembly spare part - Efforts Engineers', E'/grasso/5hp/discharge-valve-assembly', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Grasso - Grasso 5HP Series - Valve Spring and Cage', NULL, E'Grasso', E'Grasso 5HP Series', E'Valve Spring and Cage', NULL, E'GRA-5HP-VSP-01', E'GRA-5HP-VSP-01.jpg', E'35 HP, 45 HP, 55 HP, 65 HP', NULL, E'To Shoot', NULL, NULL, NULL, E'Grasso 5HP Series Valve Spring and Cage spare part - Efforts Engineers', E'/grasso/5hp/valve-spring-and-cage', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Grasso - Grasso 5HP Series - Cylinder Head Cover', NULL, E'Grasso', E'Grasso 5HP Series', E'Cylinder Head Cover', NULL, E'GRA-5HP-HDC-01', E'GRA-5HP-HDC-01.jpg', E'35 HP, 45 HP, 55 HP, 65 HP', NULL, E'To Shoot', NULL, NULL, NULL, E'Grasso 5HP Series Cylinder Head Cover spare part - Efforts Engineers', E'/grasso/5hp/cylinder-head-cover', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Grasso - Grasso 5HP Series - Gasket and Overhaul Kit', NULL, E'Grasso', E'Grasso 5HP Series', E'Gasket and Overhaul Kit', NULL, E'GRA-5HP-GSK-01', E'GRA-5HP-GSK-01.jpg', E'35 HP, 45 HP, 55 HP, 65 HP', NULL, E'To Shoot', NULL, NULL, NULL, E'Grasso 5HP Series Gasket and Overhaul Kit spare part - Efforts Engineers', E'/grasso/5hp/gasket-and-overhaul-kit', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Grasso - Grasso 5HP Series - Oil Pump Assembly', NULL, E'Grasso', E'Grasso 5HP Series', E'Oil Pump Assembly', NULL, E'GRA-5HP-OPA-01', E'GRA-5HP-OPA-01.jpg', E'35 HP, 45 HP, 55 HP, 65 HP', NULL, E'To Shoot', NULL, NULL, NULL, E'Grasso 5HP Series Oil Pump Assembly spare part - Efforts Engineers', E'/grasso/5hp/oil-pump-assembly', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Grasso - Grasso 5HP Series - Shaft Seal', NULL, E'Grasso', E'Grasso 5HP Series', E'Shaft Seal', NULL, E'GRA-5HP-SHS-01', E'GRA-5HP-SHS-01.jpg', E'35 HP, 45 HP, 55 HP, 65 HP', NULL, E'To Shoot', NULL, NULL, NULL, E'Grasso 5HP Series Shaft Seal spare part - Efforts Engineers', E'/grasso/5hp/shaft-seal', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Grasso - Grasso 5HP Series - Oil Filter and Strainer', NULL, E'Grasso', E'Grasso 5HP Series', E'Oil Filter and Strainer', NULL, E'GRA-5HP-FLT-01', E'GRA-5HP-FLT-01.jpg', E'35 HP, 45 HP, 55 HP, 65 HP', NULL, E'To Shoot', NULL, NULL, NULL, E'Grasso 5HP Series Oil Filter and Strainer spare part - Efforts Engineers', E'/grasso/5hp/oil-filter-and-strainer', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Grasso - Grasso 5HP Series - Unloader and Capacity Control', NULL, E'Grasso', E'Grasso 5HP Series', E'Unloader and Capacity Control', NULL, E'GRA-5HP-ULD-01', E'GRA-5HP-ULD-01.jpg', E'35 HP, 45 HP, 55 HP, 65 HP', NULL, E'To Shoot', NULL, NULL, NULL, E'Grasso 5HP Series Unloader and Capacity Control spare part - Efforts Engineers', E'/grasso/5hp/unloader-and-capacity-control', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Grasso - Grasso 5HP Series - Safety Head and Relief Valve', NULL, E'Grasso', E'Grasso 5HP Series', E'Safety Head and Relief Valve', NULL, E'GRA-5HP-SAF-01', E'GRA-5HP-SAF-01.jpg', E'35 HP, 45 HP, 55 HP, 65 HP', NULL, E'To Shoot', NULL, NULL, NULL, E'Grasso 5HP Series Safety Head and Relief Valve spare part - Efforts Engineers', E'/grasso/5hp/safety-head-and-relief-valve', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Grasso - Grasso RC 11 Series - Cylinder Liner', NULL, E'Grasso', E'Grasso RC 11 Series', E'Cylinder Liner', NULL, E'GRA-RC11-CLN-01', E'GRA-RC11-CLN-01.jpg', E'RC 211, RC 311, RC 611, RC 6311', NULL, E'To Shoot', NULL, NULL, NULL, E'Grasso RC 11 Series Cylinder Liner spare part - Efforts Engineers', E'/grasso/rc-11/cylinder-liner', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Grasso - Grasso RC 11 Series - Piston Assembly', NULL, E'Grasso', E'Grasso RC 11 Series', E'Piston Assembly', NULL, E'GRA-RC11-PST-01', E'GRA-RC11-PST-01.jpg', E'RC 211, RC 311, RC 611, RC 6311', NULL, E'To Shoot', NULL, NULL, NULL, E'Grasso RC 11 Series Piston Assembly spare part - Efforts Engineers', E'/grasso/rc-11/piston-assembly', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Grasso - Grasso RC 11 Series - Piston Ring Set', NULL, E'Grasso', E'Grasso RC 11 Series', E'Piston Ring Set', NULL, E'GRA-RC11-PRG-01', E'GRA-RC11-PRG-01.jpg', E'RC 211, RC 311, RC 611, RC 6311', NULL, E'To Shoot', NULL, NULL, NULL, E'Grasso RC 11 Series Piston Ring Set spare part - Efforts Engineers', E'/grasso/rc-11/piston-ring-set', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Grasso - Grasso RC 11 Series - Connecting Rod', NULL, E'Grasso', E'Grasso RC 11 Series', E'Connecting Rod', NULL, E'GRA-RC11-CRD-01', E'GRA-RC11-CRD-01.jpg', E'RC 211, RC 311, RC 611, RC 6311', NULL, E'To Shoot', NULL, NULL, NULL, E'Grasso RC 11 Series Connecting Rod spare part - Efforts Engineers', E'/grasso/rc-11/connecting-rod', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Grasso - Grasso RC 11 Series - Crankshaft', NULL, E'Grasso', E'Grasso RC 11 Series', E'Crankshaft', NULL, E'GRA-RC11-CRK-01', E'GRA-RC11-CRK-01.jpg', E'RC 211, RC 311, RC 611, RC 6311', NULL, E'To Shoot', NULL, NULL, NULL, E'Grasso RC 11 Series Crankshaft spare part - Efforts Engineers', E'/grasso/rc-11/crankshaft', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Grasso - Grasso RC 11 Series - Gudgeon Pin and Bush', NULL, E'Grasso', E'Grasso RC 11 Series', E'Gudgeon Pin and Bush', NULL, E'GRA-RC11-PIN-01', E'GRA-RC11-PIN-01.jpg', E'RC 211, RC 311, RC 611, RC 6311', NULL, E'To Shoot', NULL, NULL, NULL, E'Grasso RC 11 Series Gudgeon Pin and Bush spare part - Efforts Engineers', E'/grasso/rc-11/gudgeon-pin-and-bush', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Grasso - Grasso RC 11 Series - Main Bearing and Bush', NULL, E'Grasso', E'Grasso RC 11 Series', E'Main Bearing and Bush', NULL, E'GRA-RC11-BRG-01', E'GRA-RC11-BRG-01.jpg', E'RC 211, RC 311, RC 611, RC 6311', NULL, E'To Shoot', NULL, NULL, NULL, E'Grasso RC 11 Series Main Bearing and Bush spare part - Efforts Engineers', E'/grasso/rc-11/main-bearing-and-bush', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Grasso - Grasso RC 11 Series - Suction Valve Plate', NULL, E'Grasso', E'Grasso RC 11 Series', E'Suction Valve Plate', NULL, E'GRA-RC11-SVP-01', E'GRA-RC11-SVP-01.jpg', E'RC 211, RC 311, RC 611, RC 6311', NULL, E'To Shoot', NULL, NULL, NULL, E'Grasso RC 11 Series Suction Valve Plate spare part - Efforts Engineers', E'/grasso/rc-11/suction-valve-plate', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Grasso - Grasso RC 11 Series - Discharge Valve Assembly', NULL, E'Grasso', E'Grasso RC 11 Series', E'Discharge Valve Assembly', NULL, E'GRA-RC11-DVA-01', E'GRA-RC11-DVA-01.jpg', E'RC 211, RC 311, RC 611, RC 6311', NULL, E'To Shoot', NULL, NULL, NULL, E'Grasso RC 11 Series Discharge Valve Assembly spare part - Efforts Engineers', E'/grasso/rc-11/discharge-valve-assembly', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Grasso - Grasso RC 11 Series - Valve Spring and Cage', NULL, E'Grasso', E'Grasso RC 11 Series', E'Valve Spring and Cage', NULL, E'GRA-RC11-VSP-01', E'GRA-RC11-VSP-01.jpg', E'RC 211, RC 311, RC 611, RC 6311', NULL, E'To Shoot', NULL, NULL, NULL, E'Grasso RC 11 Series Valve Spring and Cage spare part - Efforts Engineers', E'/grasso/rc-11/valve-spring-and-cage', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Grasso - Grasso RC 11 Series - Cylinder Head Cover', NULL, E'Grasso', E'Grasso RC 11 Series', E'Cylinder Head Cover', NULL, E'GRA-RC11-HDC-01', E'GRA-RC11-HDC-01.jpg', E'RC 211, RC 311, RC 611, RC 6311', NULL, E'To Shoot', NULL, NULL, NULL, E'Grasso RC 11 Series Cylinder Head Cover spare part - Efforts Engineers', E'/grasso/rc-11/cylinder-head-cover', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Grasso - Grasso RC 11 Series - Gasket and Overhaul Kit', NULL, E'Grasso', E'Grasso RC 11 Series', E'Gasket and Overhaul Kit', NULL, E'GRA-RC11-GSK-01', E'GRA-RC11-GSK-01.jpg', E'RC 211, RC 311, RC 611, RC 6311', NULL, E'To Shoot', NULL, NULL, NULL, E'Grasso RC 11 Series Gasket and Overhaul Kit spare part - Efforts Engineers', E'/grasso/rc-11/gasket-and-overhaul-kit', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Grasso - Grasso RC 11 Series - Oil Pump Assembly', NULL, E'Grasso', E'Grasso RC 11 Series', E'Oil Pump Assembly', NULL, E'GRA-RC11-OPA-01', E'GRA-RC11-OPA-01.jpg', E'RC 211, RC 311, RC 611, RC 6311', NULL, E'To Shoot', NULL, NULL, NULL, E'Grasso RC 11 Series Oil Pump Assembly spare part - Efforts Engineers', E'/grasso/rc-11/oil-pump-assembly', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Grasso - Grasso RC 11 Series - Shaft Seal', NULL, E'Grasso', E'Grasso RC 11 Series', E'Shaft Seal', NULL, E'GRA-RC11-SHS-01', E'GRA-RC11-SHS-01.jpg', E'RC 211, RC 311, RC 611, RC 6311', NULL, E'To Shoot', NULL, NULL, NULL, E'Grasso RC 11 Series Shaft Seal spare part - Efforts Engineers', E'/grasso/rc-11/shaft-seal', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Grasso - Grasso RC 11 Series - Oil Filter and Strainer', NULL, E'Grasso', E'Grasso RC 11 Series', E'Oil Filter and Strainer', NULL, E'GRA-RC11-FLT-01', E'GRA-RC11-FLT-01.jpg', E'RC 211, RC 311, RC 611, RC 6311', NULL, E'To Shoot', NULL, NULL, NULL, E'Grasso RC 11 Series Oil Filter and Strainer spare part - Efforts Engineers', E'/grasso/rc-11/oil-filter-and-strainer', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Grasso - Grasso RC 11 Series - Unloader and Capacity Control', NULL, E'Grasso', E'Grasso RC 11 Series', E'Unloader and Capacity Control', NULL, E'GRA-RC11-ULD-01', E'GRA-RC11-ULD-01.jpg', E'RC 211, RC 311, RC 611, RC 6311', NULL, E'To Shoot', NULL, NULL, NULL, E'Grasso RC 11 Series Unloader and Capacity Control spare part - Efforts Engineers', E'/grasso/rc-11/unloader-and-capacity-control', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Grasso - Grasso RC 11 Series - Safety Head and Relief Valve', NULL, E'Grasso', E'Grasso RC 11 Series', E'Safety Head and Relief Valve', NULL, E'GRA-RC11-SAF-01', E'GRA-RC11-SAF-01.jpg', E'RC 211, RC 311, RC 611, RC 6311', NULL, E'To Shoot', NULL, NULL, NULL, E'Grasso RC 11 Series Safety Head and Relief Valve spare part - Efforts Engineers', E'/grasso/rc-11/safety-head-and-relief-valve', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Grasso - Grasso RC 12 Series - Cylinder Liner', NULL, E'Grasso', E'Grasso RC 12 Series', E'Cylinder Liner', NULL, E'GRA-RC12-CLN-01', E'GRA-RC12-CLN-01.jpg', E'RC 212, RC 312, RC 412, RC 512, RC 612, RC 912, RC 1212, RC 2112, RC 3112, RC 4212, RC 5112, RC 6312, RC 7212, RC 8412, RC 9312, RC 10212', NULL, E'To Shoot', NULL, NULL, NULL, E'Grasso RC 12 Series Cylinder Liner spare part - Efforts Engineers', E'/grasso/rc-12/cylinder-liner', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Grasso - Grasso RC 12 Series - Piston Assembly', NULL, E'Grasso', E'Grasso RC 12 Series', E'Piston Assembly', NULL, E'GRA-RC12-PST-01', E'GRA-RC12-PST-01.jpg', E'RC 212, RC 312, RC 412, RC 512, RC 612, RC 912, RC 1212, RC 2112, RC 3112, RC 4212, RC 5112, RC 6312, RC 7212, RC 8412, RC 9312, RC 10212', NULL, E'To Shoot', NULL, NULL, NULL, E'Grasso RC 12 Series Piston Assembly spare part - Efforts Engineers', E'/grasso/rc-12/piston-assembly', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Grasso - Grasso RC 12 Series - Piston Ring Set', NULL, E'Grasso', E'Grasso RC 12 Series', E'Piston Ring Set', NULL, E'GRA-RC12-PRG-01', E'GRA-RC12-PRG-01.jpg', E'RC 212, RC 312, RC 412, RC 512, RC 612, RC 912, RC 1212, RC 2112, RC 3112, RC 4212, RC 5112, RC 6312, RC 7212, RC 8412, RC 9312, RC 10212', NULL, E'To Shoot', NULL, NULL, NULL, E'Grasso RC 12 Series Piston Ring Set spare part - Efforts Engineers', E'/grasso/rc-12/piston-ring-set', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Grasso - Grasso RC 12 Series - Connecting Rod', NULL, E'Grasso', E'Grasso RC 12 Series', E'Connecting Rod', NULL, E'GRA-RC12-CRD-01', E'GRA-RC12-CRD-01.jpg', E'RC 212, RC 312, RC 412, RC 512, RC 612, RC 912, RC 1212, RC 2112, RC 3112, RC 4212, RC 5112, RC 6312, RC 7212, RC 8412, RC 9312, RC 10212', NULL, E'To Shoot', NULL, NULL, NULL, E'Grasso RC 12 Series Connecting Rod spare part - Efforts Engineers', E'/grasso/rc-12/connecting-rod', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Grasso - Grasso RC 12 Series - Crankshaft', NULL, E'Grasso', E'Grasso RC 12 Series', E'Crankshaft', NULL, E'GRA-RC12-CRK-01', E'GRA-RC12-CRK-01.jpg', E'RC 212, RC 312, RC 412, RC 512, RC 612, RC 912, RC 1212, RC 2112, RC 3112, RC 4212, RC 5112, RC 6312, RC 7212, RC 8412, RC 9312, RC 10212', NULL, E'To Shoot', NULL, NULL, NULL, E'Grasso RC 12 Series Crankshaft spare part - Efforts Engineers', E'/grasso/rc-12/crankshaft', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Grasso - Grasso RC 12 Series - Gudgeon Pin and Bush', NULL, E'Grasso', E'Grasso RC 12 Series', E'Gudgeon Pin and Bush', NULL, E'GRA-RC12-PIN-01', E'GRA-RC12-PIN-01.jpg', E'RC 212, RC 312, RC 412, RC 512, RC 612, RC 912, RC 1212, RC 2112, RC 3112, RC 4212, RC 5112, RC 6312, RC 7212, RC 8412, RC 9312, RC 10212', NULL, E'To Shoot', NULL, NULL, NULL, E'Grasso RC 12 Series Gudgeon Pin and Bush spare part - Efforts Engineers', E'/grasso/rc-12/gudgeon-pin-and-bush', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Grasso - Grasso RC 12 Series - Main Bearing and Bush', NULL, E'Grasso', E'Grasso RC 12 Series', E'Main Bearing and Bush', NULL, E'GRA-RC12-BRG-01', E'GRA-RC12-BRG-01.jpg', E'RC 212, RC 312, RC 412, RC 512, RC 612, RC 912, RC 1212, RC 2112, RC 3112, RC 4212, RC 5112, RC 6312, RC 7212, RC 8412, RC 9312, RC 10212', NULL, E'To Shoot', NULL, NULL, NULL, E'Grasso RC 12 Series Main Bearing and Bush spare part - Efforts Engineers', E'/grasso/rc-12/main-bearing-and-bush', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Grasso - Grasso RC 12 Series - Suction Valve Plate', NULL, E'Grasso', E'Grasso RC 12 Series', E'Suction Valve Plate', NULL, E'GRA-RC12-SVP-01', E'GRA-RC12-SVP-01.jpg', E'RC 212, RC 312, RC 412, RC 512, RC 612, RC 912, RC 1212, RC 2112, RC 3112, RC 4212, RC 5112, RC 6312, RC 7212, RC 8412, RC 9312, RC 10212', NULL, E'To Shoot', NULL, NULL, NULL, E'Grasso RC 12 Series Suction Valve Plate spare part - Efforts Engineers', E'/grasso/rc-12/suction-valve-plate', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Grasso - Grasso RC 12 Series - Discharge Valve Assembly', NULL, E'Grasso', E'Grasso RC 12 Series', E'Discharge Valve Assembly', NULL, E'GRA-RC12-DVA-01', E'GRA-RC12-DVA-01.jpg', E'RC 212, RC 312, RC 412, RC 512, RC 612, RC 912, RC 1212, RC 2112, RC 3112, RC 4212, RC 5112, RC 6312, RC 7212, RC 8412, RC 9312, RC 10212', NULL, E'To Shoot', NULL, NULL, NULL, E'Grasso RC 12 Series Discharge Valve Assembly spare part - Efforts Engineers', E'/grasso/rc-12/discharge-valve-assembly', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Grasso - Grasso RC 12 Series - Valve Spring and Cage', NULL, E'Grasso', E'Grasso RC 12 Series', E'Valve Spring and Cage', NULL, E'GRA-RC12-VSP-01', E'GRA-RC12-VSP-01.jpg', E'RC 212, RC 312, RC 412, RC 512, RC 612, RC 912, RC 1212, RC 2112, RC 3112, RC 4212, RC 5112, RC 6312, RC 7212, RC 8412, RC 9312, RC 10212', NULL, E'To Shoot', NULL, NULL, NULL, E'Grasso RC 12 Series Valve Spring and Cage spare part - Efforts Engineers', E'/grasso/rc-12/valve-spring-and-cage', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Grasso - Grasso RC 12 Series - Cylinder Head Cover', NULL, E'Grasso', E'Grasso RC 12 Series', E'Cylinder Head Cover', NULL, E'GRA-RC12-HDC-01', E'GRA-RC12-HDC-01.jpg', E'RC 212, RC 312, RC 412, RC 512, RC 612, RC 912, RC 1212, RC 2112, RC 3112, RC 4212, RC 5112, RC 6312, RC 7212, RC 8412, RC 9312, RC 10212', NULL, E'To Shoot', NULL, NULL, NULL, E'Grasso RC 12 Series Cylinder Head Cover spare part - Efforts Engineers', E'/grasso/rc-12/cylinder-head-cover', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Grasso - Grasso RC 12 Series - Gasket and Overhaul Kit', NULL, E'Grasso', E'Grasso RC 12 Series', E'Gasket and Overhaul Kit', NULL, E'GRA-RC12-GSK-01', E'GRA-RC12-GSK-01.jpg', E'RC 212, RC 312, RC 412, RC 512, RC 612, RC 912, RC 1212, RC 2112, RC 3112, RC 4212, RC 5112, RC 6312, RC 7212, RC 8412, RC 9312, RC 10212', NULL, E'To Shoot', NULL, NULL, NULL, E'Grasso RC 12 Series Gasket and Overhaul Kit spare part - Efforts Engineers', E'/grasso/rc-12/gasket-and-overhaul-kit', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Grasso - Grasso RC 12 Series - Oil Pump Assembly', NULL, E'Grasso', E'Grasso RC 12 Series', E'Oil Pump Assembly', NULL, E'GRA-RC12-OPA-01', E'GRA-RC12-OPA-01.jpg', E'RC 212, RC 312, RC 412, RC 512, RC 612, RC 912, RC 1212, RC 2112, RC 3112, RC 4212, RC 5112, RC 6312, RC 7212, RC 8412, RC 9312, RC 10212', NULL, E'To Shoot', NULL, NULL, NULL, E'Grasso RC 12 Series Oil Pump Assembly spare part - Efforts Engineers', E'/grasso/rc-12/oil-pump-assembly', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Grasso - Grasso RC 12 Series - Shaft Seal', NULL, E'Grasso', E'Grasso RC 12 Series', E'Shaft Seal', NULL, E'GRA-RC12-SHS-01', E'GRA-RC12-SHS-01.jpg', E'RC 212, RC 312, RC 412, RC 512, RC 612, RC 912, RC 1212, RC 2112, RC 3112, RC 4212, RC 5112, RC 6312, RC 7212, RC 8412, RC 9312, RC 10212', NULL, E'To Shoot', NULL, NULL, NULL, E'Grasso RC 12 Series Shaft Seal spare part - Efforts Engineers', E'/grasso/rc-12/shaft-seal', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Grasso - Grasso RC 12 Series - Oil Filter and Strainer', NULL, E'Grasso', E'Grasso RC 12 Series', E'Oil Filter and Strainer', NULL, E'GRA-RC12-FLT-01', E'GRA-RC12-FLT-01.jpg', E'RC 212, RC 312, RC 412, RC 512, RC 612, RC 912, RC 1212, RC 2112, RC 3112, RC 4212, RC 5112, RC 6312, RC 7212, RC 8412, RC 9312, RC 10212', NULL, E'To Shoot', NULL, NULL, NULL, E'Grasso RC 12 Series Oil Filter and Strainer spare part - Efforts Engineers', E'/grasso/rc-12/oil-filter-and-strainer', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Grasso - Grasso RC 12 Series - Unloader and Capacity Control', NULL, E'Grasso', E'Grasso RC 12 Series', E'Unloader and Capacity Control', NULL, E'GRA-RC12-ULD-01', E'GRA-RC12-ULD-01.jpg', E'RC 212, RC 312, RC 412, RC 512, RC 612, RC 912, RC 1212, RC 2112, RC 3112, RC 4212, RC 5112, RC 6312, RC 7212, RC 8412, RC 9312, RC 10212', NULL, E'To Shoot', NULL, NULL, NULL, E'Grasso RC 12 Series Unloader and Capacity Control spare part - Efforts Engineers', E'/grasso/rc-12/unloader-and-capacity-control', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Grasso - Grasso RC 12 Series - Safety Head and Relief Valve', NULL, E'Grasso', E'Grasso RC 12 Series', E'Safety Head and Relief Valve', NULL, E'GRA-RC12-SAF-01', E'GRA-RC12-SAF-01.jpg', E'RC 212, RC 312, RC 412, RC 512, RC 612, RC 912, RC 1212, RC 2112, RC 3112, RC 4212, RC 5112, RC 6312, RC 7212, RC 8412, RC 9312, RC 10212', NULL, E'To Shoot', NULL, NULL, NULL, E'Grasso RC 12 Series Safety Head and Relief Valve spare part - Efforts Engineers', E'/grasso/rc-12/safety-head-and-relief-valve', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Sabroe - Sabroe CMO Series - Cylinder Liner', NULL, E'Sabroe', E'Sabroe CMO Series', E'Cylinder Liner', NULL, E'SAB-CMO-CLN-01', E'SAB-CMO-CLN-01.jpg', E'CMO 14, CMO 16, CMO 18, CMO 24, CMO 26, CMO 28, TCMO 28', NULL, E'To Shoot', NULL, NULL, NULL, E'Sabroe CMO Series Cylinder Liner spare part - Efforts Engineers', E'/sabroe/cmo/cylinder-liner', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Sabroe - Sabroe CMO Series - Piston Assembly', NULL, E'Sabroe', E'Sabroe CMO Series', E'Piston Assembly', NULL, E'SAB-CMO-PST-01', E'SAB-CMO-PST-01.jpg', E'CMO 14, CMO 16, CMO 18, CMO 24, CMO 26, CMO 28, TCMO 28', NULL, E'To Shoot', NULL, NULL, NULL, E'Sabroe CMO Series Piston Assembly spare part - Efforts Engineers', E'/sabroe/cmo/piston-assembly', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Sabroe - Sabroe CMO Series - Piston Ring Set', NULL, E'Sabroe', E'Sabroe CMO Series', E'Piston Ring Set', NULL, E'SAB-CMO-PRG-01', E'SAB-CMO-PRG-01.jpg', E'CMO 14, CMO 16, CMO 18, CMO 24, CMO 26, CMO 28, TCMO 28', NULL, E'To Shoot', NULL, NULL, NULL, E'Sabroe CMO Series Piston Ring Set spare part - Efforts Engineers', E'/sabroe/cmo/piston-ring-set', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Sabroe - Sabroe CMO Series - Connecting Rod', NULL, E'Sabroe', E'Sabroe CMO Series', E'Connecting Rod', NULL, E'SAB-CMO-CRD-01', E'SAB-CMO-CRD-01.jpg', E'CMO 14, CMO 16, CMO 18, CMO 24, CMO 26, CMO 28, TCMO 28', NULL, E'To Shoot', NULL, NULL, NULL, E'Sabroe CMO Series Connecting Rod spare part - Efforts Engineers', E'/sabroe/cmo/connecting-rod', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Sabroe - Sabroe CMO Series - Crankshaft', NULL, E'Sabroe', E'Sabroe CMO Series', E'Crankshaft', NULL, E'SAB-CMO-CRK-01', E'SAB-CMO-CRK-01.jpg', E'CMO 14, CMO 16, CMO 18, CMO 24, CMO 26, CMO 28, TCMO 28', NULL, E'To Shoot', NULL, NULL, NULL, E'Sabroe CMO Series Crankshaft spare part - Efforts Engineers', E'/sabroe/cmo/crankshaft', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Sabroe - Sabroe CMO Series - Gudgeon Pin and Bush', NULL, E'Sabroe', E'Sabroe CMO Series', E'Gudgeon Pin and Bush', NULL, E'SAB-CMO-PIN-01', E'SAB-CMO-PIN-01.jpg', E'CMO 14, CMO 16, CMO 18, CMO 24, CMO 26, CMO 28, TCMO 28', NULL, E'To Shoot', NULL, NULL, NULL, E'Sabroe CMO Series Gudgeon Pin and Bush spare part - Efforts Engineers', E'/sabroe/cmo/gudgeon-pin-and-bush', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Sabroe - Sabroe CMO Series - Main Bearing and Bush', NULL, E'Sabroe', E'Sabroe CMO Series', E'Main Bearing and Bush', NULL, E'SAB-CMO-BRG-01', E'SAB-CMO-BRG-01.jpg', E'CMO 14, CMO 16, CMO 18, CMO 24, CMO 26, CMO 28, TCMO 28', NULL, E'To Shoot', NULL, NULL, NULL, E'Sabroe CMO Series Main Bearing and Bush spare part - Efforts Engineers', E'/sabroe/cmo/main-bearing-and-bush', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Sabroe - Sabroe CMO Series - Suction Valve Plate', NULL, E'Sabroe', E'Sabroe CMO Series', E'Suction Valve Plate', NULL, E'SAB-CMO-SVP-01', E'SAB-CMO-SVP-01.jpg', E'CMO 14, CMO 16, CMO 18, CMO 24, CMO 26, CMO 28, TCMO 28', NULL, E'To Shoot', NULL, NULL, NULL, E'Sabroe CMO Series Suction Valve Plate spare part - Efforts Engineers', E'/sabroe/cmo/suction-valve-plate', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Sabroe - Sabroe CMO Series - Discharge Valve Assembly', NULL, E'Sabroe', E'Sabroe CMO Series', E'Discharge Valve Assembly', NULL, E'SAB-CMO-DVA-01', E'SAB-CMO-DVA-01.jpg', E'CMO 14, CMO 16, CMO 18, CMO 24, CMO 26, CMO 28, TCMO 28', NULL, E'To Shoot', NULL, NULL, NULL, E'Sabroe CMO Series Discharge Valve Assembly spare part - Efforts Engineers', E'/sabroe/cmo/discharge-valve-assembly', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Sabroe - Sabroe CMO Series - Valve Spring and Cage', NULL, E'Sabroe', E'Sabroe CMO Series', E'Valve Spring and Cage', NULL, E'SAB-CMO-VSP-01', E'SAB-CMO-VSP-01.jpg', E'CMO 14, CMO 16, CMO 18, CMO 24, CMO 26, CMO 28, TCMO 28', NULL, E'To Shoot', NULL, NULL, NULL, E'Sabroe CMO Series Valve Spring and Cage spare part - Efforts Engineers', E'/sabroe/cmo/valve-spring-and-cage', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Sabroe - Sabroe CMO Series - Cylinder Head Cover', NULL, E'Sabroe', E'Sabroe CMO Series', E'Cylinder Head Cover', NULL, E'SAB-CMO-HDC-01', E'SAB-CMO-HDC-01.jpg', E'CMO 14, CMO 16, CMO 18, CMO 24, CMO 26, CMO 28, TCMO 28', NULL, E'To Shoot', NULL, NULL, NULL, E'Sabroe CMO Series Cylinder Head Cover spare part - Efforts Engineers', E'/sabroe/cmo/cylinder-head-cover', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Sabroe - Sabroe CMO Series - Gasket and Overhaul Kit', NULL, E'Sabroe', E'Sabroe CMO Series', E'Gasket and Overhaul Kit', NULL, E'SAB-CMO-GSK-01', E'SAB-CMO-GSK-01.jpg', E'CMO 14, CMO 16, CMO 18, CMO 24, CMO 26, CMO 28, TCMO 28', NULL, E'To Shoot', NULL, NULL, NULL, E'Sabroe CMO Series Gasket and Overhaul Kit spare part - Efforts Engineers', E'/sabroe/cmo/gasket-and-overhaul-kit', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Sabroe - Sabroe CMO Series - Oil Pump Assembly', NULL, E'Sabroe', E'Sabroe CMO Series', E'Oil Pump Assembly', NULL, E'SAB-CMO-OPA-01', E'SAB-CMO-OPA-01.jpg', E'CMO 14, CMO 16, CMO 18, CMO 24, CMO 26, CMO 28, TCMO 28', NULL, E'To Shoot', NULL, NULL, NULL, E'Sabroe CMO Series Oil Pump Assembly spare part - Efforts Engineers', E'/sabroe/cmo/oil-pump-assembly', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Sabroe - Sabroe CMO Series - Shaft Seal', NULL, E'Sabroe', E'Sabroe CMO Series', E'Shaft Seal', NULL, E'SAB-CMO-SHS-01', E'SAB-CMO-SHS-01.jpg', E'CMO 14, CMO 16, CMO 18, CMO 24, CMO 26, CMO 28, TCMO 28', NULL, E'To Shoot', NULL, NULL, NULL, E'Sabroe CMO Series Shaft Seal spare part - Efforts Engineers', E'/sabroe/cmo/shaft-seal', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Sabroe - Sabroe CMO Series - Oil Filter and Strainer', NULL, E'Sabroe', E'Sabroe CMO Series', E'Oil Filter and Strainer', NULL, E'SAB-CMO-FLT-01', E'SAB-CMO-FLT-01.jpg', E'CMO 14, CMO 16, CMO 18, CMO 24, CMO 26, CMO 28, TCMO 28', NULL, E'To Shoot', NULL, NULL, NULL, E'Sabroe CMO Series Oil Filter and Strainer spare part - Efforts Engineers', E'/sabroe/cmo/oil-filter-and-strainer', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Sabroe - Sabroe CMO Series - Unloader and Capacity Control', NULL, E'Sabroe', E'Sabroe CMO Series', E'Unloader and Capacity Control', NULL, E'SAB-CMO-ULD-01', E'SAB-CMO-ULD-01.jpg', E'CMO 14, CMO 16, CMO 18, CMO 24, CMO 26, CMO 28, TCMO 28', NULL, E'To Shoot', NULL, NULL, NULL, E'Sabroe CMO Series Unloader and Capacity Control spare part - Efforts Engineers', E'/sabroe/cmo/unloader-and-capacity-control', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Sabroe - Sabroe CMO Series - Safety Head and Relief Valve', NULL, E'Sabroe', E'Sabroe CMO Series', E'Safety Head and Relief Valve', NULL, E'SAB-CMO-SAF-01', E'SAB-CMO-SAF-01.jpg', E'CMO 14, CMO 16, CMO 18, CMO 24, CMO 26, CMO 28, TCMO 28', NULL, E'To Shoot', NULL, NULL, NULL, E'Sabroe CMO Series Safety Head and Relief Valve spare part - Efforts Engineers', E'/sabroe/cmo/safety-head-and-relief-valve', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Sabroe - Sabroe SMC 65 Series - Cylinder Liner', NULL, E'Sabroe', E'Sabroe SMC 65 Series', E'Cylinder Liner', NULL, E'SAB-SMC65-CLN-01', E'SAB-SMC65-CLN-01.jpg', E'SMC 2-65, SMC 3-65, SMC 4-65, SMC 6-65, SMC 8-65, SMC 10-65, TSMC 8-65', NULL, E'To Shoot', NULL, NULL, NULL, E'Sabroe SMC 65 Series Cylinder Liner spare part - Efforts Engineers', E'/sabroe/smc-65/cylinder-liner', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Sabroe - Sabroe SMC 65 Series - Piston Assembly', NULL, E'Sabroe', E'Sabroe SMC 65 Series', E'Piston Assembly', NULL, E'SAB-SMC65-PST-01', E'SAB-SMC65-PST-01.jpg', E'SMC 2-65, SMC 3-65, SMC 4-65, SMC 6-65, SMC 8-65, SMC 10-65, TSMC 8-65', NULL, E'To Shoot', NULL, NULL, NULL, E'Sabroe SMC 65 Series Piston Assembly spare part - Efforts Engineers', E'/sabroe/smc-65/piston-assembly', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Sabroe - Sabroe SMC 65 Series - Piston Ring Set', NULL, E'Sabroe', E'Sabroe SMC 65 Series', E'Piston Ring Set', NULL, E'SAB-SMC65-PRG-01', E'SAB-SMC65-PRG-01.jpg', E'SMC 2-65, SMC 3-65, SMC 4-65, SMC 6-65, SMC 8-65, SMC 10-65, TSMC 8-65', NULL, E'To Shoot', NULL, NULL, NULL, E'Sabroe SMC 65 Series Piston Ring Set spare part - Efforts Engineers', E'/sabroe/smc-65/piston-ring-set', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Sabroe - Sabroe SMC 65 Series - Connecting Rod', NULL, E'Sabroe', E'Sabroe SMC 65 Series', E'Connecting Rod', NULL, E'SAB-SMC65-CRD-01', E'SAB-SMC65-CRD-01.jpg', E'SMC 2-65, SMC 3-65, SMC 4-65, SMC 6-65, SMC 8-65, SMC 10-65, TSMC 8-65', NULL, E'To Shoot', NULL, NULL, NULL, E'Sabroe SMC 65 Series Connecting Rod spare part - Efforts Engineers', E'/sabroe/smc-65/connecting-rod', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Sabroe - Sabroe SMC 65 Series - Crankshaft', NULL, E'Sabroe', E'Sabroe SMC 65 Series', E'Crankshaft', NULL, E'SAB-SMC65-CRK-01', E'SAB-SMC65-CRK-01.jpg', E'SMC 2-65, SMC 3-65, SMC 4-65, SMC 6-65, SMC 8-65, SMC 10-65, TSMC 8-65', NULL, E'To Shoot', NULL, NULL, NULL, E'Sabroe SMC 65 Series Crankshaft spare part - Efforts Engineers', E'/sabroe/smc-65/crankshaft', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Sabroe - Sabroe SMC 65 Series - Gudgeon Pin and Bush', NULL, E'Sabroe', E'Sabroe SMC 65 Series', E'Gudgeon Pin and Bush', NULL, E'SAB-SMC65-PIN-01', E'SAB-SMC65-PIN-01.jpg', E'SMC 2-65, SMC 3-65, SMC 4-65, SMC 6-65, SMC 8-65, SMC 10-65, TSMC 8-65', NULL, E'To Shoot', NULL, NULL, NULL, E'Sabroe SMC 65 Series Gudgeon Pin and Bush spare part - Efforts Engineers', E'/sabroe/smc-65/gudgeon-pin-and-bush', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Sabroe - Sabroe SMC 65 Series - Main Bearing and Bush', NULL, E'Sabroe', E'Sabroe SMC 65 Series', E'Main Bearing and Bush', NULL, E'SAB-SMC65-BRG-01', E'SAB-SMC65-BRG-01.jpg', E'SMC 2-65, SMC 3-65, SMC 4-65, SMC 6-65, SMC 8-65, SMC 10-65, TSMC 8-65', NULL, E'To Shoot', NULL, NULL, NULL, E'Sabroe SMC 65 Series Main Bearing and Bush spare part - Efforts Engineers', E'/sabroe/smc-65/main-bearing-and-bush', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Sabroe - Sabroe SMC 65 Series - Suction Valve Plate', NULL, E'Sabroe', E'Sabroe SMC 65 Series', E'Suction Valve Plate', NULL, E'SAB-SMC65-SVP-01', E'SAB-SMC65-SVP-01.jpg', E'SMC 2-65, SMC 3-65, SMC 4-65, SMC 6-65, SMC 8-65, SMC 10-65, TSMC 8-65', NULL, E'To Shoot', NULL, NULL, NULL, E'Sabroe SMC 65 Series Suction Valve Plate spare part - Efforts Engineers', E'/sabroe/smc-65/suction-valve-plate', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Sabroe - Sabroe SMC 65 Series - Discharge Valve Assembly', NULL, E'Sabroe', E'Sabroe SMC 65 Series', E'Discharge Valve Assembly', NULL, E'SAB-SMC65-DVA-01', E'SAB-SMC65-DVA-01.jpg', E'SMC 2-65, SMC 3-65, SMC 4-65, SMC 6-65, SMC 8-65, SMC 10-65, TSMC 8-65', NULL, E'To Shoot', NULL, NULL, NULL, E'Sabroe SMC 65 Series Discharge Valve Assembly spare part - Efforts Engineers', E'/sabroe/smc-65/discharge-valve-assembly', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Sabroe - Sabroe SMC 65 Series - Valve Spring and Cage', NULL, E'Sabroe', E'Sabroe SMC 65 Series', E'Valve Spring and Cage', NULL, E'SAB-SMC65-VSP-01', E'SAB-SMC65-VSP-01.jpg', E'SMC 2-65, SMC 3-65, SMC 4-65, SMC 6-65, SMC 8-65, SMC 10-65, TSMC 8-65', NULL, E'To Shoot', NULL, NULL, NULL, E'Sabroe SMC 65 Series Valve Spring and Cage spare part - Efforts Engineers', E'/sabroe/smc-65/valve-spring-and-cage', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Sabroe - Sabroe SMC 65 Series - Cylinder Head Cover', NULL, E'Sabroe', E'Sabroe SMC 65 Series', E'Cylinder Head Cover', NULL, E'SAB-SMC65-HDC-01', E'SAB-SMC65-HDC-01.jpg', E'SMC 2-65, SMC 3-65, SMC 4-65, SMC 6-65, SMC 8-65, SMC 10-65, TSMC 8-65', NULL, E'To Shoot', NULL, NULL, NULL, E'Sabroe SMC 65 Series Cylinder Head Cover spare part - Efforts Engineers', E'/sabroe/smc-65/cylinder-head-cover', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Sabroe - Sabroe SMC 65 Series - Gasket and Overhaul Kit', NULL, E'Sabroe', E'Sabroe SMC 65 Series', E'Gasket and Overhaul Kit', NULL, E'SAB-SMC65-GSK-01', E'SAB-SMC65-GSK-01.jpg', E'SMC 2-65, SMC 3-65, SMC 4-65, SMC 6-65, SMC 8-65, SMC 10-65, TSMC 8-65', NULL, E'To Shoot', NULL, NULL, NULL, E'Sabroe SMC 65 Series Gasket and Overhaul Kit spare part - Efforts Engineers', E'/sabroe/smc-65/gasket-and-overhaul-kit', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Sabroe - Sabroe SMC 65 Series - Oil Pump Assembly', NULL, E'Sabroe', E'Sabroe SMC 65 Series', E'Oil Pump Assembly', NULL, E'SAB-SMC65-OPA-01', E'SAB-SMC65-OPA-01.jpg', E'SMC 2-65, SMC 3-65, SMC 4-65, SMC 6-65, SMC 8-65, SMC 10-65, TSMC 8-65', NULL, E'To Shoot', NULL, NULL, NULL, E'Sabroe SMC 65 Series Oil Pump Assembly spare part - Efforts Engineers', E'/sabroe/smc-65/oil-pump-assembly', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Sabroe - Sabroe SMC 65 Series - Shaft Seal', NULL, E'Sabroe', E'Sabroe SMC 65 Series', E'Shaft Seal', NULL, E'SAB-SMC65-SHS-01', E'SAB-SMC65-SHS-01.jpg', E'SMC 2-65, SMC 3-65, SMC 4-65, SMC 6-65, SMC 8-65, SMC 10-65, TSMC 8-65', NULL, E'To Shoot', NULL, NULL, NULL, E'Sabroe SMC 65 Series Shaft Seal spare part - Efforts Engineers', E'/sabroe/smc-65/shaft-seal', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Sabroe - Sabroe SMC 65 Series - Oil Filter and Strainer', NULL, E'Sabroe', E'Sabroe SMC 65 Series', E'Oil Filter and Strainer', NULL, E'SAB-SMC65-FLT-01', E'SAB-SMC65-FLT-01.jpg', E'SMC 2-65, SMC 3-65, SMC 4-65, SMC 6-65, SMC 8-65, SMC 10-65, TSMC 8-65', NULL, E'To Shoot', NULL, NULL, NULL, E'Sabroe SMC 65 Series Oil Filter and Strainer spare part - Efforts Engineers', E'/sabroe/smc-65/oil-filter-and-strainer', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Sabroe - Sabroe SMC 65 Series - Unloader and Capacity Control', NULL, E'Sabroe', E'Sabroe SMC 65 Series', E'Unloader and Capacity Control', NULL, E'SAB-SMC65-ULD-01', E'SAB-SMC65-ULD-01.jpg', E'SMC 2-65, SMC 3-65, SMC 4-65, SMC 6-65, SMC 8-65, SMC 10-65, TSMC 8-65', NULL, E'To Shoot', NULL, NULL, NULL, E'Sabroe SMC 65 Series Unloader and Capacity Control spare part - Efforts Engineers', E'/sabroe/smc-65/unloader-and-capacity-control', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Sabroe - Sabroe SMC 65 Series - Safety Head and Relief Valve', NULL, E'Sabroe', E'Sabroe SMC 65 Series', E'Safety Head and Relief Valve', NULL, E'SAB-SMC65-SAF-01', E'SAB-SMC65-SAF-01.jpg', E'SMC 2-65, SMC 3-65, SMC 4-65, SMC 6-65, SMC 8-65, SMC 10-65, TSMC 8-65', NULL, E'To Shoot', NULL, NULL, NULL, E'Sabroe SMC 65 Series Safety Head and Relief Valve spare part - Efforts Engineers', E'/sabroe/smc-65/safety-head-and-relief-valve', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Sabroe - Sabroe SMC 100 Series - Cylinder Liner', NULL, E'Sabroe', E'Sabroe SMC 100 Series', E'Cylinder Liner', NULL, E'SAB-SMC100-CLN-01', E'SAB-SMC100-CLN-01.jpg', E'SMC 104S, SMC 104L, SMC 104E, SMC 106S, SMC 106L, SMC 106E, SMC 108S, SMC 108L, SMC 108E, SMC 112S, SMC 112L, SMC 112E, SMC 116S, SMC 116L, SMC 116E, SMC 4-100, SMC 6-100, SMC 8-100, TSMC 108S, TSMC 108L, TSMC 116S, TSMC 116L', NULL, E'To Shoot', NULL, NULL, NULL, E'Sabroe SMC 100 Series Cylinder Liner spare part - Efforts Engineers', E'/sabroe/smc-100/cylinder-liner', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Sabroe - Sabroe SMC 100 Series - Piston Assembly', NULL, E'Sabroe', E'Sabroe SMC 100 Series', E'Piston Assembly', NULL, E'SAB-SMC100-PST-01', E'SAB-SMC100-PST-01.jpg', E'SMC 104S, SMC 104L, SMC 104E, SMC 106S, SMC 106L, SMC 106E, SMC 108S, SMC 108L, SMC 108E, SMC 112S, SMC 112L, SMC 112E, SMC 116S, SMC 116L, SMC 116E, SMC 4-100, SMC 6-100, SMC 8-100, TSMC 108S, TSMC 108L, TSMC 116S, TSMC 116L', NULL, E'To Shoot', NULL, NULL, NULL, E'Sabroe SMC 100 Series Piston Assembly spare part - Efforts Engineers', E'/sabroe/smc-100/piston-assembly', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Sabroe - Sabroe SMC 100 Series - Piston Ring Set', NULL, E'Sabroe', E'Sabroe SMC 100 Series', E'Piston Ring Set', NULL, E'SAB-SMC100-PRG-01', E'SAB-SMC100-PRG-01.jpg', E'SMC 104S, SMC 104L, SMC 104E, SMC 106S, SMC 106L, SMC 106E, SMC 108S, SMC 108L, SMC 108E, SMC 112S, SMC 112L, SMC 112E, SMC 116S, SMC 116L, SMC 116E, SMC 4-100, SMC 6-100, SMC 8-100, TSMC 108S, TSMC 108L, TSMC 116S, TSMC 116L', NULL, E'To Shoot', NULL, NULL, NULL, E'Sabroe SMC 100 Series Piston Ring Set spare part - Efforts Engineers', E'/sabroe/smc-100/piston-ring-set', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Sabroe - Sabroe SMC 100 Series - Connecting Rod', NULL, E'Sabroe', E'Sabroe SMC 100 Series', E'Connecting Rod', NULL, E'SAB-SMC100-CRD-01', E'SAB-SMC100-CRD-01.jpg', E'SMC 104S, SMC 104L, SMC 104E, SMC 106S, SMC 106L, SMC 106E, SMC 108S, SMC 108L, SMC 108E, SMC 112S, SMC 112L, SMC 112E, SMC 116S, SMC 116L, SMC 116E, SMC 4-100, SMC 6-100, SMC 8-100, TSMC 108S, TSMC 108L, TSMC 116S, TSMC 116L', NULL, E'To Shoot', NULL, NULL, NULL, E'Sabroe SMC 100 Series Connecting Rod spare part - Efforts Engineers', E'/sabroe/smc-100/connecting-rod', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Sabroe - Sabroe SMC 100 Series - Crankshaft', NULL, E'Sabroe', E'Sabroe SMC 100 Series', E'Crankshaft', NULL, E'SAB-SMC100-CRK-01', E'SAB-SMC100-CRK-01.jpg', E'SMC 104S, SMC 104L, SMC 104E, SMC 106S, SMC 106L, SMC 106E, SMC 108S, SMC 108L, SMC 108E, SMC 112S, SMC 112L, SMC 112E, SMC 116S, SMC 116L, SMC 116E, SMC 4-100, SMC 6-100, SMC 8-100, TSMC 108S, TSMC 108L, TSMC 116S, TSMC 116L', NULL, E'To Shoot', NULL, NULL, NULL, E'Sabroe SMC 100 Series Crankshaft spare part - Efforts Engineers', E'/sabroe/smc-100/crankshaft', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Sabroe - Sabroe SMC 100 Series - Gudgeon Pin and Bush', NULL, E'Sabroe', E'Sabroe SMC 100 Series', E'Gudgeon Pin and Bush', NULL, E'SAB-SMC100-PIN-01', E'SAB-SMC100-PIN-01.jpg', E'SMC 104S, SMC 104L, SMC 104E, SMC 106S, SMC 106L, SMC 106E, SMC 108S, SMC 108L, SMC 108E, SMC 112S, SMC 112L, SMC 112E, SMC 116S, SMC 116L, SMC 116E, SMC 4-100, SMC 6-100, SMC 8-100, TSMC 108S, TSMC 108L, TSMC 116S, TSMC 116L', NULL, E'To Shoot', NULL, NULL, NULL, E'Sabroe SMC 100 Series Gudgeon Pin and Bush spare part - Efforts Engineers', E'/sabroe/smc-100/gudgeon-pin-and-bush', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Sabroe - Sabroe SMC 100 Series - Main Bearing and Bush', NULL, E'Sabroe', E'Sabroe SMC 100 Series', E'Main Bearing and Bush', NULL, E'SAB-SMC100-BRG-01', E'SAB-SMC100-BRG-01.jpg', E'SMC 104S, SMC 104L, SMC 104E, SMC 106S, SMC 106L, SMC 106E, SMC 108S, SMC 108L, SMC 108E, SMC 112S, SMC 112L, SMC 112E, SMC 116S, SMC 116L, SMC 116E, SMC 4-100, SMC 6-100, SMC 8-100, TSMC 108S, TSMC 108L, TSMC 116S, TSMC 116L', NULL, E'To Shoot', NULL, NULL, NULL, E'Sabroe SMC 100 Series Main Bearing and Bush spare part - Efforts Engineers', E'/sabroe/smc-100/main-bearing-and-bush', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Sabroe - Sabroe SMC 100 Series - Suction Valve Plate', NULL, E'Sabroe', E'Sabroe SMC 100 Series', E'Suction Valve Plate', NULL, E'SAB-SMC100-SVP-01', E'SAB-SMC100-SVP-01.jpg', E'SMC 104S, SMC 104L, SMC 104E, SMC 106S, SMC 106L, SMC 106E, SMC 108S, SMC 108L, SMC 108E, SMC 112S, SMC 112L, SMC 112E, SMC 116S, SMC 116L, SMC 116E, SMC 4-100, SMC 6-100, SMC 8-100, TSMC 108S, TSMC 108L, TSMC 116S, TSMC 116L', NULL, E'To Shoot', NULL, NULL, NULL, E'Sabroe SMC 100 Series Suction Valve Plate spare part - Efforts Engineers', E'/sabroe/smc-100/suction-valve-plate', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Sabroe - Sabroe SMC 100 Series - Discharge Valve Assembly', NULL, E'Sabroe', E'Sabroe SMC 100 Series', E'Discharge Valve Assembly', NULL, E'SAB-SMC100-DVA-01', E'SAB-SMC100-DVA-01.jpg', E'SMC 104S, SMC 104L, SMC 104E, SMC 106S, SMC 106L, SMC 106E, SMC 108S, SMC 108L, SMC 108E, SMC 112S, SMC 112L, SMC 112E, SMC 116S, SMC 116L, SMC 116E, SMC 4-100, SMC 6-100, SMC 8-100, TSMC 108S, TSMC 108L, TSMC 116S, TSMC 116L', NULL, E'To Shoot', NULL, NULL, NULL, E'Sabroe SMC 100 Series Discharge Valve Assembly spare part - Efforts Engineers', E'/sabroe/smc-100/discharge-valve-assembly', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Sabroe - Sabroe SMC 100 Series - Valve Spring and Cage', NULL, E'Sabroe', E'Sabroe SMC 100 Series', E'Valve Spring and Cage', NULL, E'SAB-SMC100-VSP-01', E'SAB-SMC100-VSP-01.jpg', E'SMC 104S, SMC 104L, SMC 104E, SMC 106S, SMC 106L, SMC 106E, SMC 108S, SMC 108L, SMC 108E, SMC 112S, SMC 112L, SMC 112E, SMC 116S, SMC 116L, SMC 116E, SMC 4-100, SMC 6-100, SMC 8-100, TSMC 108S, TSMC 108L, TSMC 116S, TSMC 116L', NULL, E'To Shoot', NULL, NULL, NULL, E'Sabroe SMC 100 Series Valve Spring and Cage spare part - Efforts Engineers', E'/sabroe/smc-100/valve-spring-and-cage', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Sabroe - Sabroe SMC 100 Series - Cylinder Head Cover', NULL, E'Sabroe', E'Sabroe SMC 100 Series', E'Cylinder Head Cover', NULL, E'SAB-SMC100-HDC-01', E'SAB-SMC100-HDC-01.jpg', E'SMC 104S, SMC 104L, SMC 104E, SMC 106S, SMC 106L, SMC 106E, SMC 108S, SMC 108L, SMC 108E, SMC 112S, SMC 112L, SMC 112E, SMC 116S, SMC 116L, SMC 116E, SMC 4-100, SMC 6-100, SMC 8-100, TSMC 108S, TSMC 108L, TSMC 116S, TSMC 116L', NULL, E'To Shoot', NULL, NULL, NULL, E'Sabroe SMC 100 Series Cylinder Head Cover spare part - Efforts Engineers', E'/sabroe/smc-100/cylinder-head-cover', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Sabroe - Sabroe SMC 100 Series - Gasket and Overhaul Kit', NULL, E'Sabroe', E'Sabroe SMC 100 Series', E'Gasket and Overhaul Kit', NULL, E'SAB-SMC100-GSK-01', E'SAB-SMC100-GSK-01.jpg', E'SMC 104S, SMC 104L, SMC 104E, SMC 106S, SMC 106L, SMC 106E, SMC 108S, SMC 108L, SMC 108E, SMC 112S, SMC 112L, SMC 112E, SMC 116S, SMC 116L, SMC 116E, SMC 4-100, SMC 6-100, SMC 8-100, TSMC 108S, TSMC 108L, TSMC 116S, TSMC 116L', NULL, E'To Shoot', NULL, NULL, NULL, E'Sabroe SMC 100 Series Gasket and Overhaul Kit spare part - Efforts Engineers', E'/sabroe/smc-100/gasket-and-overhaul-kit', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Sabroe - Sabroe SMC 100 Series - Oil Pump Assembly', NULL, E'Sabroe', E'Sabroe SMC 100 Series', E'Oil Pump Assembly', NULL, E'SAB-SMC100-OPA-01', E'SAB-SMC100-OPA-01.jpg', E'SMC 104S, SMC 104L, SMC 104E, SMC 106S, SMC 106L, SMC 106E, SMC 108S, SMC 108L, SMC 108E, SMC 112S, SMC 112L, SMC 112E, SMC 116S, SMC 116L, SMC 116E, SMC 4-100, SMC 6-100, SMC 8-100, TSMC 108S, TSMC 108L, TSMC 116S, TSMC 116L', NULL, E'To Shoot', NULL, NULL, NULL, E'Sabroe SMC 100 Series Oil Pump Assembly spare part - Efforts Engineers', E'/sabroe/smc-100/oil-pump-assembly', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Sabroe - Sabroe SMC 100 Series - Shaft Seal', NULL, E'Sabroe', E'Sabroe SMC 100 Series', E'Shaft Seal', NULL, E'SAB-SMC100-SHS-01', E'SAB-SMC100-SHS-01.jpg', E'SMC 104S, SMC 104L, SMC 104E, SMC 106S, SMC 106L, SMC 106E, SMC 108S, SMC 108L, SMC 108E, SMC 112S, SMC 112L, SMC 112E, SMC 116S, SMC 116L, SMC 116E, SMC 4-100, SMC 6-100, SMC 8-100, TSMC 108S, TSMC 108L, TSMC 116S, TSMC 116L', NULL, E'To Shoot', NULL, NULL, NULL, E'Sabroe SMC 100 Series Shaft Seal spare part - Efforts Engineers', E'/sabroe/smc-100/shaft-seal', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Sabroe - Sabroe SMC 100 Series - Oil Filter and Strainer', NULL, E'Sabroe', E'Sabroe SMC 100 Series', E'Oil Filter and Strainer', NULL, E'SAB-SMC100-FLT-01', E'SAB-SMC100-FLT-01.jpg', E'SMC 104S, SMC 104L, SMC 104E, SMC 106S, SMC 106L, SMC 106E, SMC 108S, SMC 108L, SMC 108E, SMC 112S, SMC 112L, SMC 112E, SMC 116S, SMC 116L, SMC 116E, SMC 4-100, SMC 6-100, SMC 8-100, TSMC 108S, TSMC 108L, TSMC 116S, TSMC 116L', NULL, E'To Shoot', NULL, NULL, NULL, E'Sabroe SMC 100 Series Oil Filter and Strainer spare part - Efforts Engineers', E'/sabroe/smc-100/oil-filter-and-strainer', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Sabroe - Sabroe SMC 100 Series - Unloader and Capacity Control', NULL, E'Sabroe', E'Sabroe SMC 100 Series', E'Unloader and Capacity Control', NULL, E'SAB-SMC100-ULD-01', E'SAB-SMC100-ULD-01.jpg', E'SMC 104S, SMC 104L, SMC 104E, SMC 106S, SMC 106L, SMC 106E, SMC 108S, SMC 108L, SMC 108E, SMC 112S, SMC 112L, SMC 112E, SMC 116S, SMC 116L, SMC 116E, SMC 4-100, SMC 6-100, SMC 8-100, TSMC 108S, TSMC 108L, TSMC 116S, TSMC 116L', NULL, E'To Shoot', NULL, NULL, NULL, E'Sabroe SMC 100 Series Unloader and Capacity Control spare part - Efforts Engineers', E'/sabroe/smc-100/unloader-and-capacity-control', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Sabroe - Sabroe SMC 100 Series - Safety Head and Relief Valve', NULL, E'Sabroe', E'Sabroe SMC 100 Series', E'Safety Head and Relief Valve', NULL, E'SAB-SMC100-SAF-01', E'SAB-SMC100-SAF-01.jpg', E'SMC 104S, SMC 104L, SMC 104E, SMC 106S, SMC 106L, SMC 106E, SMC 108S, SMC 108L, SMC 108E, SMC 112S, SMC 112L, SMC 112E, SMC 116S, SMC 116L, SMC 116E, SMC 4-100, SMC 6-100, SMC 8-100, TSMC 108S, TSMC 108L, TSMC 116S, TSMC 116L', NULL, E'To Shoot', NULL, NULL, NULL, E'Sabroe SMC 100 Series Safety Head and Relief Valve spare part - Efforts Engineers', E'/sabroe/smc-100/safety-head-and-relief-valve', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Sabroe - Sabroe SMC 180 Series - Cylinder Liner', NULL, E'Sabroe', E'Sabroe SMC 180 Series', E'Cylinder Liner', NULL, E'SAB-SMC180-CLN-01', E'SAB-SMC180-CLN-01.jpg', E'SMC 180', NULL, E'To Shoot', NULL, NULL, NULL, E'Sabroe SMC 180 Series Cylinder Liner spare part - Efforts Engineers', E'/sabroe/smc-180/cylinder-liner', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Sabroe - Sabroe SMC 180 Series - Piston Assembly', NULL, E'Sabroe', E'Sabroe SMC 180 Series', E'Piston Assembly', NULL, E'SAB-SMC180-PST-01', E'SAB-SMC180-PST-01.jpg', E'SMC 180', NULL, E'To Shoot', NULL, NULL, NULL, E'Sabroe SMC 180 Series Piston Assembly spare part - Efforts Engineers', E'/sabroe/smc-180/piston-assembly', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Sabroe - Sabroe SMC 180 Series - Piston Ring Set', NULL, E'Sabroe', E'Sabroe SMC 180 Series', E'Piston Ring Set', NULL, E'SAB-SMC180-PRG-01', E'SAB-SMC180-PRG-01.jpg', E'SMC 180', NULL, E'To Shoot', NULL, NULL, NULL, E'Sabroe SMC 180 Series Piston Ring Set spare part - Efforts Engineers', E'/sabroe/smc-180/piston-ring-set', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Sabroe - Sabroe SMC 180 Series - Connecting Rod', NULL, E'Sabroe', E'Sabroe SMC 180 Series', E'Connecting Rod', NULL, E'SAB-SMC180-CRD-01', E'SAB-SMC180-CRD-01.jpg', E'SMC 180', NULL, E'To Shoot', NULL, NULL, NULL, E'Sabroe SMC 180 Series Connecting Rod spare part - Efforts Engineers', E'/sabroe/smc-180/connecting-rod', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Sabroe - Sabroe SMC 180 Series - Crankshaft', NULL, E'Sabroe', E'Sabroe SMC 180 Series', E'Crankshaft', NULL, E'SAB-SMC180-CRK-01', E'SAB-SMC180-CRK-01.jpg', E'SMC 180', NULL, E'To Shoot', NULL, NULL, NULL, E'Sabroe SMC 180 Series Crankshaft spare part - Efforts Engineers', E'/sabroe/smc-180/crankshaft', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Sabroe - Sabroe SMC 180 Series - Gudgeon Pin and Bush', NULL, E'Sabroe', E'Sabroe SMC 180 Series', E'Gudgeon Pin and Bush', NULL, E'SAB-SMC180-PIN-01', E'SAB-SMC180-PIN-01.jpg', E'SMC 180', NULL, E'To Shoot', NULL, NULL, NULL, E'Sabroe SMC 180 Series Gudgeon Pin and Bush spare part - Efforts Engineers', E'/sabroe/smc-180/gudgeon-pin-and-bush', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Sabroe - Sabroe SMC 180 Series - Main Bearing and Bush', NULL, E'Sabroe', E'Sabroe SMC 180 Series', E'Main Bearing and Bush', NULL, E'SAB-SMC180-BRG-01', E'SAB-SMC180-BRG-01.jpg', E'SMC 180', NULL, E'To Shoot', NULL, NULL, NULL, E'Sabroe SMC 180 Series Main Bearing and Bush spare part - Efforts Engineers', E'/sabroe/smc-180/main-bearing-and-bush', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Sabroe - Sabroe SMC 180 Series - Suction Valve Plate', NULL, E'Sabroe', E'Sabroe SMC 180 Series', E'Suction Valve Plate', NULL, E'SAB-SMC180-SVP-01', E'SAB-SMC180-SVP-01.jpg', E'SMC 180', NULL, E'To Shoot', NULL, NULL, NULL, E'Sabroe SMC 180 Series Suction Valve Plate spare part - Efforts Engineers', E'/sabroe/smc-180/suction-valve-plate', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Sabroe - Sabroe SMC 180 Series - Discharge Valve Assembly', NULL, E'Sabroe', E'Sabroe SMC 180 Series', E'Discharge Valve Assembly', NULL, E'SAB-SMC180-DVA-01', E'SAB-SMC180-DVA-01.jpg', E'SMC 180', NULL, E'To Shoot', NULL, NULL, NULL, E'Sabroe SMC 180 Series Discharge Valve Assembly spare part - Efforts Engineers', E'/sabroe/smc-180/discharge-valve-assembly', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Sabroe - Sabroe SMC 180 Series - Valve Spring and Cage', NULL, E'Sabroe', E'Sabroe SMC 180 Series', E'Valve Spring and Cage', NULL, E'SAB-SMC180-VSP-01', E'SAB-SMC180-VSP-01.jpg', E'SMC 180', NULL, E'To Shoot', NULL, NULL, NULL, E'Sabroe SMC 180 Series Valve Spring and Cage spare part - Efforts Engineers', E'/sabroe/smc-180/valve-spring-and-cage', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Sabroe - Sabroe SMC 180 Series - Cylinder Head Cover', NULL, E'Sabroe', E'Sabroe SMC 180 Series', E'Cylinder Head Cover', NULL, E'SAB-SMC180-HDC-01', E'SAB-SMC180-HDC-01.jpg', E'SMC 180', NULL, E'To Shoot', NULL, NULL, NULL, E'Sabroe SMC 180 Series Cylinder Head Cover spare part - Efforts Engineers', E'/sabroe/smc-180/cylinder-head-cover', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Sabroe - Sabroe SMC 180 Series - Gasket and Overhaul Kit', NULL, E'Sabroe', E'Sabroe SMC 180 Series', E'Gasket and Overhaul Kit', NULL, E'SAB-SMC180-GSK-01', E'SAB-SMC180-GSK-01.jpg', E'SMC 180', NULL, E'To Shoot', NULL, NULL, NULL, E'Sabroe SMC 180 Series Gasket and Overhaul Kit spare part - Efforts Engineers', E'/sabroe/smc-180/gasket-and-overhaul-kit', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Sabroe - Sabroe SMC 180 Series - Oil Pump Assembly', NULL, E'Sabroe', E'Sabroe SMC 180 Series', E'Oil Pump Assembly', NULL, E'SAB-SMC180-OPA-01', E'SAB-SMC180-OPA-01.jpg', E'SMC 180', NULL, E'To Shoot', NULL, NULL, NULL, E'Sabroe SMC 180 Series Oil Pump Assembly spare part - Efforts Engineers', E'/sabroe/smc-180/oil-pump-assembly', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Sabroe - Sabroe SMC 180 Series - Shaft Seal', NULL, E'Sabroe', E'Sabroe SMC 180 Series', E'Shaft Seal', NULL, E'SAB-SMC180-SHS-01', E'SAB-SMC180-SHS-01.jpg', E'SMC 180', NULL, E'To Shoot', NULL, NULL, NULL, E'Sabroe SMC 180 Series Shaft Seal spare part - Efforts Engineers', E'/sabroe/smc-180/shaft-seal', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Sabroe - Sabroe SMC 180 Series - Oil Filter and Strainer', NULL, E'Sabroe', E'Sabroe SMC 180 Series', E'Oil Filter and Strainer', NULL, E'SAB-SMC180-FLT-01', E'SAB-SMC180-FLT-01.jpg', E'SMC 180', NULL, E'To Shoot', NULL, NULL, NULL, E'Sabroe SMC 180 Series Oil Filter and Strainer spare part - Efforts Engineers', E'/sabroe/smc-180/oil-filter-and-strainer', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Sabroe - Sabroe SMC 180 Series - Unloader and Capacity Control', NULL, E'Sabroe', E'Sabroe SMC 180 Series', E'Unloader and Capacity Control', NULL, E'SAB-SMC180-ULD-01', E'SAB-SMC180-ULD-01.jpg', E'SMC 180', NULL, E'To Shoot', NULL, NULL, NULL, E'Sabroe SMC 180 Series Unloader and Capacity Control spare part - Efforts Engineers', E'/sabroe/smc-180/unloader-and-capacity-control', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Sabroe - Sabroe SMC 180 Series - Safety Head and Relief Valve', NULL, E'Sabroe', E'Sabroe SMC 180 Series', E'Safety Head and Relief Valve', NULL, E'SAB-SMC180-SAF-01', E'SAB-SMC180-SAF-01.jpg', E'SMC 180', NULL, E'To Shoot', NULL, NULL, NULL, E'Sabroe SMC 180 Series Safety Head and Relief Valve spare part - Efforts Engineers', E'/sabroe/smc-180/safety-head-and-relief-valve', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Sabroe - Sabroe HPO and HPC Series - Cylinder Liner', NULL, E'Sabroe', E'Sabroe HPO and HPC Series', E'Cylinder Liner', NULL, E'SAB-HPO-CLN-01', E'SAB-HPO-CLN-01.jpg', E'HPO 24, HPO / HPC (other sizes to add)', NULL, E'To Shoot', NULL, NULL, NULL, E'Sabroe HPO and HPC Series Cylinder Liner spare part - Efforts Engineers', E'/sabroe/hpo-hpc/cylinder-liner', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Sabroe - Sabroe HPO and HPC Series - Piston Assembly', NULL, E'Sabroe', E'Sabroe HPO and HPC Series', E'Piston Assembly', NULL, E'SAB-HPO-PST-01', E'SAB-HPO-PST-01.jpg', E'HPO 24, HPO / HPC (other sizes to add)', NULL, E'To Shoot', NULL, NULL, NULL, E'Sabroe HPO and HPC Series Piston Assembly spare part - Efforts Engineers', E'/sabroe/hpo-hpc/piston-assembly', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Sabroe - Sabroe HPO and HPC Series - Piston Ring Set', NULL, E'Sabroe', E'Sabroe HPO and HPC Series', E'Piston Ring Set', NULL, E'SAB-HPO-PRG-01', E'SAB-HPO-PRG-01.jpg', E'HPO 24, HPO / HPC (other sizes to add)', NULL, E'To Shoot', NULL, NULL, NULL, E'Sabroe HPO and HPC Series Piston Ring Set spare part - Efforts Engineers', E'/sabroe/hpo-hpc/piston-ring-set', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Sabroe - Sabroe HPO and HPC Series - Connecting Rod', NULL, E'Sabroe', E'Sabroe HPO and HPC Series', E'Connecting Rod', NULL, E'SAB-HPO-CRD-01', E'SAB-HPO-CRD-01.jpg', E'HPO 24, HPO / HPC (other sizes to add)', NULL, E'To Shoot', NULL, NULL, NULL, E'Sabroe HPO and HPC Series Connecting Rod spare part - Efforts Engineers', E'/sabroe/hpo-hpc/connecting-rod', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Sabroe - Sabroe HPO and HPC Series - Crankshaft', NULL, E'Sabroe', E'Sabroe HPO and HPC Series', E'Crankshaft', NULL, E'SAB-HPO-CRK-01', E'SAB-HPO-CRK-01.jpg', E'HPO 24, HPO / HPC (other sizes to add)', NULL, E'To Shoot', NULL, NULL, NULL, E'Sabroe HPO and HPC Series Crankshaft spare part - Efforts Engineers', E'/sabroe/hpo-hpc/crankshaft', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Sabroe - Sabroe HPO and HPC Series - Gudgeon Pin and Bush', NULL, E'Sabroe', E'Sabroe HPO and HPC Series', E'Gudgeon Pin and Bush', NULL, E'SAB-HPO-PIN-01', E'SAB-HPO-PIN-01.jpg', E'HPO 24, HPO / HPC (other sizes to add)', NULL, E'To Shoot', NULL, NULL, NULL, E'Sabroe HPO and HPC Series Gudgeon Pin and Bush spare part - Efforts Engineers', E'/sabroe/hpo-hpc/gudgeon-pin-and-bush', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Sabroe - Sabroe HPO and HPC Series - Main Bearing and Bush', NULL, E'Sabroe', E'Sabroe HPO and HPC Series', E'Main Bearing and Bush', NULL, E'SAB-HPO-BRG-01', E'SAB-HPO-BRG-01.jpg', E'HPO 24, HPO / HPC (other sizes to add)', NULL, E'To Shoot', NULL, NULL, NULL, E'Sabroe HPO and HPC Series Main Bearing and Bush spare part - Efforts Engineers', E'/sabroe/hpo-hpc/main-bearing-and-bush', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Sabroe - Sabroe HPO and HPC Series - Suction Valve Plate', NULL, E'Sabroe', E'Sabroe HPO and HPC Series', E'Suction Valve Plate', NULL, E'SAB-HPO-SVP-01', E'SAB-HPO-SVP-01.jpg', E'HPO 24, HPO / HPC (other sizes to add)', NULL, E'To Shoot', NULL, NULL, NULL, E'Sabroe HPO and HPC Series Suction Valve Plate spare part - Efforts Engineers', E'/sabroe/hpo-hpc/suction-valve-plate', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Sabroe - Sabroe HPO and HPC Series - Discharge Valve Assembly', NULL, E'Sabroe', E'Sabroe HPO and HPC Series', E'Discharge Valve Assembly', NULL, E'SAB-HPO-DVA-01', E'SAB-HPO-DVA-01.jpg', E'HPO 24, HPO / HPC (other sizes to add)', NULL, E'To Shoot', NULL, NULL, NULL, E'Sabroe HPO and HPC Series Discharge Valve Assembly spare part - Efforts Engineers', E'/sabroe/hpo-hpc/discharge-valve-assembly', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Sabroe - Sabroe HPO and HPC Series - Valve Spring and Cage', NULL, E'Sabroe', E'Sabroe HPO and HPC Series', E'Valve Spring and Cage', NULL, E'SAB-HPO-VSP-01', E'SAB-HPO-VSP-01.jpg', E'HPO 24, HPO / HPC (other sizes to add)', NULL, E'To Shoot', NULL, NULL, NULL, E'Sabroe HPO and HPC Series Valve Spring and Cage spare part - Efforts Engineers', E'/sabroe/hpo-hpc/valve-spring-and-cage', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Sabroe - Sabroe HPO and HPC Series - Cylinder Head Cover', NULL, E'Sabroe', E'Sabroe HPO and HPC Series', E'Cylinder Head Cover', NULL, E'SAB-HPO-HDC-01', E'SAB-HPO-HDC-01.jpg', E'HPO 24, HPO / HPC (other sizes to add)', NULL, E'To Shoot', NULL, NULL, NULL, E'Sabroe HPO and HPC Series Cylinder Head Cover spare part - Efforts Engineers', E'/sabroe/hpo-hpc/cylinder-head-cover', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Sabroe - Sabroe HPO and HPC Series - Gasket and Overhaul Kit', NULL, E'Sabroe', E'Sabroe HPO and HPC Series', E'Gasket and Overhaul Kit', NULL, E'SAB-HPO-GSK-01', E'SAB-HPO-GSK-01.jpg', E'HPO 24, HPO / HPC (other sizes to add)', NULL, E'To Shoot', NULL, NULL, NULL, E'Sabroe HPO and HPC Series Gasket and Overhaul Kit spare part - Efforts Engineers', E'/sabroe/hpo-hpc/gasket-and-overhaul-kit', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Sabroe - Sabroe HPO and HPC Series - Oil Pump Assembly', NULL, E'Sabroe', E'Sabroe HPO and HPC Series', E'Oil Pump Assembly', NULL, E'SAB-HPO-OPA-01', E'SAB-HPO-OPA-01.jpg', E'HPO 24, HPO / HPC (other sizes to add)', NULL, E'To Shoot', NULL, NULL, NULL, E'Sabroe HPO and HPC Series Oil Pump Assembly spare part - Efforts Engineers', E'/sabroe/hpo-hpc/oil-pump-assembly', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Sabroe - Sabroe HPO and HPC Series - Shaft Seal', NULL, E'Sabroe', E'Sabroe HPO and HPC Series', E'Shaft Seal', NULL, E'SAB-HPO-SHS-01', E'SAB-HPO-SHS-01.jpg', E'HPO 24, HPO / HPC (other sizes to add)', NULL, E'To Shoot', NULL, NULL, NULL, E'Sabroe HPO and HPC Series Shaft Seal spare part - Efforts Engineers', E'/sabroe/hpo-hpc/shaft-seal', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Sabroe - Sabroe HPO and HPC Series - Oil Filter and Strainer', NULL, E'Sabroe', E'Sabroe HPO and HPC Series', E'Oil Filter and Strainer', NULL, E'SAB-HPO-FLT-01', E'SAB-HPO-FLT-01.jpg', E'HPO 24, HPO / HPC (other sizes to add)', NULL, E'To Shoot', NULL, NULL, NULL, E'Sabroe HPO and HPC Series Oil Filter and Strainer spare part - Efforts Engineers', E'/sabroe/hpo-hpc/oil-filter-and-strainer', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Sabroe - Sabroe HPO and HPC Series - Unloader and Capacity Control', NULL, E'Sabroe', E'Sabroe HPO and HPC Series', E'Unloader and Capacity Control', NULL, E'SAB-HPO-ULD-01', E'SAB-HPO-ULD-01.jpg', E'HPO 24, HPO / HPC (other sizes to add)', NULL, E'To Shoot', NULL, NULL, NULL, E'Sabroe HPO and HPC Series Unloader and Capacity Control spare part - Efforts Engineers', E'/sabroe/hpo-hpc/unloader-and-capacity-control', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Sabroe - Sabroe HPO and HPC Series - Safety Head and Relief Valve', NULL, E'Sabroe', E'Sabroe HPO and HPC Series', E'Safety Head and Relief Valve', NULL, E'SAB-HPO-SAF-01', E'SAB-HPO-SAF-01.jpg', E'HPO 24, HPO / HPC (other sizes to add)', NULL, E'To Shoot', NULL, NULL, NULL, E'Sabroe HPO and HPC Series Safety Head and Relief Valve spare part - Efforts Engineers', E'/sabroe/hpo-hpc/safety-head-and-relief-valve', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Kirloskar - Kirloskar KC Series - Cylinder Liner', NULL, E'Kirloskar', E'Kirloskar KC Series', E'Cylinder Liner', NULL, E'KIR-KC-CLN-01', E'KIR-KC-CLN-01.jpg', E'KC 2, KC 3, KC 4, KC 6, KC 9, KC 12, KC 5', NULL, E'To Shoot', NULL, NULL, NULL, E'Kirloskar KC Series Cylinder Liner spare part - Efforts Engineers', E'/kirloskar/kc/cylinder-liner', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Kirloskar - Kirloskar KC Series - Piston Assembly', NULL, E'Kirloskar', E'Kirloskar KC Series', E'Piston Assembly', NULL, E'KIR-KC-PST-01', E'KIR-KC-PST-01.jpg', E'KC 2, KC 3, KC 4, KC 6, KC 9, KC 12, KC 5', NULL, E'To Shoot', NULL, NULL, NULL, E'Kirloskar KC Series Piston Assembly spare part - Efforts Engineers', E'/kirloskar/kc/piston-assembly', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Kirloskar - Kirloskar KC Series - Piston Ring Set', NULL, E'Kirloskar', E'Kirloskar KC Series', E'Piston Ring Set', NULL, E'KIR-KC-PRG-01', E'KIR-KC-PRG-01.jpg', E'KC 2, KC 3, KC 4, KC 6, KC 9, KC 12, KC 5', NULL, E'To Shoot', NULL, NULL, NULL, E'Kirloskar KC Series Piston Ring Set spare part - Efforts Engineers', E'/kirloskar/kc/piston-ring-set', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Kirloskar - Kirloskar KC Series - Connecting Rod', NULL, E'Kirloskar', E'Kirloskar KC Series', E'Connecting Rod', NULL, E'KIR-KC-CRD-01', E'KIR-KC-CRD-01.jpg', E'KC 2, KC 3, KC 4, KC 6, KC 9, KC 12, KC 5', NULL, E'To Shoot', NULL, NULL, NULL, E'Kirloskar KC Series Connecting Rod spare part - Efforts Engineers', E'/kirloskar/kc/connecting-rod', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Kirloskar - Kirloskar KC Series - Crankshaft', NULL, E'Kirloskar', E'Kirloskar KC Series', E'Crankshaft', NULL, E'KIR-KC-CRK-01', E'KIR-KC-CRK-01.jpg', E'KC 2, KC 3, KC 4, KC 6, KC 9, KC 12, KC 5', NULL, E'To Shoot', NULL, NULL, NULL, E'Kirloskar KC Series Crankshaft spare part - Efforts Engineers', E'/kirloskar/kc/crankshaft', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Kirloskar - Kirloskar KC Series - Gudgeon Pin and Bush', NULL, E'Kirloskar', E'Kirloskar KC Series', E'Gudgeon Pin and Bush', NULL, E'KIR-KC-PIN-01', E'KIR-KC-PIN-01.jpg', E'KC 2, KC 3, KC 4, KC 6, KC 9, KC 12, KC 5', NULL, E'To Shoot', NULL, NULL, NULL, E'Kirloskar KC Series Gudgeon Pin and Bush spare part - Efforts Engineers', E'/kirloskar/kc/gudgeon-pin-and-bush', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Kirloskar - Kirloskar KC Series - Main Bearing and Bush', NULL, E'Kirloskar', E'Kirloskar KC Series', E'Main Bearing and Bush', NULL, E'KIR-KC-BRG-01', E'KIR-KC-BRG-01.jpg', E'KC 2, KC 3, KC 4, KC 6, KC 9, KC 12, KC 5', NULL, E'To Shoot', NULL, NULL, NULL, E'Kirloskar KC Series Main Bearing and Bush spare part - Efforts Engineers', E'/kirloskar/kc/main-bearing-and-bush', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Kirloskar - Kirloskar KC Series - Suction Valve Plate', NULL, E'Kirloskar', E'Kirloskar KC Series', E'Suction Valve Plate', NULL, E'KIR-KC-SVP-01', E'KIR-KC-SVP-01.jpg', E'KC 2, KC 3, KC 4, KC 6, KC 9, KC 12, KC 5', NULL, E'To Shoot', NULL, NULL, NULL, E'Kirloskar KC Series Suction Valve Plate spare part - Efforts Engineers', E'/kirloskar/kc/suction-valve-plate', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Kirloskar - Kirloskar KC Series - Discharge Valve Assembly', NULL, E'Kirloskar', E'Kirloskar KC Series', E'Discharge Valve Assembly', NULL, E'KIR-KC-DVA-01', E'KIR-KC-DVA-01.jpg', E'KC 2, KC 3, KC 4, KC 6, KC 9, KC 12, KC 5', NULL, E'To Shoot', NULL, NULL, NULL, E'Kirloskar KC Series Discharge Valve Assembly spare part - Efforts Engineers', E'/kirloskar/kc/discharge-valve-assembly', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Kirloskar - Kirloskar KC Series - Valve Spring and Cage', NULL, E'Kirloskar', E'Kirloskar KC Series', E'Valve Spring and Cage', NULL, E'KIR-KC-VSP-01', E'KIR-KC-VSP-01.jpg', E'KC 2, KC 3, KC 4, KC 6, KC 9, KC 12, KC 5', NULL, E'To Shoot', NULL, NULL, NULL, E'Kirloskar KC Series Valve Spring and Cage spare part - Efforts Engineers', E'/kirloskar/kc/valve-spring-and-cage', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Kirloskar - Kirloskar KC Series - Cylinder Head Cover', NULL, E'Kirloskar', E'Kirloskar KC Series', E'Cylinder Head Cover', NULL, E'KIR-KC-HDC-01', E'KIR-KC-HDC-01.jpg', E'KC 2, KC 3, KC 4, KC 6, KC 9, KC 12, KC 5', NULL, E'To Shoot', NULL, NULL, NULL, E'Kirloskar KC Series Cylinder Head Cover spare part - Efforts Engineers', E'/kirloskar/kc/cylinder-head-cover', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Kirloskar - Kirloskar KC Series - Gasket and Overhaul Kit', NULL, E'Kirloskar', E'Kirloskar KC Series', E'Gasket and Overhaul Kit', NULL, E'KIR-KC-GSK-01', E'KIR-KC-GSK-01.jpg', E'KC 2, KC 3, KC 4, KC 6, KC 9, KC 12, KC 5', NULL, E'To Shoot', NULL, NULL, NULL, E'Kirloskar KC Series Gasket and Overhaul Kit spare part - Efforts Engineers', E'/kirloskar/kc/gasket-and-overhaul-kit', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Kirloskar - Kirloskar KC Series - Oil Pump Assembly', NULL, E'Kirloskar', E'Kirloskar KC Series', E'Oil Pump Assembly', NULL, E'KIR-KC-OPA-01', E'KIR-KC-OPA-01.jpg', E'KC 2, KC 3, KC 4, KC 6, KC 9, KC 12, KC 5', NULL, E'To Shoot', NULL, NULL, NULL, E'Kirloskar KC Series Oil Pump Assembly spare part - Efforts Engineers', E'/kirloskar/kc/oil-pump-assembly', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Kirloskar - Kirloskar KC Series - Shaft Seal', NULL, E'Kirloskar', E'Kirloskar KC Series', E'Shaft Seal', NULL, E'KIR-KC-SHS-01', E'KIR-KC-SHS-01.jpg', E'KC 2, KC 3, KC 4, KC 6, KC 9, KC 12, KC 5', NULL, E'To Shoot', NULL, NULL, NULL, E'Kirloskar KC Series Shaft Seal spare part - Efforts Engineers', E'/kirloskar/kc/shaft-seal', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Kirloskar - Kirloskar KC Series - Oil Filter and Strainer', NULL, E'Kirloskar', E'Kirloskar KC Series', E'Oil Filter and Strainer', NULL, E'KIR-KC-FLT-01', E'KIR-KC-FLT-01.jpg', E'KC 2, KC 3, KC 4, KC 6, KC 9, KC 12, KC 5', NULL, E'To Shoot', NULL, NULL, NULL, E'Kirloskar KC Series Oil Filter and Strainer spare part - Efforts Engineers', E'/kirloskar/kc/oil-filter-and-strainer', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Kirloskar - Kirloskar KC Series - Unloader and Capacity Control', NULL, E'Kirloskar', E'Kirloskar KC Series', E'Unloader and Capacity Control', NULL, E'KIR-KC-ULD-01', E'KIR-KC-ULD-01.jpg', E'KC 2, KC 3, KC 4, KC 6, KC 9, KC 12, KC 5', NULL, E'To Shoot', NULL, NULL, NULL, E'Kirloskar KC Series Unloader and Capacity Control spare part - Efforts Engineers', E'/kirloskar/kc/unloader-and-capacity-control', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Kirloskar - Kirloskar KC Series - Safety Head and Relief Valve', NULL, E'Kirloskar', E'Kirloskar KC Series', E'Safety Head and Relief Valve', NULL, E'KIR-KC-SAF-01', E'KIR-KC-SAF-01.jpg', E'KC 2, KC 3, KC 4, KC 6, KC 9, KC 12, KC 5', NULL, E'To Shoot', NULL, NULL, NULL, E'Kirloskar KC Series Safety Head and Relief Valve spare part - Efforts Engineers', E'/kirloskar/kc/safety-head-and-relief-valve', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Kirloskar - Kirloskar KC Two-Stage Series - Cylinder Liner', NULL, E'Kirloskar', E'Kirloskar KC Two-Stage Series', E'Cylinder Liner', NULL, E'KIR-KC2S-CLN-01', E'KIR-KC2S-CLN-01.jpg', E'KC 21, KC 31, KC 42, KC 51, KC 63, KC 72, KC 84, KC 93, KC 102', NULL, E'To Shoot', NULL, NULL, NULL, E'Kirloskar KC Two-Stage Series Cylinder Liner spare part - Efforts Engineers', E'/kirloskar/kc-two-stage/cylinder-liner', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Kirloskar - Kirloskar KC Two-Stage Series - Piston Assembly', NULL, E'Kirloskar', E'Kirloskar KC Two-Stage Series', E'Piston Assembly', NULL, E'KIR-KC2S-PST-01', E'KIR-KC2S-PST-01.jpg', E'KC 21, KC 31, KC 42, KC 51, KC 63, KC 72, KC 84, KC 93, KC 102', NULL, E'To Shoot', NULL, NULL, NULL, E'Kirloskar KC Two-Stage Series Piston Assembly spare part - Efforts Engineers', E'/kirloskar/kc-two-stage/piston-assembly', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Kirloskar - Kirloskar KC Two-Stage Series - Piston Ring Set', NULL, E'Kirloskar', E'Kirloskar KC Two-Stage Series', E'Piston Ring Set', NULL, E'KIR-KC2S-PRG-01', E'KIR-KC2S-PRG-01.jpg', E'KC 21, KC 31, KC 42, KC 51, KC 63, KC 72, KC 84, KC 93, KC 102', NULL, E'To Shoot', NULL, NULL, NULL, E'Kirloskar KC Two-Stage Series Piston Ring Set spare part - Efforts Engineers', E'/kirloskar/kc-two-stage/piston-ring-set', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Kirloskar - Kirloskar KC Two-Stage Series - Connecting Rod', NULL, E'Kirloskar', E'Kirloskar KC Two-Stage Series', E'Connecting Rod', NULL, E'KIR-KC2S-CRD-01', E'KIR-KC2S-CRD-01.jpg', E'KC 21, KC 31, KC 42, KC 51, KC 63, KC 72, KC 84, KC 93, KC 102', NULL, E'To Shoot', NULL, NULL, NULL, E'Kirloskar KC Two-Stage Series Connecting Rod spare part - Efforts Engineers', E'/kirloskar/kc-two-stage/connecting-rod', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Kirloskar - Kirloskar KC Two-Stage Series - Crankshaft', NULL, E'Kirloskar', E'Kirloskar KC Two-Stage Series', E'Crankshaft', NULL, E'KIR-KC2S-CRK-01', E'KIR-KC2S-CRK-01.jpg', E'KC 21, KC 31, KC 42, KC 51, KC 63, KC 72, KC 84, KC 93, KC 102', NULL, E'To Shoot', NULL, NULL, NULL, E'Kirloskar KC Two-Stage Series Crankshaft spare part - Efforts Engineers', E'/kirloskar/kc-two-stage/crankshaft', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Kirloskar - Kirloskar KC Two-Stage Series - Gudgeon Pin and Bush', NULL, E'Kirloskar', E'Kirloskar KC Two-Stage Series', E'Gudgeon Pin and Bush', NULL, E'KIR-KC2S-PIN-01', E'KIR-KC2S-PIN-01.jpg', E'KC 21, KC 31, KC 42, KC 51, KC 63, KC 72, KC 84, KC 93, KC 102', NULL, E'To Shoot', NULL, NULL, NULL, E'Kirloskar KC Two-Stage Series Gudgeon Pin and Bush spare part - Efforts Engineers', E'/kirloskar/kc-two-stage/gudgeon-pin-and-bush', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Kirloskar - Kirloskar KC Two-Stage Series - Main Bearing and Bush', NULL, E'Kirloskar', E'Kirloskar KC Two-Stage Series', E'Main Bearing and Bush', NULL, E'KIR-KC2S-BRG-01', E'KIR-KC2S-BRG-01.jpg', E'KC 21, KC 31, KC 42, KC 51, KC 63, KC 72, KC 84, KC 93, KC 102', NULL, E'To Shoot', NULL, NULL, NULL, E'Kirloskar KC Two-Stage Series Main Bearing and Bush spare part - Efforts Engineers', E'/kirloskar/kc-two-stage/main-bearing-and-bush', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Kirloskar - Kirloskar KC Two-Stage Series - Suction Valve Plate', NULL, E'Kirloskar', E'Kirloskar KC Two-Stage Series', E'Suction Valve Plate', NULL, E'KIR-KC2S-SVP-01', E'KIR-KC2S-SVP-01.jpg', E'KC 21, KC 31, KC 42, KC 51, KC 63, KC 72, KC 84, KC 93, KC 102', NULL, E'To Shoot', NULL, NULL, NULL, E'Kirloskar KC Two-Stage Series Suction Valve Plate spare part - Efforts Engineers', E'/kirloskar/kc-two-stage/suction-valve-plate', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Kirloskar - Kirloskar KC Two-Stage Series - Discharge Valve Assembly', NULL, E'Kirloskar', E'Kirloskar KC Two-Stage Series', E'Discharge Valve Assembly', NULL, E'KIR-KC2S-DVA-01', E'KIR-KC2S-DVA-01.jpg', E'KC 21, KC 31, KC 42, KC 51, KC 63, KC 72, KC 84, KC 93, KC 102', NULL, E'To Shoot', NULL, NULL, NULL, E'Kirloskar KC Two-Stage Series Discharge Valve Assembly spare part - Efforts Engineers', E'/kirloskar/kc-two-stage/discharge-valve-assembly', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Kirloskar - Kirloskar KC Two-Stage Series - Valve Spring and Cage', NULL, E'Kirloskar', E'Kirloskar KC Two-Stage Series', E'Valve Spring and Cage', NULL, E'KIR-KC2S-VSP-01', E'KIR-KC2S-VSP-01.jpg', E'KC 21, KC 31, KC 42, KC 51, KC 63, KC 72, KC 84, KC 93, KC 102', NULL, E'To Shoot', NULL, NULL, NULL, E'Kirloskar KC Two-Stage Series Valve Spring and Cage spare part - Efforts Engineers', E'/kirloskar/kc-two-stage/valve-spring-and-cage', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Kirloskar - Kirloskar KC Two-Stage Series - Cylinder Head Cover', NULL, E'Kirloskar', E'Kirloskar KC Two-Stage Series', E'Cylinder Head Cover', NULL, E'KIR-KC2S-HDC-01', E'KIR-KC2S-HDC-01.jpg', E'KC 21, KC 31, KC 42, KC 51, KC 63, KC 72, KC 84, KC 93, KC 102', NULL, E'To Shoot', NULL, NULL, NULL, E'Kirloskar KC Two-Stage Series Cylinder Head Cover spare part - Efforts Engineers', E'/kirloskar/kc-two-stage/cylinder-head-cover', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Kirloskar - Kirloskar KC Two-Stage Series - Gasket and Overhaul Kit', NULL, E'Kirloskar', E'Kirloskar KC Two-Stage Series', E'Gasket and Overhaul Kit', NULL, E'KIR-KC2S-GSK-01', E'KIR-KC2S-GSK-01.jpg', E'KC 21, KC 31, KC 42, KC 51, KC 63, KC 72, KC 84, KC 93, KC 102', NULL, E'To Shoot', NULL, NULL, NULL, E'Kirloskar KC Two-Stage Series Gasket and Overhaul Kit spare part - Efforts Engineers', E'/kirloskar/kc-two-stage/gasket-and-overhaul-kit', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Kirloskar - Kirloskar KC Two-Stage Series - Oil Pump Assembly', NULL, E'Kirloskar', E'Kirloskar KC Two-Stage Series', E'Oil Pump Assembly', NULL, E'KIR-KC2S-OPA-01', E'KIR-KC2S-OPA-01.jpg', E'KC 21, KC 31, KC 42, KC 51, KC 63, KC 72, KC 84, KC 93, KC 102', NULL, E'To Shoot', NULL, NULL, NULL, E'Kirloskar KC Two-Stage Series Oil Pump Assembly spare part - Efforts Engineers', E'/kirloskar/kc-two-stage/oil-pump-assembly', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Kirloskar - Kirloskar KC Two-Stage Series - Shaft Seal', NULL, E'Kirloskar', E'Kirloskar KC Two-Stage Series', E'Shaft Seal', NULL, E'KIR-KC2S-SHS-01', E'KIR-KC2S-SHS-01.jpg', E'KC 21, KC 31, KC 42, KC 51, KC 63, KC 72, KC 84, KC 93, KC 102', NULL, E'To Shoot', NULL, NULL, NULL, E'Kirloskar KC Two-Stage Series Shaft Seal spare part - Efforts Engineers', E'/kirloskar/kc-two-stage/shaft-seal', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Kirloskar - Kirloskar KC Two-Stage Series - Oil Filter and Strainer', NULL, E'Kirloskar', E'Kirloskar KC Two-Stage Series', E'Oil Filter and Strainer', NULL, E'KIR-KC2S-FLT-01', E'KIR-KC2S-FLT-01.jpg', E'KC 21, KC 31, KC 42, KC 51, KC 63, KC 72, KC 84, KC 93, KC 102', NULL, E'To Shoot', NULL, NULL, NULL, E'Kirloskar KC Two-Stage Series Oil Filter and Strainer spare part - Efforts Engineers', E'/kirloskar/kc-two-stage/oil-filter-and-strainer', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Kirloskar - Kirloskar KC Two-Stage Series - Unloader and Capacity Control', NULL, E'Kirloskar', E'Kirloskar KC Two-Stage Series', E'Unloader and Capacity Control', NULL, E'KIR-KC2S-ULD-01', E'KIR-KC2S-ULD-01.jpg', E'KC 21, KC 31, KC 42, KC 51, KC 63, KC 72, KC 84, KC 93, KC 102', NULL, E'To Shoot', NULL, NULL, NULL, E'Kirloskar KC Two-Stage Series Unloader and Capacity Control spare part - Efforts Engineers', E'/kirloskar/kc-two-stage/unloader-and-capacity-control', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Kirloskar - Kirloskar KC Two-Stage Series - Safety Head and Relief Valve', NULL, E'Kirloskar', E'Kirloskar KC Two-Stage Series', E'Safety Head and Relief Valve', NULL, E'KIR-KC2S-SAF-01', E'KIR-KC2S-SAF-01.jpg', E'KC 21, KC 31, KC 42, KC 51, KC 63, KC 72, KC 84, KC 93, KC 102', NULL, E'To Shoot', NULL, NULL, NULL, E'Kirloskar KC Two-Stage Series Safety Head and Relief Valve spare part - Efforts Engineers', E'/kirloskar/kc-two-stage/safety-head-and-relief-valve', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Kirloskar - Kirloskar KCX Series - Cylinder Liner', NULL, E'Kirloskar', E'Kirloskar KCX Series', E'Cylinder Liner', NULL, E'KIR-KCX-CLN-01', E'KIR-KCX-CLN-01.jpg', E'KCX 2, KCX 3, KCX 4, KCX 6', NULL, E'To Shoot', NULL, NULL, NULL, E'Kirloskar KCX Series Cylinder Liner spare part - Efforts Engineers', E'/kirloskar/kcx/cylinder-liner', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Kirloskar - Kirloskar KCX Series - Piston Assembly', NULL, E'Kirloskar', E'Kirloskar KCX Series', E'Piston Assembly', NULL, E'KIR-KCX-PST-01', E'KIR-KCX-PST-01.jpg', E'KCX 2, KCX 3, KCX 4, KCX 6', NULL, E'To Shoot', NULL, NULL, NULL, E'Kirloskar KCX Series Piston Assembly spare part - Efforts Engineers', E'/kirloskar/kcx/piston-assembly', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Kirloskar - Kirloskar KCX Series - Piston Ring Set', NULL, E'Kirloskar', E'Kirloskar KCX Series', E'Piston Ring Set', NULL, E'KIR-KCX-PRG-01', E'KIR-KCX-PRG-01.jpg', E'KCX 2, KCX 3, KCX 4, KCX 6', NULL, E'To Shoot', NULL, NULL, NULL, E'Kirloskar KCX Series Piston Ring Set spare part - Efforts Engineers', E'/kirloskar/kcx/piston-ring-set', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Kirloskar - Kirloskar KCX Series - Connecting Rod', NULL, E'Kirloskar', E'Kirloskar KCX Series', E'Connecting Rod', NULL, E'KIR-KCX-CRD-01', E'KIR-KCX-CRD-01.jpg', E'KCX 2, KCX 3, KCX 4, KCX 6', NULL, E'To Shoot', NULL, NULL, NULL, E'Kirloskar KCX Series Connecting Rod spare part - Efforts Engineers', E'/kirloskar/kcx/connecting-rod', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Kirloskar - Kirloskar KCX Series - Crankshaft', NULL, E'Kirloskar', E'Kirloskar KCX Series', E'Crankshaft', NULL, E'KIR-KCX-CRK-01', E'KIR-KCX-CRK-01.jpg', E'KCX 2, KCX 3, KCX 4, KCX 6', NULL, E'To Shoot', NULL, NULL, NULL, E'Kirloskar KCX Series Crankshaft spare part - Efforts Engineers', E'/kirloskar/kcx/crankshaft', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Kirloskar - Kirloskar KCX Series - Gudgeon Pin and Bush', NULL, E'Kirloskar', E'Kirloskar KCX Series', E'Gudgeon Pin and Bush', NULL, E'KIR-KCX-PIN-01', E'KIR-KCX-PIN-01.jpg', E'KCX 2, KCX 3, KCX 4, KCX 6', NULL, E'To Shoot', NULL, NULL, NULL, E'Kirloskar KCX Series Gudgeon Pin and Bush spare part - Efforts Engineers', E'/kirloskar/kcx/gudgeon-pin-and-bush', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Kirloskar - Kirloskar KCX Series - Main Bearing and Bush', NULL, E'Kirloskar', E'Kirloskar KCX Series', E'Main Bearing and Bush', NULL, E'KIR-KCX-BRG-01', E'KIR-KCX-BRG-01.jpg', E'KCX 2, KCX 3, KCX 4, KCX 6', NULL, E'To Shoot', NULL, NULL, NULL, E'Kirloskar KCX Series Main Bearing and Bush spare part - Efforts Engineers', E'/kirloskar/kcx/main-bearing-and-bush', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Kirloskar - Kirloskar KCX Series - Suction Valve Plate', NULL, E'Kirloskar', E'Kirloskar KCX Series', E'Suction Valve Plate', NULL, E'KIR-KCX-SVP-01', E'KIR-KCX-SVP-01.jpg', E'KCX 2, KCX 3, KCX 4, KCX 6', NULL, E'To Shoot', NULL, NULL, NULL, E'Kirloskar KCX Series Suction Valve Plate spare part - Efforts Engineers', E'/kirloskar/kcx/suction-valve-plate', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Kirloskar - Kirloskar KCX Series - Discharge Valve Assembly', NULL, E'Kirloskar', E'Kirloskar KCX Series', E'Discharge Valve Assembly', NULL, E'KIR-KCX-DVA-01', E'KIR-KCX-DVA-01.jpg', E'KCX 2, KCX 3, KCX 4, KCX 6', NULL, E'To Shoot', NULL, NULL, NULL, E'Kirloskar KCX Series Discharge Valve Assembly spare part - Efforts Engineers', E'/kirloskar/kcx/discharge-valve-assembly', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Kirloskar - Kirloskar KCX Series - Valve Spring and Cage', NULL, E'Kirloskar', E'Kirloskar KCX Series', E'Valve Spring and Cage', NULL, E'KIR-KCX-VSP-01', E'KIR-KCX-VSP-01.jpg', E'KCX 2, KCX 3, KCX 4, KCX 6', NULL, E'To Shoot', NULL, NULL, NULL, E'Kirloskar KCX Series Valve Spring and Cage spare part - Efforts Engineers', E'/kirloskar/kcx/valve-spring-and-cage', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Kirloskar - Kirloskar KCX Series - Cylinder Head Cover', NULL, E'Kirloskar', E'Kirloskar KCX Series', E'Cylinder Head Cover', NULL, E'KIR-KCX-HDC-01', E'KIR-KCX-HDC-01.jpg', E'KCX 2, KCX 3, KCX 4, KCX 6', NULL, E'To Shoot', NULL, NULL, NULL, E'Kirloskar KCX Series Cylinder Head Cover spare part - Efforts Engineers', E'/kirloskar/kcx/cylinder-head-cover', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Kirloskar - Kirloskar KCX Series - Gasket and Overhaul Kit', NULL, E'Kirloskar', E'Kirloskar KCX Series', E'Gasket and Overhaul Kit', NULL, E'KIR-KCX-GSK-01', E'KIR-KCX-GSK-01.jpg', E'KCX 2, KCX 3, KCX 4, KCX 6', NULL, E'To Shoot', NULL, NULL, NULL, E'Kirloskar KCX Series Gasket and Overhaul Kit spare part - Efforts Engineers', E'/kirloskar/kcx/gasket-and-overhaul-kit', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Kirloskar - Kirloskar KCX Series - Oil Pump Assembly', NULL, E'Kirloskar', E'Kirloskar KCX Series', E'Oil Pump Assembly', NULL, E'KIR-KCX-OPA-01', E'KIR-KCX-OPA-01.jpg', E'KCX 2, KCX 3, KCX 4, KCX 6', NULL, E'To Shoot', NULL, NULL, NULL, E'Kirloskar KCX Series Oil Pump Assembly spare part - Efforts Engineers', E'/kirloskar/kcx/oil-pump-assembly', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Kirloskar - Kirloskar KCX Series - Shaft Seal', NULL, E'Kirloskar', E'Kirloskar KCX Series', E'Shaft Seal', NULL, E'KIR-KCX-SHS-01', E'KIR-KCX-SHS-01.jpg', E'KCX 2, KCX 3, KCX 4, KCX 6', NULL, E'To Shoot', NULL, NULL, NULL, E'Kirloskar KCX Series Shaft Seal spare part - Efforts Engineers', E'/kirloskar/kcx/shaft-seal', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Kirloskar - Kirloskar KCX Series - Oil Filter and Strainer', NULL, E'Kirloskar', E'Kirloskar KCX Series', E'Oil Filter and Strainer', NULL, E'KIR-KCX-FLT-01', E'KIR-KCX-FLT-01.jpg', E'KCX 2, KCX 3, KCX 4, KCX 6', NULL, E'To Shoot', NULL, NULL, NULL, E'Kirloskar KCX Series Oil Filter and Strainer spare part - Efforts Engineers', E'/kirloskar/kcx/oil-filter-and-strainer', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Kirloskar - Kirloskar KCX Series - Unloader and Capacity Control', NULL, E'Kirloskar', E'Kirloskar KCX Series', E'Unloader and Capacity Control', NULL, E'KIR-KCX-ULD-01', E'KIR-KCX-ULD-01.jpg', E'KCX 2, KCX 3, KCX 4, KCX 6', NULL, E'To Shoot', NULL, NULL, NULL, E'Kirloskar KCX Series Unloader and Capacity Control spare part - Efforts Engineers', E'/kirloskar/kcx/unloader-and-capacity-control', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Kirloskar - Kirloskar KCX Series - Safety Head and Relief Valve', NULL, E'Kirloskar', E'Kirloskar KCX Series', E'Safety Head and Relief Valve', NULL, E'KIR-KCX-SAF-01', E'KIR-KCX-SAF-01.jpg', E'KCX 2, KCX 3, KCX 4, KCX 6', NULL, E'To Shoot', NULL, NULL, NULL, E'Kirloskar KCX Series Safety Head and Relief Valve spare part - Efforts Engineers', E'/kirloskar/kcx/safety-head-and-relief-valve', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Kirloskar - Kirloskar PC Series - Cylinder Liner', NULL, E'Kirloskar', E'Kirloskar PC Series', E'Cylinder Liner', NULL, E'KIR-PC-CLN-01', E'KIR-PC-CLN-01.jpg', E'PC 2, PC (other sizes to add)', NULL, E'To Shoot', NULL, NULL, NULL, E'Kirloskar PC Series Cylinder Liner spare part - Efforts Engineers', E'/kirloskar/pc/cylinder-liner', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Kirloskar - Kirloskar PC Series - Piston Assembly', NULL, E'Kirloskar', E'Kirloskar PC Series', E'Piston Assembly', NULL, E'KIR-PC-PST-01', E'KIR-PC-PST-01.jpg', E'PC 2, PC (other sizes to add)', NULL, E'To Shoot', NULL, NULL, NULL, E'Kirloskar PC Series Piston Assembly spare part - Efforts Engineers', E'/kirloskar/pc/piston-assembly', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Kirloskar - Kirloskar PC Series - Piston Ring Set', NULL, E'Kirloskar', E'Kirloskar PC Series', E'Piston Ring Set', NULL, E'KIR-PC-PRG-01', E'KIR-PC-PRG-01.jpg', E'PC 2, PC (other sizes to add)', NULL, E'To Shoot', NULL, NULL, NULL, E'Kirloskar PC Series Piston Ring Set spare part - Efforts Engineers', E'/kirloskar/pc/piston-ring-set', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Kirloskar - Kirloskar PC Series - Connecting Rod', NULL, E'Kirloskar', E'Kirloskar PC Series', E'Connecting Rod', NULL, E'KIR-PC-CRD-01', E'KIR-PC-CRD-01.jpg', E'PC 2, PC (other sizes to add)', NULL, E'To Shoot', NULL, NULL, NULL, E'Kirloskar PC Series Connecting Rod spare part - Efforts Engineers', E'/kirloskar/pc/connecting-rod', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Kirloskar - Kirloskar PC Series - Crankshaft', NULL, E'Kirloskar', E'Kirloskar PC Series', E'Crankshaft', NULL, E'KIR-PC-CRK-01', E'KIR-PC-CRK-01.jpg', E'PC 2, PC (other sizes to add)', NULL, E'To Shoot', NULL, NULL, NULL, E'Kirloskar PC Series Crankshaft spare part - Efforts Engineers', E'/kirloskar/pc/crankshaft', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Kirloskar - Kirloskar PC Series - Gudgeon Pin and Bush', NULL, E'Kirloskar', E'Kirloskar PC Series', E'Gudgeon Pin and Bush', NULL, E'KIR-PC-PIN-01', E'KIR-PC-PIN-01.jpg', E'PC 2, PC (other sizes to add)', NULL, E'To Shoot', NULL, NULL, NULL, E'Kirloskar PC Series Gudgeon Pin and Bush spare part - Efforts Engineers', E'/kirloskar/pc/gudgeon-pin-and-bush', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Kirloskar - Kirloskar PC Series - Main Bearing and Bush', NULL, E'Kirloskar', E'Kirloskar PC Series', E'Main Bearing and Bush', NULL, E'KIR-PC-BRG-01', E'KIR-PC-BRG-01.jpg', E'PC 2, PC (other sizes to add)', NULL, E'To Shoot', NULL, NULL, NULL, E'Kirloskar PC Series Main Bearing and Bush spare part - Efforts Engineers', E'/kirloskar/pc/main-bearing-and-bush', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Kirloskar - Kirloskar PC Series - Suction Valve Plate', NULL, E'Kirloskar', E'Kirloskar PC Series', E'Suction Valve Plate', NULL, E'KIR-PC-SVP-01', E'KIR-PC-SVP-01.jpg', E'PC 2, PC (other sizes to add)', NULL, E'To Shoot', NULL, NULL, NULL, E'Kirloskar PC Series Suction Valve Plate spare part - Efforts Engineers', E'/kirloskar/pc/suction-valve-plate', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Kirloskar - Kirloskar PC Series - Discharge Valve Assembly', NULL, E'Kirloskar', E'Kirloskar PC Series', E'Discharge Valve Assembly', NULL, E'KIR-PC-DVA-01', E'KIR-PC-DVA-01.jpg', E'PC 2, PC (other sizes to add)', NULL, E'To Shoot', NULL, NULL, NULL, E'Kirloskar PC Series Discharge Valve Assembly spare part - Efforts Engineers', E'/kirloskar/pc/discharge-valve-assembly', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Kirloskar - Kirloskar PC Series - Valve Spring and Cage', NULL, E'Kirloskar', E'Kirloskar PC Series', E'Valve Spring and Cage', NULL, E'KIR-PC-VSP-01', E'KIR-PC-VSP-01.jpg', E'PC 2, PC (other sizes to add)', NULL, E'To Shoot', NULL, NULL, NULL, E'Kirloskar PC Series Valve Spring and Cage spare part - Efforts Engineers', E'/kirloskar/pc/valve-spring-and-cage', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Kirloskar - Kirloskar PC Series - Cylinder Head Cover', NULL, E'Kirloskar', E'Kirloskar PC Series', E'Cylinder Head Cover', NULL, E'KIR-PC-HDC-01', E'KIR-PC-HDC-01.jpg', E'PC 2, PC (other sizes to add)', NULL, E'To Shoot', NULL, NULL, NULL, E'Kirloskar PC Series Cylinder Head Cover spare part - Efforts Engineers', E'/kirloskar/pc/cylinder-head-cover', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Kirloskar - Kirloskar PC Series - Gasket and Overhaul Kit', NULL, E'Kirloskar', E'Kirloskar PC Series', E'Gasket and Overhaul Kit', NULL, E'KIR-PC-GSK-01', E'KIR-PC-GSK-01.jpg', E'PC 2, PC (other sizes to add)', NULL, E'To Shoot', NULL, NULL, NULL, E'Kirloskar PC Series Gasket and Overhaul Kit spare part - Efforts Engineers', E'/kirloskar/pc/gasket-and-overhaul-kit', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Kirloskar - Kirloskar PC Series - Oil Pump Assembly', NULL, E'Kirloskar', E'Kirloskar PC Series', E'Oil Pump Assembly', NULL, E'KIR-PC-OPA-01', E'KIR-PC-OPA-01.jpg', E'PC 2, PC (other sizes to add)', NULL, E'To Shoot', NULL, NULL, NULL, E'Kirloskar PC Series Oil Pump Assembly spare part - Efforts Engineers', E'/kirloskar/pc/oil-pump-assembly', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Kirloskar - Kirloskar PC Series - Shaft Seal', NULL, E'Kirloskar', E'Kirloskar PC Series', E'Shaft Seal', NULL, E'KIR-PC-SHS-01', E'KIR-PC-SHS-01.jpg', E'PC 2, PC (other sizes to add)', NULL, E'To Shoot', NULL, NULL, NULL, E'Kirloskar PC Series Shaft Seal spare part - Efforts Engineers', E'/kirloskar/pc/shaft-seal', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Kirloskar - Kirloskar PC Series - Oil Filter and Strainer', NULL, E'Kirloskar', E'Kirloskar PC Series', E'Oil Filter and Strainer', NULL, E'KIR-PC-FLT-01', E'KIR-PC-FLT-01.jpg', E'PC 2, PC (other sizes to add)', NULL, E'To Shoot', NULL, NULL, NULL, E'Kirloskar PC Series Oil Filter and Strainer spare part - Efforts Engineers', E'/kirloskar/pc/oil-filter-and-strainer', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Kirloskar - Kirloskar PC Series - Unloader and Capacity Control', NULL, E'Kirloskar', E'Kirloskar PC Series', E'Unloader and Capacity Control', NULL, E'KIR-PC-ULD-01', E'KIR-PC-ULD-01.jpg', E'PC 2, PC (other sizes to add)', NULL, E'To Shoot', NULL, NULL, NULL, E'Kirloskar PC Series Unloader and Capacity Control spare part - Efforts Engineers', E'/kirloskar/pc/unloader-and-capacity-control', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Kirloskar - Kirloskar PC Series - Safety Head and Relief Valve', NULL, E'Kirloskar', E'Kirloskar PC Series', E'Safety Head and Relief Valve', NULL, E'KIR-PC-SAF-01', E'KIR-PC-SAF-01.jpg', E'PC 2, PC (other sizes to add)', NULL, E'To Shoot', NULL, NULL, NULL, E'Kirloskar PC Series Safety Head and Relief Valve spare part - Efforts Engineers', E'/kirloskar/pc/safety-head-and-relief-valve', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Vilter - Vilter VMC 440 Series - Cylinder Liner', NULL, E'Vilter', E'Vilter VMC 440 Series', E'Cylinder Liner', NULL, E'VIL-V440-CLN-01', E'VIL-V440-CLN-01.jpg', E'442, 444, 446, 448, 4412, 4416', NULL, E'To Shoot', NULL, NULL, NULL, E'Vilter VMC 440 Series Cylinder Liner spare part - Efforts Engineers', E'/vilter/vmc-440/cylinder-liner', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Vilter - Vilter VMC 440 Series - Piston Assembly', NULL, E'Vilter', E'Vilter VMC 440 Series', E'Piston Assembly', NULL, E'VIL-V440-PST-01', E'VIL-V440-PST-01.jpg', E'442, 444, 446, 448, 4412, 4416', NULL, E'To Shoot', NULL, NULL, NULL, E'Vilter VMC 440 Series Piston Assembly spare part - Efforts Engineers', E'/vilter/vmc-440/piston-assembly', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Vilter - Vilter VMC 440 Series - Piston Ring Set', NULL, E'Vilter', E'Vilter VMC 440 Series', E'Piston Ring Set', NULL, E'VIL-V440-PRG-01', E'VIL-V440-PRG-01.jpg', E'442, 444, 446, 448, 4412, 4416', NULL, E'To Shoot', NULL, NULL, NULL, E'Vilter VMC 440 Series Piston Ring Set spare part - Efforts Engineers', E'/vilter/vmc-440/piston-ring-set', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Vilter - Vilter VMC 440 Series - Connecting Rod', NULL, E'Vilter', E'Vilter VMC 440 Series', E'Connecting Rod', NULL, E'VIL-V440-CRD-01', E'VIL-V440-CRD-01.jpg', E'442, 444, 446, 448, 4412, 4416', NULL, E'To Shoot', NULL, NULL, NULL, E'Vilter VMC 440 Series Connecting Rod spare part - Efforts Engineers', E'/vilter/vmc-440/connecting-rod', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Vilter - Vilter VMC 440 Series - Crankshaft', NULL, E'Vilter', E'Vilter VMC 440 Series', E'Crankshaft', NULL, E'VIL-V440-CRK-01', E'VIL-V440-CRK-01.jpg', E'442, 444, 446, 448, 4412, 4416', NULL, E'To Shoot', NULL, NULL, NULL, E'Vilter VMC 440 Series Crankshaft spare part - Efforts Engineers', E'/vilter/vmc-440/crankshaft', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Vilter - Vilter VMC 440 Series - Gudgeon Pin and Bush', NULL, E'Vilter', E'Vilter VMC 440 Series', E'Gudgeon Pin and Bush', NULL, E'VIL-V440-PIN-01', E'VIL-V440-PIN-01.jpg', E'442, 444, 446, 448, 4412, 4416', NULL, E'To Shoot', NULL, NULL, NULL, E'Vilter VMC 440 Series Gudgeon Pin and Bush spare part - Efforts Engineers', E'/vilter/vmc-440/gudgeon-pin-and-bush', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Vilter - Vilter VMC 440 Series - Main Bearing and Bush', NULL, E'Vilter', E'Vilter VMC 440 Series', E'Main Bearing and Bush', NULL, E'VIL-V440-BRG-01', E'VIL-V440-BRG-01.jpg', E'442, 444, 446, 448, 4412, 4416', NULL, E'To Shoot', NULL, NULL, NULL, E'Vilter VMC 440 Series Main Bearing and Bush spare part - Efforts Engineers', E'/vilter/vmc-440/main-bearing-and-bush', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Vilter - Vilter VMC 440 Series - Suction Valve Plate', NULL, E'Vilter', E'Vilter VMC 440 Series', E'Suction Valve Plate', NULL, E'VIL-V440-SVP-01', E'VIL-V440-SVP-01.jpg', E'442, 444, 446, 448, 4412, 4416', NULL, E'To Shoot', NULL, NULL, NULL, E'Vilter VMC 440 Series Suction Valve Plate spare part - Efforts Engineers', E'/vilter/vmc-440/suction-valve-plate', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Vilter - Vilter VMC 440 Series - Discharge Valve Assembly', NULL, E'Vilter', E'Vilter VMC 440 Series', E'Discharge Valve Assembly', NULL, E'VIL-V440-DVA-01', E'VIL-V440-DVA-01.jpg', E'442, 444, 446, 448, 4412, 4416', NULL, E'To Shoot', NULL, NULL, NULL, E'Vilter VMC 440 Series Discharge Valve Assembly spare part - Efforts Engineers', E'/vilter/vmc-440/discharge-valve-assembly', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Vilter - Vilter VMC 440 Series - Valve Spring and Cage', NULL, E'Vilter', E'Vilter VMC 440 Series', E'Valve Spring and Cage', NULL, E'VIL-V440-VSP-01', E'VIL-V440-VSP-01.jpg', E'442, 444, 446, 448, 4412, 4416', NULL, E'To Shoot', NULL, NULL, NULL, E'Vilter VMC 440 Series Valve Spring and Cage spare part - Efforts Engineers', E'/vilter/vmc-440/valve-spring-and-cage', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Vilter - Vilter VMC 440 Series - Cylinder Head Cover', NULL, E'Vilter', E'Vilter VMC 440 Series', E'Cylinder Head Cover', NULL, E'VIL-V440-HDC-01', E'VIL-V440-HDC-01.jpg', E'442, 444, 446, 448, 4412, 4416', NULL, E'To Shoot', NULL, NULL, NULL, E'Vilter VMC 440 Series Cylinder Head Cover spare part - Efforts Engineers', E'/vilter/vmc-440/cylinder-head-cover', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Vilter - Vilter VMC 440 Series - Gasket and Overhaul Kit', NULL, E'Vilter', E'Vilter VMC 440 Series', E'Gasket and Overhaul Kit', NULL, E'VIL-V440-GSK-01', E'VIL-V440-GSK-01.jpg', E'442, 444, 446, 448, 4412, 4416', NULL, E'To Shoot', NULL, NULL, NULL, E'Vilter VMC 440 Series Gasket and Overhaul Kit spare part - Efforts Engineers', E'/vilter/vmc-440/gasket-and-overhaul-kit', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Vilter - Vilter VMC 440 Series - Oil Pump Assembly', NULL, E'Vilter', E'Vilter VMC 440 Series', E'Oil Pump Assembly', NULL, E'VIL-V440-OPA-01', E'VIL-V440-OPA-01.jpg', E'442, 444, 446, 448, 4412, 4416', NULL, E'To Shoot', NULL, NULL, NULL, E'Vilter VMC 440 Series Oil Pump Assembly spare part - Efforts Engineers', E'/vilter/vmc-440/oil-pump-assembly', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Vilter - Vilter VMC 440 Series - Shaft Seal', NULL, E'Vilter', E'Vilter VMC 440 Series', E'Shaft Seal', NULL, E'VIL-V440-SHS-01', E'VIL-V440-SHS-01.jpg', E'442, 444, 446, 448, 4412, 4416', NULL, E'To Shoot', NULL, NULL, NULL, E'Vilter VMC 440 Series Shaft Seal spare part - Efforts Engineers', E'/vilter/vmc-440/shaft-seal', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Vilter - Vilter VMC 440 Series - Oil Filter and Strainer', NULL, E'Vilter', E'Vilter VMC 440 Series', E'Oil Filter and Strainer', NULL, E'VIL-V440-FLT-01', E'VIL-V440-FLT-01.jpg', E'442, 444, 446, 448, 4412, 4416', NULL, E'To Shoot', NULL, NULL, NULL, E'Vilter VMC 440 Series Oil Filter and Strainer spare part - Efforts Engineers', E'/vilter/vmc-440/oil-filter-and-strainer', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Vilter - Vilter VMC 440 Series - Unloader and Capacity Control', NULL, E'Vilter', E'Vilter VMC 440 Series', E'Unloader and Capacity Control', NULL, E'VIL-V440-ULD-01', E'VIL-V440-ULD-01.jpg', E'442, 444, 446, 448, 4412, 4416', NULL, E'To Shoot', NULL, NULL, NULL, E'Vilter VMC 440 Series Unloader and Capacity Control spare part - Efforts Engineers', E'/vilter/vmc-440/unloader-and-capacity-control', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Vilter - Vilter VMC 440 Series - Safety Head and Relief Valve', NULL, E'Vilter', E'Vilter VMC 440 Series', E'Safety Head and Relief Valve', NULL, E'VIL-V440-SAF-01', E'VIL-V440-SAF-01.jpg', E'442, 444, 446, 448, 4412, 4416', NULL, E'To Shoot', NULL, NULL, NULL, E'Vilter VMC 440 Series Safety Head and Relief Valve spare part - Efforts Engineers', E'/vilter/vmc-440/safety-head-and-relief-valve', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Vilter - Vilter VMC 450 XL Series - Cylinder Liner', NULL, E'Vilter', E'Vilter VMC 450 XL Series', E'Cylinder Liner', NULL, E'VIL-V450XL-CLN-01', E'VIL-V450XL-CLN-01.jpg', E'452 XL, 454 XL, 456 XL, 458 XL, 458, 4512 XL, 4516 XL', NULL, E'To Shoot', NULL, NULL, NULL, E'Vilter VMC 450 XL Series Cylinder Liner spare part - Efforts Engineers', E'/vilter/vmc-450-xl/cylinder-liner', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Vilter - Vilter VMC 450 XL Series - Piston Assembly', NULL, E'Vilter', E'Vilter VMC 450 XL Series', E'Piston Assembly', NULL, E'VIL-V450XL-PST-01', E'VIL-V450XL-PST-01.jpg', E'452 XL, 454 XL, 456 XL, 458 XL, 458, 4512 XL, 4516 XL', NULL, E'To Shoot', NULL, NULL, NULL, E'Vilter VMC 450 XL Series Piston Assembly spare part - Efforts Engineers', E'/vilter/vmc-450-xl/piston-assembly', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Vilter - Vilter VMC 450 XL Series - Piston Ring Set', NULL, E'Vilter', E'Vilter VMC 450 XL Series', E'Piston Ring Set', NULL, E'VIL-V450XL-PRG-01', E'VIL-V450XL-PRG-01.jpg', E'452 XL, 454 XL, 456 XL, 458 XL, 458, 4512 XL, 4516 XL', NULL, E'To Shoot', NULL, NULL, NULL, E'Vilter VMC 450 XL Series Piston Ring Set spare part - Efforts Engineers', E'/vilter/vmc-450-xl/piston-ring-set', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Vilter - Vilter VMC 450 XL Series - Connecting Rod', NULL, E'Vilter', E'Vilter VMC 450 XL Series', E'Connecting Rod', NULL, E'VIL-V450XL-CRD-01', E'VIL-V450XL-CRD-01.jpg', E'452 XL, 454 XL, 456 XL, 458 XL, 458, 4512 XL, 4516 XL', NULL, E'To Shoot', NULL, NULL, NULL, E'Vilter VMC 450 XL Series Connecting Rod spare part - Efforts Engineers', E'/vilter/vmc-450-xl/connecting-rod', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Vilter - Vilter VMC 450 XL Series - Crankshaft', NULL, E'Vilter', E'Vilter VMC 450 XL Series', E'Crankshaft', NULL, E'VIL-V450XL-CRK-01', E'VIL-V450XL-CRK-01.jpg', E'452 XL, 454 XL, 456 XL, 458 XL, 458, 4512 XL, 4516 XL', NULL, E'To Shoot', NULL, NULL, NULL, E'Vilter VMC 450 XL Series Crankshaft spare part - Efforts Engineers', E'/vilter/vmc-450-xl/crankshaft', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Vilter - Vilter VMC 450 XL Series - Gudgeon Pin and Bush', NULL, E'Vilter', E'Vilter VMC 450 XL Series', E'Gudgeon Pin and Bush', NULL, E'VIL-V450XL-PIN-01', E'VIL-V450XL-PIN-01.jpg', E'452 XL, 454 XL, 456 XL, 458 XL, 458, 4512 XL, 4516 XL', NULL, E'To Shoot', NULL, NULL, NULL, E'Vilter VMC 450 XL Series Gudgeon Pin and Bush spare part - Efforts Engineers', E'/vilter/vmc-450-xl/gudgeon-pin-and-bush', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Vilter - Vilter VMC 450 XL Series - Main Bearing and Bush', NULL, E'Vilter', E'Vilter VMC 450 XL Series', E'Main Bearing and Bush', NULL, E'VIL-V450XL-BRG-01', E'VIL-V450XL-BRG-01.jpg', E'452 XL, 454 XL, 456 XL, 458 XL, 458, 4512 XL, 4516 XL', NULL, E'To Shoot', NULL, NULL, NULL, E'Vilter VMC 450 XL Series Main Bearing and Bush spare part - Efforts Engineers', E'/vilter/vmc-450-xl/main-bearing-and-bush', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Vilter - Vilter VMC 450 XL Series - Suction Valve Plate', NULL, E'Vilter', E'Vilter VMC 450 XL Series', E'Suction Valve Plate', NULL, E'VIL-V450XL-SVP-01', E'VIL-V450XL-SVP-01.jpg', E'452 XL, 454 XL, 456 XL, 458 XL, 458, 4512 XL, 4516 XL', NULL, E'To Shoot', NULL, NULL, NULL, E'Vilter VMC 450 XL Series Suction Valve Plate spare part - Efforts Engineers', E'/vilter/vmc-450-xl/suction-valve-plate', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Vilter - Vilter VMC 450 XL Series - Discharge Valve Assembly', NULL, E'Vilter', E'Vilter VMC 450 XL Series', E'Discharge Valve Assembly', NULL, E'VIL-V450XL-DVA-01', E'VIL-V450XL-DVA-01.jpg', E'452 XL, 454 XL, 456 XL, 458 XL, 458, 4512 XL, 4516 XL', NULL, E'To Shoot', NULL, NULL, NULL, E'Vilter VMC 450 XL Series Discharge Valve Assembly spare part - Efforts Engineers', E'/vilter/vmc-450-xl/discharge-valve-assembly', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Vilter - Vilter VMC 450 XL Series - Valve Spring and Cage', NULL, E'Vilter', E'Vilter VMC 450 XL Series', E'Valve Spring and Cage', NULL, E'VIL-V450XL-VSP-01', E'VIL-V450XL-VSP-01.jpg', E'452 XL, 454 XL, 456 XL, 458 XL, 458, 4512 XL, 4516 XL', NULL, E'To Shoot', NULL, NULL, NULL, E'Vilter VMC 450 XL Series Valve Spring and Cage spare part - Efforts Engineers', E'/vilter/vmc-450-xl/valve-spring-and-cage', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Vilter - Vilter VMC 450 XL Series - Cylinder Head Cover', NULL, E'Vilter', E'Vilter VMC 450 XL Series', E'Cylinder Head Cover', NULL, E'VIL-V450XL-HDC-01', E'VIL-V450XL-HDC-01.jpg', E'452 XL, 454 XL, 456 XL, 458 XL, 458, 4512 XL, 4516 XL', NULL, E'To Shoot', NULL, NULL, NULL, E'Vilter VMC 450 XL Series Cylinder Head Cover spare part - Efforts Engineers', E'/vilter/vmc-450-xl/cylinder-head-cover', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Vilter - Vilter VMC 450 XL Series - Gasket and Overhaul Kit', NULL, E'Vilter', E'Vilter VMC 450 XL Series', E'Gasket and Overhaul Kit', NULL, E'VIL-V450XL-GSK-01', E'VIL-V450XL-GSK-01.jpg', E'452 XL, 454 XL, 456 XL, 458 XL, 458, 4512 XL, 4516 XL', NULL, E'To Shoot', NULL, NULL, NULL, E'Vilter VMC 450 XL Series Gasket and Overhaul Kit spare part - Efforts Engineers', E'/vilter/vmc-450-xl/gasket-and-overhaul-kit', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Vilter - Vilter VMC 450 XL Series - Oil Pump Assembly', NULL, E'Vilter', E'Vilter VMC 450 XL Series', E'Oil Pump Assembly', NULL, E'VIL-V450XL-OPA-01', E'VIL-V450XL-OPA-01.jpg', E'452 XL, 454 XL, 456 XL, 458 XL, 458, 4512 XL, 4516 XL', NULL, E'To Shoot', NULL, NULL, NULL, E'Vilter VMC 450 XL Series Oil Pump Assembly spare part - Efforts Engineers', E'/vilter/vmc-450-xl/oil-pump-assembly', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Vilter - Vilter VMC 450 XL Series - Shaft Seal', NULL, E'Vilter', E'Vilter VMC 450 XL Series', E'Shaft Seal', NULL, E'VIL-V450XL-SHS-01', E'VIL-V450XL-SHS-01.jpg', E'452 XL, 454 XL, 456 XL, 458 XL, 458, 4512 XL, 4516 XL', NULL, E'To Shoot', NULL, NULL, NULL, E'Vilter VMC 450 XL Series Shaft Seal spare part - Efforts Engineers', E'/vilter/vmc-450-xl/shaft-seal', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Vilter - Vilter VMC 450 XL Series - Oil Filter and Strainer', NULL, E'Vilter', E'Vilter VMC 450 XL Series', E'Oil Filter and Strainer', NULL, E'VIL-V450XL-FLT-01', E'VIL-V450XL-FLT-01.jpg', E'452 XL, 454 XL, 456 XL, 458 XL, 458, 4512 XL, 4516 XL', NULL, E'To Shoot', NULL, NULL, NULL, E'Vilter VMC 450 XL Series Oil Filter and Strainer spare part - Efforts Engineers', E'/vilter/vmc-450-xl/oil-filter-and-strainer', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Vilter - Vilter VMC 450 XL Series - Unloader and Capacity Control', NULL, E'Vilter', E'Vilter VMC 450 XL Series', E'Unloader and Capacity Control', NULL, E'VIL-V450XL-ULD-01', E'VIL-V450XL-ULD-01.jpg', E'452 XL, 454 XL, 456 XL, 458 XL, 458, 4512 XL, 4516 XL', NULL, E'To Shoot', NULL, NULL, NULL, E'Vilter VMC 450 XL Series Unloader and Capacity Control spare part - Efforts Engineers', E'/vilter/vmc-450-xl/unloader-and-capacity-control', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Vilter - Vilter VMC 450 XL Series - Safety Head and Relief Valve', NULL, E'Vilter', E'Vilter VMC 450 XL Series', E'Safety Head and Relief Valve', NULL, E'VIL-V450XL-SAF-01', E'VIL-V450XL-SAF-01.jpg', E'452 XL, 454 XL, 456 XL, 458 XL, 458, 4512 XL, 4516 XL', NULL, E'To Shoot', NULL, NULL, NULL, E'Vilter VMC 450 XL Series Safety Head and Relief Valve spare part - Efforts Engineers', E'/vilter/vmc-450-xl/safety-head-and-relief-valve', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Vilter - Vilter VMC 350ES Series - Cylinder Liner', NULL, E'Vilter', E'Vilter VMC 350ES Series', E'Cylinder Liner', NULL, E'VIL-V350ES-CLN-01', E'VIL-V350ES-CLN-01.jpg', E'VMC 350ES', NULL, E'To Shoot', NULL, NULL, NULL, E'Vilter VMC 350ES Series Cylinder Liner spare part - Efforts Engineers', E'/vilter/vmc-350es/cylinder-liner', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Vilter - Vilter VMC 350ES Series - Piston Assembly', NULL, E'Vilter', E'Vilter VMC 350ES Series', E'Piston Assembly', NULL, E'VIL-V350ES-PST-01', E'VIL-V350ES-PST-01.jpg', E'VMC 350ES', NULL, E'To Shoot', NULL, NULL, NULL, E'Vilter VMC 350ES Series Piston Assembly spare part - Efforts Engineers', E'/vilter/vmc-350es/piston-assembly', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Vilter - Vilter VMC 350ES Series - Piston Ring Set', NULL, E'Vilter', E'Vilter VMC 350ES Series', E'Piston Ring Set', NULL, E'VIL-V350ES-PRG-01', E'VIL-V350ES-PRG-01.jpg', E'VMC 350ES', NULL, E'To Shoot', NULL, NULL, NULL, E'Vilter VMC 350ES Series Piston Ring Set spare part - Efforts Engineers', E'/vilter/vmc-350es/piston-ring-set', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Vilter - Vilter VMC 350ES Series - Connecting Rod', NULL, E'Vilter', E'Vilter VMC 350ES Series', E'Connecting Rod', NULL, E'VIL-V350ES-CRD-01', E'VIL-V350ES-CRD-01.jpg', E'VMC 350ES', NULL, E'To Shoot', NULL, NULL, NULL, E'Vilter VMC 350ES Series Connecting Rod spare part - Efforts Engineers', E'/vilter/vmc-350es/connecting-rod', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Vilter - Vilter VMC 350ES Series - Crankshaft', NULL, E'Vilter', E'Vilter VMC 350ES Series', E'Crankshaft', NULL, E'VIL-V350ES-CRK-01', E'VIL-V350ES-CRK-01.jpg', E'VMC 350ES', NULL, E'To Shoot', NULL, NULL, NULL, E'Vilter VMC 350ES Series Crankshaft spare part - Efforts Engineers', E'/vilter/vmc-350es/crankshaft', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Vilter - Vilter VMC 350ES Series - Gudgeon Pin and Bush', NULL, E'Vilter', E'Vilter VMC 350ES Series', E'Gudgeon Pin and Bush', NULL, E'VIL-V350ES-PIN-01', E'VIL-V350ES-PIN-01.jpg', E'VMC 350ES', NULL, E'To Shoot', NULL, NULL, NULL, E'Vilter VMC 350ES Series Gudgeon Pin and Bush spare part - Efforts Engineers', E'/vilter/vmc-350es/gudgeon-pin-and-bush', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Vilter - Vilter VMC 350ES Series - Main Bearing and Bush', NULL, E'Vilter', E'Vilter VMC 350ES Series', E'Main Bearing and Bush', NULL, E'VIL-V350ES-BRG-01', E'VIL-V350ES-BRG-01.jpg', E'VMC 350ES', NULL, E'To Shoot', NULL, NULL, NULL, E'Vilter VMC 350ES Series Main Bearing and Bush spare part - Efforts Engineers', E'/vilter/vmc-350es/main-bearing-and-bush', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Vilter - Vilter VMC 350ES Series - Suction Valve Plate', NULL, E'Vilter', E'Vilter VMC 350ES Series', E'Suction Valve Plate', NULL, E'VIL-V350ES-SVP-01', E'VIL-V350ES-SVP-01.jpg', E'VMC 350ES', NULL, E'To Shoot', NULL, NULL, NULL, E'Vilter VMC 350ES Series Suction Valve Plate spare part - Efforts Engineers', E'/vilter/vmc-350es/suction-valve-plate', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Vilter - Vilter VMC 350ES Series - Discharge Valve Assembly', NULL, E'Vilter', E'Vilter VMC 350ES Series', E'Discharge Valve Assembly', NULL, E'VIL-V350ES-DVA-01', E'VIL-V350ES-DVA-01.jpg', E'VMC 350ES', NULL, E'To Shoot', NULL, NULL, NULL, E'Vilter VMC 350ES Series Discharge Valve Assembly spare part - Efforts Engineers', E'/vilter/vmc-350es/discharge-valve-assembly', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Vilter - Vilter VMC 350ES Series - Valve Spring and Cage', NULL, E'Vilter', E'Vilter VMC 350ES Series', E'Valve Spring and Cage', NULL, E'VIL-V350ES-VSP-01', E'VIL-V350ES-VSP-01.jpg', E'VMC 350ES', NULL, E'To Shoot', NULL, NULL, NULL, E'Vilter VMC 350ES Series Valve Spring and Cage spare part - Efforts Engineers', E'/vilter/vmc-350es/valve-spring-and-cage', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Vilter - Vilter VMC 350ES Series - Cylinder Head Cover', NULL, E'Vilter', E'Vilter VMC 350ES Series', E'Cylinder Head Cover', NULL, E'VIL-V350ES-HDC-01', E'VIL-V350ES-HDC-01.jpg', E'VMC 350ES', NULL, E'To Shoot', NULL, NULL, NULL, E'Vilter VMC 350ES Series Cylinder Head Cover spare part - Efforts Engineers', E'/vilter/vmc-350es/cylinder-head-cover', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Vilter - Vilter VMC 350ES Series - Gasket and Overhaul Kit', NULL, E'Vilter', E'Vilter VMC 350ES Series', E'Gasket and Overhaul Kit', NULL, E'VIL-V350ES-GSK-01', E'VIL-V350ES-GSK-01.jpg', E'VMC 350ES', NULL, E'To Shoot', NULL, NULL, NULL, E'Vilter VMC 350ES Series Gasket and Overhaul Kit spare part - Efforts Engineers', E'/vilter/vmc-350es/gasket-and-overhaul-kit', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Vilter - Vilter VMC 350ES Series - Oil Pump Assembly', NULL, E'Vilter', E'Vilter VMC 350ES Series', E'Oil Pump Assembly', NULL, E'VIL-V350ES-OPA-01', E'VIL-V350ES-OPA-01.jpg', E'VMC 350ES', NULL, E'To Shoot', NULL, NULL, NULL, E'Vilter VMC 350ES Series Oil Pump Assembly spare part - Efforts Engineers', E'/vilter/vmc-350es/oil-pump-assembly', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Vilter - Vilter VMC 350ES Series - Shaft Seal', NULL, E'Vilter', E'Vilter VMC 350ES Series', E'Shaft Seal', NULL, E'VIL-V350ES-SHS-01', E'VIL-V350ES-SHS-01.jpg', E'VMC 350ES', NULL, E'To Shoot', NULL, NULL, NULL, E'Vilter VMC 350ES Series Shaft Seal spare part - Efforts Engineers', E'/vilter/vmc-350es/shaft-seal', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Vilter - Vilter VMC 350ES Series - Oil Filter and Strainer', NULL, E'Vilter', E'Vilter VMC 350ES Series', E'Oil Filter and Strainer', NULL, E'VIL-V350ES-FLT-01', E'VIL-V350ES-FLT-01.jpg', E'VMC 350ES', NULL, E'To Shoot', NULL, NULL, NULL, E'Vilter VMC 350ES Series Oil Filter and Strainer spare part - Efforts Engineers', E'/vilter/vmc-350es/oil-filter-and-strainer', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Vilter - Vilter VMC 350ES Series - Unloader and Capacity Control', NULL, E'Vilter', E'Vilter VMC 350ES Series', E'Unloader and Capacity Control', NULL, E'VIL-V350ES-ULD-01', E'VIL-V350ES-ULD-01.jpg', E'VMC 350ES', NULL, E'To Shoot', NULL, NULL, NULL, E'Vilter VMC 350ES Series Unloader and Capacity Control spare part - Efforts Engineers', E'/vilter/vmc-350es/unloader-and-capacity-control', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Vilter - Vilter VMC 350ES Series - Safety Head and Relief Valve', NULL, E'Vilter', E'Vilter VMC 350ES Series', E'Safety Head and Relief Valve', NULL, E'VIL-V350ES-SAF-01', E'VIL-V350ES-SAF-01.jpg', E'VMC 350ES', NULL, E'To Shoot', NULL, NULL, NULL, E'Vilter VMC 350ES Series Safety Head and Relief Valve spare part - Efforts Engineers', E'/vilter/vmc-350es/safety-head-and-relief-valve', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom A Series - Cylinder Liner', NULL, E'Mycom', E'Mycom A Series', E'Cylinder Liner', NULL, E'MYC-A-CLN-01', E'MYC-A-CLN-01.jpg', E'N2A, N4A, N6A, N8A, N42A', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom A Series Cylinder Liner spare part - Efforts Engineers', E'/mycom/a-series/cylinder-liner', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom A Series - Piston Assembly', NULL, E'Mycom', E'Mycom A Series', E'Piston Assembly', NULL, E'MYC-A-PST-01', E'MYC-A-PST-01.jpg', E'N2A, N4A, N6A, N8A, N42A', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom A Series Piston Assembly spare part - Efforts Engineers', E'/mycom/a-series/piston-assembly', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom A Series - Piston Ring Set', NULL, E'Mycom', E'Mycom A Series', E'Piston Ring Set', NULL, E'MYC-A-PRG-01', E'MYC-A-PRG-01.jpg', E'N2A, N4A, N6A, N8A, N42A', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom A Series Piston Ring Set spare part - Efforts Engineers', E'/mycom/a-series/piston-ring-set', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom A Series - Connecting Rod', NULL, E'Mycom', E'Mycom A Series', E'Connecting Rod', NULL, E'MYC-A-CRD-01', E'MYC-A-CRD-01.jpg', E'N2A, N4A, N6A, N8A, N42A', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom A Series Connecting Rod spare part - Efforts Engineers', E'/mycom/a-series/connecting-rod', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom A Series - Crankshaft', NULL, E'Mycom', E'Mycom A Series', E'Crankshaft', NULL, E'MYC-A-CRK-01', E'MYC-A-CRK-01.jpg', E'N2A, N4A, N6A, N8A, N42A', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom A Series Crankshaft spare part - Efforts Engineers', E'/mycom/a-series/crankshaft', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom A Series - Gudgeon Pin and Bush', NULL, E'Mycom', E'Mycom A Series', E'Gudgeon Pin and Bush', NULL, E'MYC-A-PIN-01', E'MYC-A-PIN-01.jpg', E'N2A, N4A, N6A, N8A, N42A', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom A Series Gudgeon Pin and Bush spare part - Efforts Engineers', E'/mycom/a-series/gudgeon-pin-and-bush', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom A Series - Main Bearing and Bush', NULL, E'Mycom', E'Mycom A Series', E'Main Bearing and Bush', NULL, E'MYC-A-BRG-01', E'MYC-A-BRG-01.jpg', E'N2A, N4A, N6A, N8A, N42A', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom A Series Main Bearing and Bush spare part - Efforts Engineers', E'/mycom/a-series/main-bearing-and-bush', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom A Series - Suction Valve Plate', NULL, E'Mycom', E'Mycom A Series', E'Suction Valve Plate', NULL, E'MYC-A-SVP-01', E'MYC-A-SVP-01.jpg', E'N2A, N4A, N6A, N8A, N42A', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom A Series Suction Valve Plate spare part - Efforts Engineers', E'/mycom/a-series/suction-valve-plate', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom A Series - Discharge Valve Assembly', NULL, E'Mycom', E'Mycom A Series', E'Discharge Valve Assembly', NULL, E'MYC-A-DVA-01', E'MYC-A-DVA-01.jpg', E'N2A, N4A, N6A, N8A, N42A', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom A Series Discharge Valve Assembly spare part - Efforts Engineers', E'/mycom/a-series/discharge-valve-assembly', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom A Series - Valve Spring and Cage', NULL, E'Mycom', E'Mycom A Series', E'Valve Spring and Cage', NULL, E'MYC-A-VSP-01', E'MYC-A-VSP-01.jpg', E'N2A, N4A, N6A, N8A, N42A', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom A Series Valve Spring and Cage spare part - Efforts Engineers', E'/mycom/a-series/valve-spring-and-cage', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom A Series - Cylinder Head Cover', NULL, E'Mycom', E'Mycom A Series', E'Cylinder Head Cover', NULL, E'MYC-A-HDC-01', E'MYC-A-HDC-01.jpg', E'N2A, N4A, N6A, N8A, N42A', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom A Series Cylinder Head Cover spare part - Efforts Engineers', E'/mycom/a-series/cylinder-head-cover', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom A Series - Gasket and Overhaul Kit', NULL, E'Mycom', E'Mycom A Series', E'Gasket and Overhaul Kit', NULL, E'MYC-A-GSK-01', E'MYC-A-GSK-01.jpg', E'N2A, N4A, N6A, N8A, N42A', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom A Series Gasket and Overhaul Kit spare part - Efforts Engineers', E'/mycom/a-series/gasket-and-overhaul-kit', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom A Series - Oil Pump Assembly', NULL, E'Mycom', E'Mycom A Series', E'Oil Pump Assembly', NULL, E'MYC-A-OPA-01', E'MYC-A-OPA-01.jpg', E'N2A, N4A, N6A, N8A, N42A', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom A Series Oil Pump Assembly spare part - Efforts Engineers', E'/mycom/a-series/oil-pump-assembly', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom A Series - Shaft Seal', NULL, E'Mycom', E'Mycom A Series', E'Shaft Seal', NULL, E'MYC-A-SHS-01', E'MYC-A-SHS-01.jpg', E'N2A, N4A, N6A, N8A, N42A', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom A Series Shaft Seal spare part - Efforts Engineers', E'/mycom/a-series/shaft-seal', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom A Series - Oil Filter and Strainer', NULL, E'Mycom', E'Mycom A Series', E'Oil Filter and Strainer', NULL, E'MYC-A-FLT-01', E'MYC-A-FLT-01.jpg', E'N2A, N4A, N6A, N8A, N42A', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom A Series Oil Filter and Strainer spare part - Efforts Engineers', E'/mycom/a-series/oil-filter-and-strainer', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom A Series - Unloader and Capacity Control', NULL, E'Mycom', E'Mycom A Series', E'Unloader and Capacity Control', NULL, E'MYC-A-ULD-01', E'MYC-A-ULD-01.jpg', E'N2A, N4A, N6A, N8A, N42A', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom A Series Unloader and Capacity Control spare part - Efforts Engineers', E'/mycom/a-series/unloader-and-capacity-control', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom A Series - Safety Head and Relief Valve', NULL, E'Mycom', E'Mycom A Series', E'Safety Head and Relief Valve', NULL, E'MYC-A-SAF-01', E'MYC-A-SAF-01.jpg', E'N2A, N4A, N6A, N8A, N42A', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom A Series Safety Head and Relief Valve spare part - Efforts Engineers', E'/mycom/a-series/safety-head-and-relief-valve', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom B Series - Cylinder Liner', NULL, E'Mycom', E'Mycom B Series', E'Cylinder Liner', NULL, E'MYC-B-CLN-01', E'MYC-B-CLN-01.jpg', E'N4B, N6B, N12B, N8B', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom B Series Cylinder Liner spare part - Efforts Engineers', E'/mycom/b-series/cylinder-liner', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom B Series - Piston Assembly', NULL, E'Mycom', E'Mycom B Series', E'Piston Assembly', NULL, E'MYC-B-PST-01', E'MYC-B-PST-01.jpg', E'N4B, N6B, N12B, N8B', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom B Series Piston Assembly spare part - Efforts Engineers', E'/mycom/b-series/piston-assembly', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom B Series - Piston Ring Set', NULL, E'Mycom', E'Mycom B Series', E'Piston Ring Set', NULL, E'MYC-B-PRG-01', E'MYC-B-PRG-01.jpg', E'N4B, N6B, N12B, N8B', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom B Series Piston Ring Set spare part - Efforts Engineers', E'/mycom/b-series/piston-ring-set', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom B Series - Connecting Rod', NULL, E'Mycom', E'Mycom B Series', E'Connecting Rod', NULL, E'MYC-B-CRD-01', E'MYC-B-CRD-01.jpg', E'N4B, N6B, N12B, N8B', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom B Series Connecting Rod spare part - Efforts Engineers', E'/mycom/b-series/connecting-rod', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom B Series - Crankshaft', NULL, E'Mycom', E'Mycom B Series', E'Crankshaft', NULL, E'MYC-B-CRK-01', E'MYC-B-CRK-01.jpg', E'N4B, N6B, N12B, N8B', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom B Series Crankshaft spare part - Efforts Engineers', E'/mycom/b-series/crankshaft', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom B Series - Gudgeon Pin and Bush', NULL, E'Mycom', E'Mycom B Series', E'Gudgeon Pin and Bush', NULL, E'MYC-B-PIN-01', E'MYC-B-PIN-01.jpg', E'N4B, N6B, N12B, N8B', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom B Series Gudgeon Pin and Bush spare part - Efforts Engineers', E'/mycom/b-series/gudgeon-pin-and-bush', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom B Series - Main Bearing and Bush', NULL, E'Mycom', E'Mycom B Series', E'Main Bearing and Bush', NULL, E'MYC-B-BRG-01', E'MYC-B-BRG-01.jpg', E'N4B, N6B, N12B, N8B', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom B Series Main Bearing and Bush spare part - Efforts Engineers', E'/mycom/b-series/main-bearing-and-bush', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom B Series - Suction Valve Plate', NULL, E'Mycom', E'Mycom B Series', E'Suction Valve Plate', NULL, E'MYC-B-SVP-01', E'MYC-B-SVP-01.jpg', E'N4B, N6B, N12B, N8B', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom B Series Suction Valve Plate spare part - Efforts Engineers', E'/mycom/b-series/suction-valve-plate', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom B Series - Discharge Valve Assembly', NULL, E'Mycom', E'Mycom B Series', E'Discharge Valve Assembly', NULL, E'MYC-B-DVA-01', E'MYC-B-DVA-01.jpg', E'N4B, N6B, N12B, N8B', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom B Series Discharge Valve Assembly spare part - Efforts Engineers', E'/mycom/b-series/discharge-valve-assembly', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom B Series - Valve Spring and Cage', NULL, E'Mycom', E'Mycom B Series', E'Valve Spring and Cage', NULL, E'MYC-B-VSP-01', E'MYC-B-VSP-01.jpg', E'N4B, N6B, N12B, N8B', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom B Series Valve Spring and Cage spare part - Efforts Engineers', E'/mycom/b-series/valve-spring-and-cage', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom B Series - Cylinder Head Cover', NULL, E'Mycom', E'Mycom B Series', E'Cylinder Head Cover', NULL, E'MYC-B-HDC-01', E'MYC-B-HDC-01.jpg', E'N4B, N6B, N12B, N8B', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom B Series Cylinder Head Cover spare part - Efforts Engineers', E'/mycom/b-series/cylinder-head-cover', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom B Series - Gasket and Overhaul Kit', NULL, E'Mycom', E'Mycom B Series', E'Gasket and Overhaul Kit', NULL, E'MYC-B-GSK-01', E'MYC-B-GSK-01.jpg', E'N4B, N6B, N12B, N8B', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom B Series Gasket and Overhaul Kit spare part - Efforts Engineers', E'/mycom/b-series/gasket-and-overhaul-kit', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom B Series - Oil Pump Assembly', NULL, E'Mycom', E'Mycom B Series', E'Oil Pump Assembly', NULL, E'MYC-B-OPA-01', E'MYC-B-OPA-01.jpg', E'N4B, N6B, N12B, N8B', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom B Series Oil Pump Assembly spare part - Efforts Engineers', E'/mycom/b-series/oil-pump-assembly', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom B Series - Shaft Seal', NULL, E'Mycom', E'Mycom B Series', E'Shaft Seal', NULL, E'MYC-B-SHS-01', E'MYC-B-SHS-01.jpg', E'N4B, N6B, N12B, N8B', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom B Series Shaft Seal spare part - Efforts Engineers', E'/mycom/b-series/shaft-seal', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom B Series - Oil Filter and Strainer', NULL, E'Mycom', E'Mycom B Series', E'Oil Filter and Strainer', NULL, E'MYC-B-FLT-01', E'MYC-B-FLT-01.jpg', E'N4B, N6B, N12B, N8B', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom B Series Oil Filter and Strainer spare part - Efforts Engineers', E'/mycom/b-series/oil-filter-and-strainer', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom B Series - Unloader and Capacity Control', NULL, E'Mycom', E'Mycom B Series', E'Unloader and Capacity Control', NULL, E'MYC-B-ULD-01', E'MYC-B-ULD-01.jpg', E'N4B, N6B, N12B, N8B', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom B Series Unloader and Capacity Control spare part - Efforts Engineers', E'/mycom/b-series/unloader-and-capacity-control', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom B Series - Safety Head and Relief Valve', NULL, E'Mycom', E'Mycom B Series', E'Safety Head and Relief Valve', NULL, E'MYC-B-SAF-01', E'MYC-B-SAF-01.jpg', E'N4B, N6B, N12B, N8B', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom B Series Safety Head and Relief Valve spare part - Efforts Engineers', E'/mycom/b-series/safety-head-and-relief-valve', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom WA Series - Cylinder Liner', NULL, E'Mycom', E'Mycom WA Series', E'Cylinder Liner', NULL, E'MYC-WA-CLN-01', E'MYC-WA-CLN-01.jpg', E'2WA, 4WA, 6WA, 8WA, 42WA, 62WA', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom WA Series Cylinder Liner spare part - Efforts Engineers', E'/mycom/wa-series/cylinder-liner', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom WA Series - Piston Assembly', NULL, E'Mycom', E'Mycom WA Series', E'Piston Assembly', NULL, E'MYC-WA-PST-01', E'MYC-WA-PST-01.jpg', E'2WA, 4WA, 6WA, 8WA, 42WA, 62WA', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom WA Series Piston Assembly spare part - Efforts Engineers', E'/mycom/wa-series/piston-assembly', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom WA Series - Piston Ring Set', NULL, E'Mycom', E'Mycom WA Series', E'Piston Ring Set', NULL, E'MYC-WA-PRG-01', E'MYC-WA-PRG-01.jpg', E'2WA, 4WA, 6WA, 8WA, 42WA, 62WA', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom WA Series Piston Ring Set spare part - Efforts Engineers', E'/mycom/wa-series/piston-ring-set', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom WA Series - Connecting Rod', NULL, E'Mycom', E'Mycom WA Series', E'Connecting Rod', NULL, E'MYC-WA-CRD-01', E'MYC-WA-CRD-01.jpg', E'2WA, 4WA, 6WA, 8WA, 42WA, 62WA', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom WA Series Connecting Rod spare part - Efforts Engineers', E'/mycom/wa-series/connecting-rod', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom WA Series - Crankshaft', NULL, E'Mycom', E'Mycom WA Series', E'Crankshaft', NULL, E'MYC-WA-CRK-01', E'MYC-WA-CRK-01.jpg', E'2WA, 4WA, 6WA, 8WA, 42WA, 62WA', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom WA Series Crankshaft spare part - Efforts Engineers', E'/mycom/wa-series/crankshaft', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom WA Series - Gudgeon Pin and Bush', NULL, E'Mycom', E'Mycom WA Series', E'Gudgeon Pin and Bush', NULL, E'MYC-WA-PIN-01', E'MYC-WA-PIN-01.jpg', E'2WA, 4WA, 6WA, 8WA, 42WA, 62WA', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom WA Series Gudgeon Pin and Bush spare part - Efforts Engineers', E'/mycom/wa-series/gudgeon-pin-and-bush', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom WA Series - Main Bearing and Bush', NULL, E'Mycom', E'Mycom WA Series', E'Main Bearing and Bush', NULL, E'MYC-WA-BRG-01', E'MYC-WA-BRG-01.jpg', E'2WA, 4WA, 6WA, 8WA, 42WA, 62WA', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom WA Series Main Bearing and Bush spare part - Efforts Engineers', E'/mycom/wa-series/main-bearing-and-bush', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom WA Series - Suction Valve Plate', NULL, E'Mycom', E'Mycom WA Series', E'Suction Valve Plate', NULL, E'MYC-WA-SVP-01', E'MYC-WA-SVP-01.jpg', E'2WA, 4WA, 6WA, 8WA, 42WA, 62WA', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom WA Series Suction Valve Plate spare part - Efforts Engineers', E'/mycom/wa-series/suction-valve-plate', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom WA Series - Discharge Valve Assembly', NULL, E'Mycom', E'Mycom WA Series', E'Discharge Valve Assembly', NULL, E'MYC-WA-DVA-01', E'MYC-WA-DVA-01.jpg', E'2WA, 4WA, 6WA, 8WA, 42WA, 62WA', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom WA Series Discharge Valve Assembly spare part - Efforts Engineers', E'/mycom/wa-series/discharge-valve-assembly', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom WA Series - Valve Spring and Cage', NULL, E'Mycom', E'Mycom WA Series', E'Valve Spring and Cage', NULL, E'MYC-WA-VSP-01', E'MYC-WA-VSP-01.jpg', E'2WA, 4WA, 6WA, 8WA, 42WA, 62WA', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom WA Series Valve Spring and Cage spare part - Efforts Engineers', E'/mycom/wa-series/valve-spring-and-cage', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom WA Series - Cylinder Head Cover', NULL, E'Mycom', E'Mycom WA Series', E'Cylinder Head Cover', NULL, E'MYC-WA-HDC-01', E'MYC-WA-HDC-01.jpg', E'2WA, 4WA, 6WA, 8WA, 42WA, 62WA', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom WA Series Cylinder Head Cover spare part - Efforts Engineers', E'/mycom/wa-series/cylinder-head-cover', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom WA Series - Gasket and Overhaul Kit', NULL, E'Mycom', E'Mycom WA Series', E'Gasket and Overhaul Kit', NULL, E'MYC-WA-GSK-01', E'MYC-WA-GSK-01.jpg', E'2WA, 4WA, 6WA, 8WA, 42WA, 62WA', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom WA Series Gasket and Overhaul Kit spare part - Efforts Engineers', E'/mycom/wa-series/gasket-and-overhaul-kit', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom WA Series - Oil Pump Assembly', NULL, E'Mycom', E'Mycom WA Series', E'Oil Pump Assembly', NULL, E'MYC-WA-OPA-01', E'MYC-WA-OPA-01.jpg', E'2WA, 4WA, 6WA, 8WA, 42WA, 62WA', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom WA Series Oil Pump Assembly spare part - Efforts Engineers', E'/mycom/wa-series/oil-pump-assembly', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom WA Series - Shaft Seal', NULL, E'Mycom', E'Mycom WA Series', E'Shaft Seal', NULL, E'MYC-WA-SHS-01', E'MYC-WA-SHS-01.jpg', E'2WA, 4WA, 6WA, 8WA, 42WA, 62WA', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom WA Series Shaft Seal spare part - Efforts Engineers', E'/mycom/wa-series/shaft-seal', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom WA Series - Oil Filter and Strainer', NULL, E'Mycom', E'Mycom WA Series', E'Oil Filter and Strainer', NULL, E'MYC-WA-FLT-01', E'MYC-WA-FLT-01.jpg', E'2WA, 4WA, 6WA, 8WA, 42WA, 62WA', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom WA Series Oil Filter and Strainer spare part - Efforts Engineers', E'/mycom/wa-series/oil-filter-and-strainer', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom WA Series - Unloader and Capacity Control', NULL, E'Mycom', E'Mycom WA Series', E'Unloader and Capacity Control', NULL, E'MYC-WA-ULD-01', E'MYC-WA-ULD-01.jpg', E'2WA, 4WA, 6WA, 8WA, 42WA, 62WA', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom WA Series Unloader and Capacity Control spare part - Efforts Engineers', E'/mycom/wa-series/unloader-and-capacity-control', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom WA Series - Safety Head and Relief Valve', NULL, E'Mycom', E'Mycom WA Series', E'Safety Head and Relief Valve', NULL, E'MYC-WA-SAF-01', E'MYC-WA-SAF-01.jpg', E'2WA, 4WA, 6WA, 8WA, 42WA, 62WA', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom WA Series Safety Head and Relief Valve spare part - Efforts Engineers', E'/mycom/wa-series/safety-head-and-relief-valve', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom WB Series - Cylinder Liner', NULL, E'Mycom', E'Mycom WB Series', E'Cylinder Liner', NULL, E'MYC-WB-CLN-01', E'MYC-WB-CLN-01.jpg', E'4WB, 6WB, 8WB, 12WB, 42WB, 62WB', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom WB Series Cylinder Liner spare part - Efforts Engineers', E'/mycom/wb-series/cylinder-liner', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom WB Series - Piston Assembly', NULL, E'Mycom', E'Mycom WB Series', E'Piston Assembly', NULL, E'MYC-WB-PST-01', E'MYC-WB-PST-01.jpg', E'4WB, 6WB, 8WB, 12WB, 42WB, 62WB', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom WB Series Piston Assembly spare part - Efforts Engineers', E'/mycom/wb-series/piston-assembly', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom WB Series - Piston Ring Set', NULL, E'Mycom', E'Mycom WB Series', E'Piston Ring Set', NULL, E'MYC-WB-PRG-01', E'MYC-WB-PRG-01.jpg', E'4WB, 6WB, 8WB, 12WB, 42WB, 62WB', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom WB Series Piston Ring Set spare part - Efforts Engineers', E'/mycom/wb-series/piston-ring-set', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom WB Series - Connecting Rod', NULL, E'Mycom', E'Mycom WB Series', E'Connecting Rod', NULL, E'MYC-WB-CRD-01', E'MYC-WB-CRD-01.jpg', E'4WB, 6WB, 8WB, 12WB, 42WB, 62WB', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom WB Series Connecting Rod spare part - Efforts Engineers', E'/mycom/wb-series/connecting-rod', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom WB Series - Crankshaft', NULL, E'Mycom', E'Mycom WB Series', E'Crankshaft', NULL, E'MYC-WB-CRK-01', E'MYC-WB-CRK-01.jpg', E'4WB, 6WB, 8WB, 12WB, 42WB, 62WB', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom WB Series Crankshaft spare part - Efforts Engineers', E'/mycom/wb-series/crankshaft', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom WB Series - Gudgeon Pin and Bush', NULL, E'Mycom', E'Mycom WB Series', E'Gudgeon Pin and Bush', NULL, E'MYC-WB-PIN-01', E'MYC-WB-PIN-01.jpg', E'4WB, 6WB, 8WB, 12WB, 42WB, 62WB', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom WB Series Gudgeon Pin and Bush spare part - Efforts Engineers', E'/mycom/wb-series/gudgeon-pin-and-bush', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom WB Series - Main Bearing and Bush', NULL, E'Mycom', E'Mycom WB Series', E'Main Bearing and Bush', NULL, E'MYC-WB-BRG-01', E'MYC-WB-BRG-01.jpg', E'4WB, 6WB, 8WB, 12WB, 42WB, 62WB', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom WB Series Main Bearing and Bush spare part - Efforts Engineers', E'/mycom/wb-series/main-bearing-and-bush', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom WB Series - Suction Valve Plate', NULL, E'Mycom', E'Mycom WB Series', E'Suction Valve Plate', NULL, E'MYC-WB-SVP-01', E'MYC-WB-SVP-01.jpg', E'4WB, 6WB, 8WB, 12WB, 42WB, 62WB', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom WB Series Suction Valve Plate spare part - Efforts Engineers', E'/mycom/wb-series/suction-valve-plate', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom WB Series - Discharge Valve Assembly', NULL, E'Mycom', E'Mycom WB Series', E'Discharge Valve Assembly', NULL, E'MYC-WB-DVA-01', E'MYC-WB-DVA-01.jpg', E'4WB, 6WB, 8WB, 12WB, 42WB, 62WB', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom WB Series Discharge Valve Assembly spare part - Efforts Engineers', E'/mycom/wb-series/discharge-valve-assembly', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom WB Series - Valve Spring and Cage', NULL, E'Mycom', E'Mycom WB Series', E'Valve Spring and Cage', NULL, E'MYC-WB-VSP-01', E'MYC-WB-VSP-01.jpg', E'4WB, 6WB, 8WB, 12WB, 42WB, 62WB', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom WB Series Valve Spring and Cage spare part - Efforts Engineers', E'/mycom/wb-series/valve-spring-and-cage', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom WB Series - Cylinder Head Cover', NULL, E'Mycom', E'Mycom WB Series', E'Cylinder Head Cover', NULL, E'MYC-WB-HDC-01', E'MYC-WB-HDC-01.jpg', E'4WB, 6WB, 8WB, 12WB, 42WB, 62WB', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom WB Series Cylinder Head Cover spare part - Efforts Engineers', E'/mycom/wb-series/cylinder-head-cover', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom WB Series - Gasket and Overhaul Kit', NULL, E'Mycom', E'Mycom WB Series', E'Gasket and Overhaul Kit', NULL, E'MYC-WB-GSK-01', E'MYC-WB-GSK-01.jpg', E'4WB, 6WB, 8WB, 12WB, 42WB, 62WB', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom WB Series Gasket and Overhaul Kit spare part - Efforts Engineers', E'/mycom/wb-series/gasket-and-overhaul-kit', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom WB Series - Oil Pump Assembly', NULL, E'Mycom', E'Mycom WB Series', E'Oil Pump Assembly', NULL, E'MYC-WB-OPA-01', E'MYC-WB-OPA-01.jpg', E'4WB, 6WB, 8WB, 12WB, 42WB, 62WB', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom WB Series Oil Pump Assembly spare part - Efforts Engineers', E'/mycom/wb-series/oil-pump-assembly', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom WB Series - Shaft Seal', NULL, E'Mycom', E'Mycom WB Series', E'Shaft Seal', NULL, E'MYC-WB-SHS-01', E'MYC-WB-SHS-01.jpg', E'4WB, 6WB, 8WB, 12WB, 42WB, 62WB', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom WB Series Shaft Seal spare part - Efforts Engineers', E'/mycom/wb-series/shaft-seal', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom WB Series - Oil Filter and Strainer', NULL, E'Mycom', E'Mycom WB Series', E'Oil Filter and Strainer', NULL, E'MYC-WB-FLT-01', E'MYC-WB-FLT-01.jpg', E'4WB, 6WB, 8WB, 12WB, 42WB, 62WB', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom WB Series Oil Filter and Strainer spare part - Efforts Engineers', E'/mycom/wb-series/oil-filter-and-strainer', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom WB Series - Unloader and Capacity Control', NULL, E'Mycom', E'Mycom WB Series', E'Unloader and Capacity Control', NULL, E'MYC-WB-ULD-01', E'MYC-WB-ULD-01.jpg', E'4WB, 6WB, 8WB, 12WB, 42WB, 62WB', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom WB Series Unloader and Capacity Control spare part - Efforts Engineers', E'/mycom/wb-series/unloader-and-capacity-control', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom WB Series - Safety Head and Relief Valve', NULL, E'Mycom', E'Mycom WB Series', E'Safety Head and Relief Valve', NULL, E'MYC-WB-SAF-01', E'MYC-WB-SAF-01.jpg', E'4WB, 6WB, 8WB, 12WB, 42WB, 62WB', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom WB Series Safety Head and Relief Valve spare part - Efforts Engineers', E'/mycom/wb-series/safety-head-and-relief-valve', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom WBHE Series - Cylinder Liner', NULL, E'Mycom', E'Mycom WBHE Series', E'Cylinder Liner', NULL, E'MYC-WBHE-CLN-01', E'MYC-WBHE-CLN-01.jpg', E'4WBHE, 6WBHE, 8WBHE, 8WBHEH, 6WBHEU, 8WBHEU, 8WBHEHU, 42WBHE, 62WBHE', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom WBHE Series Cylinder Liner spare part - Efforts Engineers', E'/mycom/wbhe-series/cylinder-liner', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom WBHE Series - Piston Assembly', NULL, E'Mycom', E'Mycom WBHE Series', E'Piston Assembly', NULL, E'MYC-WBHE-PST-01', E'MYC-WBHE-PST-01.jpg', E'4WBHE, 6WBHE, 8WBHE, 8WBHEH, 6WBHEU, 8WBHEU, 8WBHEHU, 42WBHE, 62WBHE', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom WBHE Series Piston Assembly spare part - Efforts Engineers', E'/mycom/wbhe-series/piston-assembly', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom WBHE Series - Piston Ring Set', NULL, E'Mycom', E'Mycom WBHE Series', E'Piston Ring Set', NULL, E'MYC-WBHE-PRG-01', E'MYC-WBHE-PRG-01.jpg', E'4WBHE, 6WBHE, 8WBHE, 8WBHEH, 6WBHEU, 8WBHEU, 8WBHEHU, 42WBHE, 62WBHE', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom WBHE Series Piston Ring Set spare part - Efforts Engineers', E'/mycom/wbhe-series/piston-ring-set', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom WBHE Series - Connecting Rod', NULL, E'Mycom', E'Mycom WBHE Series', E'Connecting Rod', NULL, E'MYC-WBHE-CRD-01', E'MYC-WBHE-CRD-01.jpg', E'4WBHE, 6WBHE, 8WBHE, 8WBHEH, 6WBHEU, 8WBHEU, 8WBHEHU, 42WBHE, 62WBHE', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom WBHE Series Connecting Rod spare part - Efforts Engineers', E'/mycom/wbhe-series/connecting-rod', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom WBHE Series - Crankshaft', NULL, E'Mycom', E'Mycom WBHE Series', E'Crankshaft', NULL, E'MYC-WBHE-CRK-01', E'MYC-WBHE-CRK-01.jpg', E'4WBHE, 6WBHE, 8WBHE, 8WBHEH, 6WBHEU, 8WBHEU, 8WBHEHU, 42WBHE, 62WBHE', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom WBHE Series Crankshaft spare part - Efforts Engineers', E'/mycom/wbhe-series/crankshaft', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom WBHE Series - Gudgeon Pin and Bush', NULL, E'Mycom', E'Mycom WBHE Series', E'Gudgeon Pin and Bush', NULL, E'MYC-WBHE-PIN-01', E'MYC-WBHE-PIN-01.jpg', E'4WBHE, 6WBHE, 8WBHE, 8WBHEH, 6WBHEU, 8WBHEU, 8WBHEHU, 42WBHE, 62WBHE', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom WBHE Series Gudgeon Pin and Bush spare part - Efforts Engineers', E'/mycom/wbhe-series/gudgeon-pin-and-bush', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom WBHE Series - Main Bearing and Bush', NULL, E'Mycom', E'Mycom WBHE Series', E'Main Bearing and Bush', NULL, E'MYC-WBHE-BRG-01', E'MYC-WBHE-BRG-01.jpg', E'4WBHE, 6WBHE, 8WBHE, 8WBHEH, 6WBHEU, 8WBHEU, 8WBHEHU, 42WBHE, 62WBHE', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom WBHE Series Main Bearing and Bush spare part - Efforts Engineers', E'/mycom/wbhe-series/main-bearing-and-bush', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom WBHE Series - Suction Valve Plate', NULL, E'Mycom', E'Mycom WBHE Series', E'Suction Valve Plate', NULL, E'MYC-WBHE-SVP-01', E'MYC-WBHE-SVP-01.jpg', E'4WBHE, 6WBHE, 8WBHE, 8WBHEH, 6WBHEU, 8WBHEU, 8WBHEHU, 42WBHE, 62WBHE', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom WBHE Series Suction Valve Plate spare part - Efforts Engineers', E'/mycom/wbhe-series/suction-valve-plate', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom WBHE Series - Discharge Valve Assembly', NULL, E'Mycom', E'Mycom WBHE Series', E'Discharge Valve Assembly', NULL, E'MYC-WBHE-DVA-01', E'MYC-WBHE-DVA-01.jpg', E'4WBHE, 6WBHE, 8WBHE, 8WBHEH, 6WBHEU, 8WBHEU, 8WBHEHU, 42WBHE, 62WBHE', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom WBHE Series Discharge Valve Assembly spare part - Efforts Engineers', E'/mycom/wbhe-series/discharge-valve-assembly', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom WBHE Series - Valve Spring and Cage', NULL, E'Mycom', E'Mycom WBHE Series', E'Valve Spring and Cage', NULL, E'MYC-WBHE-VSP-01', E'MYC-WBHE-VSP-01.jpg', E'4WBHE, 6WBHE, 8WBHE, 8WBHEH, 6WBHEU, 8WBHEU, 8WBHEHU, 42WBHE, 62WBHE', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom WBHE Series Valve Spring and Cage spare part - Efforts Engineers', E'/mycom/wbhe-series/valve-spring-and-cage', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom WBHE Series - Cylinder Head Cover', NULL, E'Mycom', E'Mycom WBHE Series', E'Cylinder Head Cover', NULL, E'MYC-WBHE-HDC-01', E'MYC-WBHE-HDC-01.jpg', E'4WBHE, 6WBHE, 8WBHE, 8WBHEH, 6WBHEU, 8WBHEU, 8WBHEHU, 42WBHE, 62WBHE', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom WBHE Series Cylinder Head Cover spare part - Efforts Engineers', E'/mycom/wbhe-series/cylinder-head-cover', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom WBHE Series - Gasket and Overhaul Kit', NULL, E'Mycom', E'Mycom WBHE Series', E'Gasket and Overhaul Kit', NULL, E'MYC-WBHE-GSK-01', E'MYC-WBHE-GSK-01.jpg', E'4WBHE, 6WBHE, 8WBHE, 8WBHEH, 6WBHEU, 8WBHEU, 8WBHEHU, 42WBHE, 62WBHE', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom WBHE Series Gasket and Overhaul Kit spare part - Efforts Engineers', E'/mycom/wbhe-series/gasket-and-overhaul-kit', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom WBHE Series - Oil Pump Assembly', NULL, E'Mycom', E'Mycom WBHE Series', E'Oil Pump Assembly', NULL, E'MYC-WBHE-OPA-01', E'MYC-WBHE-OPA-01.jpg', E'4WBHE, 6WBHE, 8WBHE, 8WBHEH, 6WBHEU, 8WBHEU, 8WBHEHU, 42WBHE, 62WBHE', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom WBHE Series Oil Pump Assembly spare part - Efforts Engineers', E'/mycom/wbhe-series/oil-pump-assembly', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom WBHE Series - Shaft Seal', NULL, E'Mycom', E'Mycom WBHE Series', E'Shaft Seal', NULL, E'MYC-WBHE-SHS-01', E'MYC-WBHE-SHS-01.jpg', E'4WBHE, 6WBHE, 8WBHE, 8WBHEH, 6WBHEU, 8WBHEU, 8WBHEHU, 42WBHE, 62WBHE', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom WBHE Series Shaft Seal spare part - Efforts Engineers', E'/mycom/wbhe-series/shaft-seal', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom WBHE Series - Oil Filter and Strainer', NULL, E'Mycom', E'Mycom WBHE Series', E'Oil Filter and Strainer', NULL, E'MYC-WBHE-FLT-01', E'MYC-WBHE-FLT-01.jpg', E'4WBHE, 6WBHE, 8WBHE, 8WBHEH, 6WBHEU, 8WBHEU, 8WBHEHU, 42WBHE, 62WBHE', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom WBHE Series Oil Filter and Strainer spare part - Efforts Engineers', E'/mycom/wbhe-series/oil-filter-and-strainer', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom WBHE Series - Unloader and Capacity Control', NULL, E'Mycom', E'Mycom WBHE Series', E'Unloader and Capacity Control', NULL, E'MYC-WBHE-ULD-01', E'MYC-WBHE-ULD-01.jpg', E'4WBHE, 6WBHE, 8WBHE, 8WBHEH, 6WBHEU, 8WBHEU, 8WBHEHU, 42WBHE, 62WBHE', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom WBHE Series Unloader and Capacity Control spare part - Efforts Engineers', E'/mycom/wbhe-series/unloader-and-capacity-control', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom WBHE Series - Safety Head and Relief Valve', NULL, E'Mycom', E'Mycom WBHE Series', E'Safety Head and Relief Valve', NULL, E'MYC-WBHE-SAF-01', E'MYC-WBHE-SAF-01.jpg', E'4WBHE, 6WBHE, 8WBHE, 8WBHEH, 6WBHEU, 8WBHEU, 8WBHEHU, 42WBHE, 62WBHE', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom WBHE Series Safety Head and Relief Valve spare part - Efforts Engineers', E'/mycom/wbhe-series/safety-head-and-relief-valve', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom L Series - Cylinder Liner', NULL, E'Mycom', E'Mycom L Series', E'Cylinder Liner', NULL, E'MYC-L-CLN-01', E'MYC-L-CLN-01.jpg', E'4L, 6L, 8L', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom L Series Cylinder Liner spare part - Efforts Engineers', E'/mycom/l-series/cylinder-liner', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom L Series - Piston Assembly', NULL, E'Mycom', E'Mycom L Series', E'Piston Assembly', NULL, E'MYC-L-PST-01', E'MYC-L-PST-01.jpg', E'4L, 6L, 8L', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom L Series Piston Assembly spare part - Efforts Engineers', E'/mycom/l-series/piston-assembly', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom L Series - Piston Ring Set', NULL, E'Mycom', E'Mycom L Series', E'Piston Ring Set', NULL, E'MYC-L-PRG-01', E'MYC-L-PRG-01.jpg', E'4L, 6L, 8L', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom L Series Piston Ring Set spare part - Efforts Engineers', E'/mycom/l-series/piston-ring-set', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom L Series - Connecting Rod', NULL, E'Mycom', E'Mycom L Series', E'Connecting Rod', NULL, E'MYC-L-CRD-01', E'MYC-L-CRD-01.jpg', E'4L, 6L, 8L', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom L Series Connecting Rod spare part - Efforts Engineers', E'/mycom/l-series/connecting-rod', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom L Series - Crankshaft', NULL, E'Mycom', E'Mycom L Series', E'Crankshaft', NULL, E'MYC-L-CRK-01', E'MYC-L-CRK-01.jpg', E'4L, 6L, 8L', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom L Series Crankshaft spare part - Efforts Engineers', E'/mycom/l-series/crankshaft', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom L Series - Gudgeon Pin and Bush', NULL, E'Mycom', E'Mycom L Series', E'Gudgeon Pin and Bush', NULL, E'MYC-L-PIN-01', E'MYC-L-PIN-01.jpg', E'4L, 6L, 8L', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom L Series Gudgeon Pin and Bush spare part - Efforts Engineers', E'/mycom/l-series/gudgeon-pin-and-bush', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom L Series - Main Bearing and Bush', NULL, E'Mycom', E'Mycom L Series', E'Main Bearing and Bush', NULL, E'MYC-L-BRG-01', E'MYC-L-BRG-01.jpg', E'4L, 6L, 8L', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom L Series Main Bearing and Bush spare part - Efforts Engineers', E'/mycom/l-series/main-bearing-and-bush', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom L Series - Suction Valve Plate', NULL, E'Mycom', E'Mycom L Series', E'Suction Valve Plate', NULL, E'MYC-L-SVP-01', E'MYC-L-SVP-01.jpg', E'4L, 6L, 8L', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom L Series Suction Valve Plate spare part - Efforts Engineers', E'/mycom/l-series/suction-valve-plate', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom L Series - Discharge Valve Assembly', NULL, E'Mycom', E'Mycom L Series', E'Discharge Valve Assembly', NULL, E'MYC-L-DVA-01', E'MYC-L-DVA-01.jpg', E'4L, 6L, 8L', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom L Series Discharge Valve Assembly spare part - Efforts Engineers', E'/mycom/l-series/discharge-valve-assembly', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom L Series - Valve Spring and Cage', NULL, E'Mycom', E'Mycom L Series', E'Valve Spring and Cage', NULL, E'MYC-L-VSP-01', E'MYC-L-VSP-01.jpg', E'4L, 6L, 8L', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom L Series Valve Spring and Cage spare part - Efforts Engineers', E'/mycom/l-series/valve-spring-and-cage', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom L Series - Cylinder Head Cover', NULL, E'Mycom', E'Mycom L Series', E'Cylinder Head Cover', NULL, E'MYC-L-HDC-01', E'MYC-L-HDC-01.jpg', E'4L, 6L, 8L', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom L Series Cylinder Head Cover spare part - Efforts Engineers', E'/mycom/l-series/cylinder-head-cover', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom L Series - Gasket and Overhaul Kit', NULL, E'Mycom', E'Mycom L Series', E'Gasket and Overhaul Kit', NULL, E'MYC-L-GSK-01', E'MYC-L-GSK-01.jpg', E'4L, 6L, 8L', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom L Series Gasket and Overhaul Kit spare part - Efforts Engineers', E'/mycom/l-series/gasket-and-overhaul-kit', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom L Series - Oil Pump Assembly', NULL, E'Mycom', E'Mycom L Series', E'Oil Pump Assembly', NULL, E'MYC-L-OPA-01', E'MYC-L-OPA-01.jpg', E'4L, 6L, 8L', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom L Series Oil Pump Assembly spare part - Efforts Engineers', E'/mycom/l-series/oil-pump-assembly', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom L Series - Shaft Seal', NULL, E'Mycom', E'Mycom L Series', E'Shaft Seal', NULL, E'MYC-L-SHS-01', E'MYC-L-SHS-01.jpg', E'4L, 6L, 8L', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom L Series Shaft Seal spare part - Efforts Engineers', E'/mycom/l-series/shaft-seal', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom L Series - Oil Filter and Strainer', NULL, E'Mycom', E'Mycom L Series', E'Oil Filter and Strainer', NULL, E'MYC-L-FLT-01', E'MYC-L-FLT-01.jpg', E'4L, 6L, 8L', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom L Series Oil Filter and Strainer spare part - Efforts Engineers', E'/mycom/l-series/oil-filter-and-strainer', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom L Series - Unloader and Capacity Control', NULL, E'Mycom', E'Mycom L Series', E'Unloader and Capacity Control', NULL, E'MYC-L-ULD-01', E'MYC-L-ULD-01.jpg', E'4L, 6L, 8L', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom L Series Unloader and Capacity Control spare part - Efforts Engineers', E'/mycom/l-series/unloader-and-capacity-control', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom L Series - Safety Head and Relief Valve', NULL, E'Mycom', E'Mycom L Series', E'Safety Head and Relief Valve', NULL, E'MYC-L-SAF-01', E'MYC-L-SAF-01.jpg', E'4L, 6L, 8L', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom L Series Safety Head and Relief Valve spare part - Efforts Engineers', E'/mycom/l-series/safety-head-and-relief-valve', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom M Series - Cylinder Liner', NULL, E'Mycom', E'Mycom M Series', E'Cylinder Liner', NULL, E'MYC-M-CLN-01', E'MYC-M-CLN-01.jpg', E'2M, 4M, 6M, 8M, 62M, 62M-FM', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom M Series Cylinder Liner spare part - Efforts Engineers', E'/mycom/m-series/cylinder-liner', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom M Series - Piston Assembly', NULL, E'Mycom', E'Mycom M Series', E'Piston Assembly', NULL, E'MYC-M-PST-01', E'MYC-M-PST-01.jpg', E'2M, 4M, 6M, 8M, 62M, 62M-FM', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom M Series Piston Assembly spare part - Efforts Engineers', E'/mycom/m-series/piston-assembly', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom M Series - Piston Ring Set', NULL, E'Mycom', E'Mycom M Series', E'Piston Ring Set', NULL, E'MYC-M-PRG-01', E'MYC-M-PRG-01.jpg', E'2M, 4M, 6M, 8M, 62M, 62M-FM', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom M Series Piston Ring Set spare part - Efforts Engineers', E'/mycom/m-series/piston-ring-set', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom M Series - Connecting Rod', NULL, E'Mycom', E'Mycom M Series', E'Connecting Rod', NULL, E'MYC-M-CRD-01', E'MYC-M-CRD-01.jpg', E'2M, 4M, 6M, 8M, 62M, 62M-FM', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom M Series Connecting Rod spare part - Efforts Engineers', E'/mycom/m-series/connecting-rod', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom M Series - Crankshaft', NULL, E'Mycom', E'Mycom M Series', E'Crankshaft', NULL, E'MYC-M-CRK-01', E'MYC-M-CRK-01.jpg', E'2M, 4M, 6M, 8M, 62M, 62M-FM', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom M Series Crankshaft spare part - Efforts Engineers', E'/mycom/m-series/crankshaft', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom M Series - Gudgeon Pin and Bush', NULL, E'Mycom', E'Mycom M Series', E'Gudgeon Pin and Bush', NULL, E'MYC-M-PIN-01', E'MYC-M-PIN-01.jpg', E'2M, 4M, 6M, 8M, 62M, 62M-FM', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom M Series Gudgeon Pin and Bush spare part - Efforts Engineers', E'/mycom/m-series/gudgeon-pin-and-bush', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom M Series - Main Bearing and Bush', NULL, E'Mycom', E'Mycom M Series', E'Main Bearing and Bush', NULL, E'MYC-M-BRG-01', E'MYC-M-BRG-01.jpg', E'2M, 4M, 6M, 8M, 62M, 62M-FM', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom M Series Main Bearing and Bush spare part - Efforts Engineers', E'/mycom/m-series/main-bearing-and-bush', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom M Series - Suction Valve Plate', NULL, E'Mycom', E'Mycom M Series', E'Suction Valve Plate', NULL, E'MYC-M-SVP-01', E'MYC-M-SVP-01.jpg', E'2M, 4M, 6M, 8M, 62M, 62M-FM', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom M Series Suction Valve Plate spare part - Efforts Engineers', E'/mycom/m-series/suction-valve-plate', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom M Series - Discharge Valve Assembly', NULL, E'Mycom', E'Mycom M Series', E'Discharge Valve Assembly', NULL, E'MYC-M-DVA-01', E'MYC-M-DVA-01.jpg', E'2M, 4M, 6M, 8M, 62M, 62M-FM', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom M Series Discharge Valve Assembly spare part - Efforts Engineers', E'/mycom/m-series/discharge-valve-assembly', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom M Series - Valve Spring and Cage', NULL, E'Mycom', E'Mycom M Series', E'Valve Spring and Cage', NULL, E'MYC-M-VSP-01', E'MYC-M-VSP-01.jpg', E'2M, 4M, 6M, 8M, 62M, 62M-FM', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom M Series Valve Spring and Cage spare part - Efforts Engineers', E'/mycom/m-series/valve-spring-and-cage', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom M Series - Cylinder Head Cover', NULL, E'Mycom', E'Mycom M Series', E'Cylinder Head Cover', NULL, E'MYC-M-HDC-01', E'MYC-M-HDC-01.jpg', E'2M, 4M, 6M, 8M, 62M, 62M-FM', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom M Series Cylinder Head Cover spare part - Efforts Engineers', E'/mycom/m-series/cylinder-head-cover', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom M Series - Gasket and Overhaul Kit', NULL, E'Mycom', E'Mycom M Series', E'Gasket and Overhaul Kit', NULL, E'MYC-M-GSK-01', E'MYC-M-GSK-01.jpg', E'2M, 4M, 6M, 8M, 62M, 62M-FM', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom M Series Gasket and Overhaul Kit spare part - Efforts Engineers', E'/mycom/m-series/gasket-and-overhaul-kit', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom M Series - Oil Pump Assembly', NULL, E'Mycom', E'Mycom M Series', E'Oil Pump Assembly', NULL, E'MYC-M-OPA-01', E'MYC-M-OPA-01.jpg', E'2M, 4M, 6M, 8M, 62M, 62M-FM', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom M Series Oil Pump Assembly spare part - Efforts Engineers', E'/mycom/m-series/oil-pump-assembly', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom M Series - Shaft Seal', NULL, E'Mycom', E'Mycom M Series', E'Shaft Seal', NULL, E'MYC-M-SHS-01', E'MYC-M-SHS-01.jpg', E'2M, 4M, 6M, 8M, 62M, 62M-FM', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom M Series Shaft Seal spare part - Efforts Engineers', E'/mycom/m-series/shaft-seal', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom M Series - Oil Filter and Strainer', NULL, E'Mycom', E'Mycom M Series', E'Oil Filter and Strainer', NULL, E'MYC-M-FLT-01', E'MYC-M-FLT-01.jpg', E'2M, 4M, 6M, 8M, 62M, 62M-FM', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom M Series Oil Filter and Strainer spare part - Efforts Engineers', E'/mycom/m-series/oil-filter-and-strainer', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom M Series - Unloader and Capacity Control', NULL, E'Mycom', E'Mycom M Series', E'Unloader and Capacity Control', NULL, E'MYC-M-ULD-01', E'MYC-M-ULD-01.jpg', E'2M, 4M, 6M, 8M, 62M, 62M-FM', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom M Series Unloader and Capacity Control spare part - Efforts Engineers', E'/mycom/m-series/unloader-and-capacity-control', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom M Series - Safety Head and Relief Valve', NULL, E'Mycom', E'Mycom M Series', E'Safety Head and Relief Valve', NULL, E'MYC-M-SAF-01', E'MYC-M-SAF-01.jpg', E'2M, 4M, 6M, 8M, 62M, 62M-FM', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom M Series Safety Head and Relief Valve spare part - Efforts Engineers', E'/mycom/m-series/safety-head-and-relief-valve', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom J Series - Cylinder Liner', NULL, E'Mycom', E'Mycom J Series', E'Cylinder Liner', NULL, E'MYC-J-CLN-01', E'MYC-J-CLN-01.jpg', E'6J2, J series (other sizes to add)', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom J Series Cylinder Liner spare part - Efforts Engineers', E'/mycom/j-series/cylinder-liner', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom J Series - Piston Assembly', NULL, E'Mycom', E'Mycom J Series', E'Piston Assembly', NULL, E'MYC-J-PST-01', E'MYC-J-PST-01.jpg', E'6J2, J series (other sizes to add)', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom J Series Piston Assembly spare part - Efforts Engineers', E'/mycom/j-series/piston-assembly', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom J Series - Piston Ring Set', NULL, E'Mycom', E'Mycom J Series', E'Piston Ring Set', NULL, E'MYC-J-PRG-01', E'MYC-J-PRG-01.jpg', E'6J2, J series (other sizes to add)', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom J Series Piston Ring Set spare part - Efforts Engineers', E'/mycom/j-series/piston-ring-set', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom J Series - Connecting Rod', NULL, E'Mycom', E'Mycom J Series', E'Connecting Rod', NULL, E'MYC-J-CRD-01', E'MYC-J-CRD-01.jpg', E'6J2, J series (other sizes to add)', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom J Series Connecting Rod spare part - Efforts Engineers', E'/mycom/j-series/connecting-rod', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom J Series - Crankshaft', NULL, E'Mycom', E'Mycom J Series', E'Crankshaft', NULL, E'MYC-J-CRK-01', E'MYC-J-CRK-01.jpg', E'6J2, J series (other sizes to add)', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom J Series Crankshaft spare part - Efforts Engineers', E'/mycom/j-series/crankshaft', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom J Series - Gudgeon Pin and Bush', NULL, E'Mycom', E'Mycom J Series', E'Gudgeon Pin and Bush', NULL, E'MYC-J-PIN-01', E'MYC-J-PIN-01.jpg', E'6J2, J series (other sizes to add)', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom J Series Gudgeon Pin and Bush spare part - Efforts Engineers', E'/mycom/j-series/gudgeon-pin-and-bush', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom J Series - Main Bearing and Bush', NULL, E'Mycom', E'Mycom J Series', E'Main Bearing and Bush', NULL, E'MYC-J-BRG-01', E'MYC-J-BRG-01.jpg', E'6J2, J series (other sizes to add)', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom J Series Main Bearing and Bush spare part - Efforts Engineers', E'/mycom/j-series/main-bearing-and-bush', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom J Series - Suction Valve Plate', NULL, E'Mycom', E'Mycom J Series', E'Suction Valve Plate', NULL, E'MYC-J-SVP-01', E'MYC-J-SVP-01.jpg', E'6J2, J series (other sizes to add)', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom J Series Suction Valve Plate spare part - Efforts Engineers', E'/mycom/j-series/suction-valve-plate', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom J Series - Discharge Valve Assembly', NULL, E'Mycom', E'Mycom J Series', E'Discharge Valve Assembly', NULL, E'MYC-J-DVA-01', E'MYC-J-DVA-01.jpg', E'6J2, J series (other sizes to add)', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom J Series Discharge Valve Assembly spare part - Efforts Engineers', E'/mycom/j-series/discharge-valve-assembly', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom J Series - Valve Spring and Cage', NULL, E'Mycom', E'Mycom J Series', E'Valve Spring and Cage', NULL, E'MYC-J-VSP-01', E'MYC-J-VSP-01.jpg', E'6J2, J series (other sizes to add)', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom J Series Valve Spring and Cage spare part - Efforts Engineers', E'/mycom/j-series/valve-spring-and-cage', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom J Series - Cylinder Head Cover', NULL, E'Mycom', E'Mycom J Series', E'Cylinder Head Cover', NULL, E'MYC-J-HDC-01', E'MYC-J-HDC-01.jpg', E'6J2, J series (other sizes to add)', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom J Series Cylinder Head Cover spare part - Efforts Engineers', E'/mycom/j-series/cylinder-head-cover', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom J Series - Gasket and Overhaul Kit', NULL, E'Mycom', E'Mycom J Series', E'Gasket and Overhaul Kit', NULL, E'MYC-J-GSK-01', E'MYC-J-GSK-01.jpg', E'6J2, J series (other sizes to add)', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom J Series Gasket and Overhaul Kit spare part - Efforts Engineers', E'/mycom/j-series/gasket-and-overhaul-kit', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom J Series - Oil Pump Assembly', NULL, E'Mycom', E'Mycom J Series', E'Oil Pump Assembly', NULL, E'MYC-J-OPA-01', E'MYC-J-OPA-01.jpg', E'6J2, J series (other sizes to add)', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom J Series Oil Pump Assembly spare part - Efforts Engineers', E'/mycom/j-series/oil-pump-assembly', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom J Series - Shaft Seal', NULL, E'Mycom', E'Mycom J Series', E'Shaft Seal', NULL, E'MYC-J-SHS-01', E'MYC-J-SHS-01.jpg', E'6J2, J series (other sizes to add)', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom J Series Shaft Seal spare part - Efforts Engineers', E'/mycom/j-series/shaft-seal', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom J Series - Oil Filter and Strainer', NULL, E'Mycom', E'Mycom J Series', E'Oil Filter and Strainer', NULL, E'MYC-J-FLT-01', E'MYC-J-FLT-01.jpg', E'6J2, J series (other sizes to add)', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom J Series Oil Filter and Strainer spare part - Efforts Engineers', E'/mycom/j-series/oil-filter-and-strainer', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom J Series - Unloader and Capacity Control', NULL, E'Mycom', E'Mycom J Series', E'Unloader and Capacity Control', NULL, E'MYC-J-ULD-01', E'MYC-J-ULD-01.jpg', E'6J2, J series (other sizes to add)', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom J Series Unloader and Capacity Control spare part - Efforts Engineers', E'/mycom/j-series/unloader-and-capacity-control', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Mycom - Mycom J Series - Safety Head and Relief Valve', NULL, E'Mycom', E'Mycom J Series', E'Safety Head and Relief Valve', NULL, E'MYC-J-SAF-01', E'MYC-J-SAF-01.jpg', E'6J2, J series (other sizes to add)', NULL, E'To Shoot', NULL, NULL, NULL, E'Mycom J Series Safety Head and Relief Valve spare part - Efforts Engineers', E'/mycom/j-series/safety-head-and-relief-valve', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Carrier - Carrier 5H Series - Cylinder Liner', NULL, E'Carrier', E'Carrier 5H Series', E'Cylinder Liner', NULL, E'CAR-5H-CLN-01', E'CAR-5H-CLN-01.jpg', E'5H40, 5H46, 5H60, 5H66, 5H80, 5H86, 5H120, 5H126', NULL, E'To Shoot', NULL, NULL, NULL, E'Carrier 5H Series Cylinder Liner spare part - Efforts Engineers', E'/carrier/5h/cylinder-liner', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Carrier - Carrier 5H Series - Piston Assembly', NULL, E'Carrier', E'Carrier 5H Series', E'Piston Assembly', NULL, E'CAR-5H-PST-01', E'CAR-5H-PST-01.jpg', E'5H40, 5H46, 5H60, 5H66, 5H80, 5H86, 5H120, 5H126', NULL, E'To Shoot', NULL, NULL, NULL, E'Carrier 5H Series Piston Assembly spare part - Efforts Engineers', E'/carrier/5h/piston-assembly', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Carrier - Carrier 5H Series - Piston Ring Set', NULL, E'Carrier', E'Carrier 5H Series', E'Piston Ring Set', NULL, E'CAR-5H-PRG-01', E'CAR-5H-PRG-01.jpg', E'5H40, 5H46, 5H60, 5H66, 5H80, 5H86, 5H120, 5H126', NULL, E'To Shoot', NULL, NULL, NULL, E'Carrier 5H Series Piston Ring Set spare part - Efforts Engineers', E'/carrier/5h/piston-ring-set', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Carrier - Carrier 5H Series - Connecting Rod', NULL, E'Carrier', E'Carrier 5H Series', E'Connecting Rod', NULL, E'CAR-5H-CRD-01', E'CAR-5H-CRD-01.jpg', E'5H40, 5H46, 5H60, 5H66, 5H80, 5H86, 5H120, 5H126', NULL, E'To Shoot', NULL, NULL, NULL, E'Carrier 5H Series Connecting Rod spare part - Efforts Engineers', E'/carrier/5h/connecting-rod', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Carrier - Carrier 5H Series - Crankshaft', NULL, E'Carrier', E'Carrier 5H Series', E'Crankshaft', NULL, E'CAR-5H-CRK-01', E'CAR-5H-CRK-01.jpg', E'5H40, 5H46, 5H60, 5H66, 5H80, 5H86, 5H120, 5H126', NULL, E'To Shoot', NULL, NULL, NULL, E'Carrier 5H Series Crankshaft spare part - Efforts Engineers', E'/carrier/5h/crankshaft', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Carrier - Carrier 5H Series - Gudgeon Pin and Bush', NULL, E'Carrier', E'Carrier 5H Series', E'Gudgeon Pin and Bush', NULL, E'CAR-5H-PIN-01', E'CAR-5H-PIN-01.jpg', E'5H40, 5H46, 5H60, 5H66, 5H80, 5H86, 5H120, 5H126', NULL, E'To Shoot', NULL, NULL, NULL, E'Carrier 5H Series Gudgeon Pin and Bush spare part - Efforts Engineers', E'/carrier/5h/gudgeon-pin-and-bush', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Carrier - Carrier 5H Series - Main Bearing and Bush', NULL, E'Carrier', E'Carrier 5H Series', E'Main Bearing and Bush', NULL, E'CAR-5H-BRG-01', E'CAR-5H-BRG-01.jpg', E'5H40, 5H46, 5H60, 5H66, 5H80, 5H86, 5H120, 5H126', NULL, E'To Shoot', NULL, NULL, NULL, E'Carrier 5H Series Main Bearing and Bush spare part - Efforts Engineers', E'/carrier/5h/main-bearing-and-bush', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Carrier - Carrier 5H Series - Suction Valve Plate', NULL, E'Carrier', E'Carrier 5H Series', E'Suction Valve Plate', NULL, E'CAR-5H-SVP-01', E'CAR-5H-SVP-01.jpg', E'5H40, 5H46, 5H60, 5H66, 5H80, 5H86, 5H120, 5H126', NULL, E'To Shoot', NULL, NULL, NULL, E'Carrier 5H Series Suction Valve Plate spare part - Efforts Engineers', E'/carrier/5h/suction-valve-plate', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Carrier - Carrier 5H Series - Discharge Valve Assembly', NULL, E'Carrier', E'Carrier 5H Series', E'Discharge Valve Assembly', NULL, E'CAR-5H-DVA-01', E'CAR-5H-DVA-01.jpg', E'5H40, 5H46, 5H60, 5H66, 5H80, 5H86, 5H120, 5H126', NULL, E'To Shoot', NULL, NULL, NULL, E'Carrier 5H Series Discharge Valve Assembly spare part - Efforts Engineers', E'/carrier/5h/discharge-valve-assembly', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Carrier - Carrier 5H Series - Valve Spring and Cage', NULL, E'Carrier', E'Carrier 5H Series', E'Valve Spring and Cage', NULL, E'CAR-5H-VSP-01', E'CAR-5H-VSP-01.jpg', E'5H40, 5H46, 5H60, 5H66, 5H80, 5H86, 5H120, 5H126', NULL, E'To Shoot', NULL, NULL, NULL, E'Carrier 5H Series Valve Spring and Cage spare part - Efforts Engineers', E'/carrier/5h/valve-spring-and-cage', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Carrier - Carrier 5H Series - Cylinder Head Cover', NULL, E'Carrier', E'Carrier 5H Series', E'Cylinder Head Cover', NULL, E'CAR-5H-HDC-01', E'CAR-5H-HDC-01.jpg', E'5H40, 5H46, 5H60, 5H66, 5H80, 5H86, 5H120, 5H126', NULL, E'To Shoot', NULL, NULL, NULL, E'Carrier 5H Series Cylinder Head Cover spare part - Efforts Engineers', E'/carrier/5h/cylinder-head-cover', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Carrier - Carrier 5H Series - Gasket and Overhaul Kit', NULL, E'Carrier', E'Carrier 5H Series', E'Gasket and Overhaul Kit', NULL, E'CAR-5H-GSK-01', E'CAR-5H-GSK-01.jpg', E'5H40, 5H46, 5H60, 5H66, 5H80, 5H86, 5H120, 5H126', NULL, E'To Shoot', NULL, NULL, NULL, E'Carrier 5H Series Gasket and Overhaul Kit spare part - Efforts Engineers', E'/carrier/5h/gasket-and-overhaul-kit', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Carrier - Carrier 5H Series - Oil Pump Assembly', NULL, E'Carrier', E'Carrier 5H Series', E'Oil Pump Assembly', NULL, E'CAR-5H-OPA-01', E'CAR-5H-OPA-01.jpg', E'5H40, 5H46, 5H60, 5H66, 5H80, 5H86, 5H120, 5H126', NULL, E'To Shoot', NULL, NULL, NULL, E'Carrier 5H Series Oil Pump Assembly spare part - Efforts Engineers', E'/carrier/5h/oil-pump-assembly', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Carrier - Carrier 5H Series - Shaft Seal', NULL, E'Carrier', E'Carrier 5H Series', E'Shaft Seal', NULL, E'CAR-5H-SHS-01', E'CAR-5H-SHS-01.jpg', E'5H40, 5H46, 5H60, 5H66, 5H80, 5H86, 5H120, 5H126', NULL, E'To Shoot', NULL, NULL, NULL, E'Carrier 5H Series Shaft Seal spare part - Efforts Engineers', E'/carrier/5h/shaft-seal', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Carrier - Carrier 5H Series - Oil Filter and Strainer', NULL, E'Carrier', E'Carrier 5H Series', E'Oil Filter and Strainer', NULL, E'CAR-5H-FLT-01', E'CAR-5H-FLT-01.jpg', E'5H40, 5H46, 5H60, 5H66, 5H80, 5H86, 5H120, 5H126', NULL, E'To Shoot', NULL, NULL, NULL, E'Carrier 5H Series Oil Filter and Strainer spare part - Efforts Engineers', E'/carrier/5h/oil-filter-and-strainer', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Carrier - Carrier 5H Series - Unloader and Capacity Control', NULL, E'Carrier', E'Carrier 5H Series', E'Unloader and Capacity Control', NULL, E'CAR-5H-ULD-01', E'CAR-5H-ULD-01.jpg', E'5H40, 5H46, 5H60, 5H66, 5H80, 5H86, 5H120, 5H126', NULL, E'To Shoot', NULL, NULL, NULL, E'Carrier 5H Series Unloader and Capacity Control spare part - Efforts Engineers', E'/carrier/5h/unloader-and-capacity-control', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Carrier - Carrier 5H Series - Safety Head and Relief Valve', NULL, E'Carrier', E'Carrier 5H Series', E'Safety Head and Relief Valve', NULL, E'CAR-5H-SAF-01', E'CAR-5H-SAF-01.jpg', E'5H40, 5H46, 5H60, 5H66, 5H80, 5H86, 5H120, 5H126', NULL, E'To Shoot', NULL, NULL, NULL, E'Carrier 5H Series Safety Head and Relief Valve spare part - Efforts Engineers', E'/carrier/5h/safety-head-and-relief-valve', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Carrier - Carrier 5F Series - Cylinder Liner', NULL, E'Carrier', E'Carrier 5F Series', E'Cylinder Liner', NULL, E'CAR-5F-CLN-01', E'CAR-5F-CLN-01.jpg', E'5F20, 5F30, 5F40, 5F60', NULL, E'To Shoot', NULL, NULL, NULL, E'Carrier 5F Series Cylinder Liner spare part - Efforts Engineers', E'/carrier/5f/cylinder-liner', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Carrier - Carrier 5F Series - Piston Assembly', NULL, E'Carrier', E'Carrier 5F Series', E'Piston Assembly', NULL, E'CAR-5F-PST-01', E'CAR-5F-PST-01.jpg', E'5F20, 5F30, 5F40, 5F60', NULL, E'To Shoot', NULL, NULL, NULL, E'Carrier 5F Series Piston Assembly spare part - Efforts Engineers', E'/carrier/5f/piston-assembly', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Carrier - Carrier 5F Series - Piston Ring Set', NULL, E'Carrier', E'Carrier 5F Series', E'Piston Ring Set', NULL, E'CAR-5F-PRG-01', E'CAR-5F-PRG-01.jpg', E'5F20, 5F30, 5F40, 5F60', NULL, E'To Shoot', NULL, NULL, NULL, E'Carrier 5F Series Piston Ring Set spare part - Efforts Engineers', E'/carrier/5f/piston-ring-set', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Carrier - Carrier 5F Series - Connecting Rod', NULL, E'Carrier', E'Carrier 5F Series', E'Connecting Rod', NULL, E'CAR-5F-CRD-01', E'CAR-5F-CRD-01.jpg', E'5F20, 5F30, 5F40, 5F60', NULL, E'To Shoot', NULL, NULL, NULL, E'Carrier 5F Series Connecting Rod spare part - Efforts Engineers', E'/carrier/5f/connecting-rod', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Carrier - Carrier 5F Series - Crankshaft', NULL, E'Carrier', E'Carrier 5F Series', E'Crankshaft', NULL, E'CAR-5F-CRK-01', E'CAR-5F-CRK-01.jpg', E'5F20, 5F30, 5F40, 5F60', NULL, E'To Shoot', NULL, NULL, NULL, E'Carrier 5F Series Crankshaft spare part - Efforts Engineers', E'/carrier/5f/crankshaft', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Carrier - Carrier 5F Series - Gudgeon Pin and Bush', NULL, E'Carrier', E'Carrier 5F Series', E'Gudgeon Pin and Bush', NULL, E'CAR-5F-PIN-01', E'CAR-5F-PIN-01.jpg', E'5F20, 5F30, 5F40, 5F60', NULL, E'To Shoot', NULL, NULL, NULL, E'Carrier 5F Series Gudgeon Pin and Bush spare part - Efforts Engineers', E'/carrier/5f/gudgeon-pin-and-bush', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Carrier - Carrier 5F Series - Main Bearing and Bush', NULL, E'Carrier', E'Carrier 5F Series', E'Main Bearing and Bush', NULL, E'CAR-5F-BRG-01', E'CAR-5F-BRG-01.jpg', E'5F20, 5F30, 5F40, 5F60', NULL, E'To Shoot', NULL, NULL, NULL, E'Carrier 5F Series Main Bearing and Bush spare part - Efforts Engineers', E'/carrier/5f/main-bearing-and-bush', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Carrier - Carrier 5F Series - Suction Valve Plate', NULL, E'Carrier', E'Carrier 5F Series', E'Suction Valve Plate', NULL, E'CAR-5F-SVP-01', E'CAR-5F-SVP-01.jpg', E'5F20, 5F30, 5F40, 5F60', NULL, E'To Shoot', NULL, NULL, NULL, E'Carrier 5F Series Suction Valve Plate spare part - Efforts Engineers', E'/carrier/5f/suction-valve-plate', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Carrier - Carrier 5F Series - Discharge Valve Assembly', NULL, E'Carrier', E'Carrier 5F Series', E'Discharge Valve Assembly', NULL, E'CAR-5F-DVA-01', E'CAR-5F-DVA-01.jpg', E'5F20, 5F30, 5F40, 5F60', NULL, E'To Shoot', NULL, NULL, NULL, E'Carrier 5F Series Discharge Valve Assembly spare part - Efforts Engineers', E'/carrier/5f/discharge-valve-assembly', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Carrier - Carrier 5F Series - Valve Spring and Cage', NULL, E'Carrier', E'Carrier 5F Series', E'Valve Spring and Cage', NULL, E'CAR-5F-VSP-01', E'CAR-5F-VSP-01.jpg', E'5F20, 5F30, 5F40, 5F60', NULL, E'To Shoot', NULL, NULL, NULL, E'Carrier 5F Series Valve Spring and Cage spare part - Efforts Engineers', E'/carrier/5f/valve-spring-and-cage', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Carrier - Carrier 5F Series - Cylinder Head Cover', NULL, E'Carrier', E'Carrier 5F Series', E'Cylinder Head Cover', NULL, E'CAR-5F-HDC-01', E'CAR-5F-HDC-01.jpg', E'5F20, 5F30, 5F40, 5F60', NULL, E'To Shoot', NULL, NULL, NULL, E'Carrier 5F Series Cylinder Head Cover spare part - Efforts Engineers', E'/carrier/5f/cylinder-head-cover', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Carrier - Carrier 5F Series - Gasket and Overhaul Kit', NULL, E'Carrier', E'Carrier 5F Series', E'Gasket and Overhaul Kit', NULL, E'CAR-5F-GSK-01', E'CAR-5F-GSK-01.jpg', E'5F20, 5F30, 5F40, 5F60', NULL, E'To Shoot', NULL, NULL, NULL, E'Carrier 5F Series Gasket and Overhaul Kit spare part - Efforts Engineers', E'/carrier/5f/gasket-and-overhaul-kit', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Carrier - Carrier 5F Series - Oil Pump Assembly', NULL, E'Carrier', E'Carrier 5F Series', E'Oil Pump Assembly', NULL, E'CAR-5F-OPA-01', E'CAR-5F-OPA-01.jpg', E'5F20, 5F30, 5F40, 5F60', NULL, E'To Shoot', NULL, NULL, NULL, E'Carrier 5F Series Oil Pump Assembly spare part - Efforts Engineers', E'/carrier/5f/oil-pump-assembly', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Carrier - Carrier 5F Series - Shaft Seal', NULL, E'Carrier', E'Carrier 5F Series', E'Shaft Seal', NULL, E'CAR-5F-SHS-01', E'CAR-5F-SHS-01.jpg', E'5F20, 5F30, 5F40, 5F60', NULL, E'To Shoot', NULL, NULL, NULL, E'Carrier 5F Series Shaft Seal spare part - Efforts Engineers', E'/carrier/5f/shaft-seal', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Carrier - Carrier 5F Series - Oil Filter and Strainer', NULL, E'Carrier', E'Carrier 5F Series', E'Oil Filter and Strainer', NULL, E'CAR-5F-FLT-01', E'CAR-5F-FLT-01.jpg', E'5F20, 5F30, 5F40, 5F60', NULL, E'To Shoot', NULL, NULL, NULL, E'Carrier 5F Series Oil Filter and Strainer spare part - Efforts Engineers', E'/carrier/5f/oil-filter-and-strainer', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Carrier - Carrier 5F Series - Unloader and Capacity Control', NULL, E'Carrier', E'Carrier 5F Series', E'Unloader and Capacity Control', NULL, E'CAR-5F-ULD-01', E'CAR-5F-ULD-01.jpg', E'5F20, 5F30, 5F40, 5F60', NULL, E'To Shoot', NULL, NULL, NULL, E'Carrier 5F Series Unloader and Capacity Control spare part - Efforts Engineers', E'/carrier/5f/unloader-and-capacity-control', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Carrier - Carrier 5F Series - Safety Head and Relief Valve', NULL, E'Carrier', E'Carrier 5F Series', E'Safety Head and Relief Valve', NULL, E'CAR-5F-SAF-01', E'CAR-5F-SAF-01.jpg', E'5F20, 5F30, 5F40, 5F60', NULL, E'To Shoot', NULL, NULL, NULL, E'Carrier 5F Series Safety Head and Relief Valve spare part - Efforts Engineers', E'/carrier/5f/safety-head-and-relief-valve', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Carrier - Carrier 06D Series - Cylinder Liner', NULL, E'Carrier', E'Carrier 06D Series', E'Cylinder Liner', NULL, E'CAR-06D-CLN-01', E'CAR-06D-CLN-01.jpg', E'06D 48, 06D 68, 06D 75, 06D 018, 06D 024, 06D 037', NULL, E'To Shoot', NULL, NULL, NULL, E'Carrier 06D Series Cylinder Liner spare part - Efforts Engineers', E'/carrier/06d/cylinder-liner', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Carrier - Carrier 06D Series - Piston Assembly', NULL, E'Carrier', E'Carrier 06D Series', E'Piston Assembly', NULL, E'CAR-06D-PST-01', E'CAR-06D-PST-01.jpg', E'06D 48, 06D 68, 06D 75, 06D 018, 06D 024, 06D 037', NULL, E'To Shoot', NULL, NULL, NULL, E'Carrier 06D Series Piston Assembly spare part - Efforts Engineers', E'/carrier/06d/piston-assembly', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Carrier - Carrier 06D Series - Piston Ring Set', NULL, E'Carrier', E'Carrier 06D Series', E'Piston Ring Set', NULL, E'CAR-06D-PRG-01', E'CAR-06D-PRG-01.jpg', E'06D 48, 06D 68, 06D 75, 06D 018, 06D 024, 06D 037', NULL, E'To Shoot', NULL, NULL, NULL, E'Carrier 06D Series Piston Ring Set spare part - Efforts Engineers', E'/carrier/06d/piston-ring-set', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Carrier - Carrier 06D Series - Connecting Rod', NULL, E'Carrier', E'Carrier 06D Series', E'Connecting Rod', NULL, E'CAR-06D-CRD-01', E'CAR-06D-CRD-01.jpg', E'06D 48, 06D 68, 06D 75, 06D 018, 06D 024, 06D 037', NULL, E'To Shoot', NULL, NULL, NULL, E'Carrier 06D Series Connecting Rod spare part - Efforts Engineers', E'/carrier/06d/connecting-rod', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Carrier - Carrier 06D Series - Crankshaft', NULL, E'Carrier', E'Carrier 06D Series', E'Crankshaft', NULL, E'CAR-06D-CRK-01', E'CAR-06D-CRK-01.jpg', E'06D 48, 06D 68, 06D 75, 06D 018, 06D 024, 06D 037', NULL, E'To Shoot', NULL, NULL, NULL, E'Carrier 06D Series Crankshaft spare part - Efforts Engineers', E'/carrier/06d/crankshaft', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Carrier - Carrier 06D Series - Gudgeon Pin and Bush', NULL, E'Carrier', E'Carrier 06D Series', E'Gudgeon Pin and Bush', NULL, E'CAR-06D-PIN-01', E'CAR-06D-PIN-01.jpg', E'06D 48, 06D 68, 06D 75, 06D 018, 06D 024, 06D 037', NULL, E'To Shoot', NULL, NULL, NULL, E'Carrier 06D Series Gudgeon Pin and Bush spare part - Efforts Engineers', E'/carrier/06d/gudgeon-pin-and-bush', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Carrier - Carrier 06D Series - Main Bearing and Bush', NULL, E'Carrier', E'Carrier 06D Series', E'Main Bearing and Bush', NULL, E'CAR-06D-BRG-01', E'CAR-06D-BRG-01.jpg', E'06D 48, 06D 68, 06D 75, 06D 018, 06D 024, 06D 037', NULL, E'To Shoot', NULL, NULL, NULL, E'Carrier 06D Series Main Bearing and Bush spare part - Efforts Engineers', E'/carrier/06d/main-bearing-and-bush', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Carrier - Carrier 06D Series - Suction Valve Plate', NULL, E'Carrier', E'Carrier 06D Series', E'Suction Valve Plate', NULL, E'CAR-06D-SVP-01', E'CAR-06D-SVP-01.jpg', E'06D 48, 06D 68, 06D 75, 06D 018, 06D 024, 06D 037', NULL, E'To Shoot', NULL, NULL, NULL, E'Carrier 06D Series Suction Valve Plate spare part - Efforts Engineers', E'/carrier/06d/suction-valve-plate', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Carrier - Carrier 06D Series - Discharge Valve Assembly', NULL, E'Carrier', E'Carrier 06D Series', E'Discharge Valve Assembly', NULL, E'CAR-06D-DVA-01', E'CAR-06D-DVA-01.jpg', E'06D 48, 06D 68, 06D 75, 06D 018, 06D 024, 06D 037', NULL, E'To Shoot', NULL, NULL, NULL, E'Carrier 06D Series Discharge Valve Assembly spare part - Efforts Engineers', E'/carrier/06d/discharge-valve-assembly', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Carrier - Carrier 06D Series - Valve Spring and Cage', NULL, E'Carrier', E'Carrier 06D Series', E'Valve Spring and Cage', NULL, E'CAR-06D-VSP-01', E'CAR-06D-VSP-01.jpg', E'06D 48, 06D 68, 06D 75, 06D 018, 06D 024, 06D 037', NULL, E'To Shoot', NULL, NULL, NULL, E'Carrier 06D Series Valve Spring and Cage spare part - Efforts Engineers', E'/carrier/06d/valve-spring-and-cage', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Carrier - Carrier 06D Series - Cylinder Head Cover', NULL, E'Carrier', E'Carrier 06D Series', E'Cylinder Head Cover', NULL, E'CAR-06D-HDC-01', E'CAR-06D-HDC-01.jpg', E'06D 48, 06D 68, 06D 75, 06D 018, 06D 024, 06D 037', NULL, E'To Shoot', NULL, NULL, NULL, E'Carrier 06D Series Cylinder Head Cover spare part - Efforts Engineers', E'/carrier/06d/cylinder-head-cover', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Carrier - Carrier 06D Series - Gasket and Overhaul Kit', NULL, E'Carrier', E'Carrier 06D Series', E'Gasket and Overhaul Kit', NULL, E'CAR-06D-GSK-01', E'CAR-06D-GSK-01.jpg', E'06D 48, 06D 68, 06D 75, 06D 018, 06D 024, 06D 037', NULL, E'To Shoot', NULL, NULL, NULL, E'Carrier 06D Series Gasket and Overhaul Kit spare part - Efforts Engineers', E'/carrier/06d/gasket-and-overhaul-kit', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Carrier - Carrier 06D Series - Oil Pump Assembly', NULL, E'Carrier', E'Carrier 06D Series', E'Oil Pump Assembly', NULL, E'CAR-06D-OPA-01', E'CAR-06D-OPA-01.jpg', E'06D 48, 06D 68, 06D 75, 06D 018, 06D 024, 06D 037', NULL, E'To Shoot', NULL, NULL, NULL, E'Carrier 06D Series Oil Pump Assembly spare part - Efforts Engineers', E'/carrier/06d/oil-pump-assembly', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Carrier - Carrier 06D Series - Shaft Seal', NULL, E'Carrier', E'Carrier 06D Series', E'Shaft Seal', NULL, E'CAR-06D-SHS-01', E'CAR-06D-SHS-01.jpg', E'06D 48, 06D 68, 06D 75, 06D 018, 06D 024, 06D 037', NULL, E'To Shoot', NULL, NULL, NULL, E'Carrier 06D Series Shaft Seal spare part - Efforts Engineers', E'/carrier/06d/shaft-seal', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Carrier - Carrier 06D Series - Oil Filter and Strainer', NULL, E'Carrier', E'Carrier 06D Series', E'Oil Filter and Strainer', NULL, E'CAR-06D-FLT-01', E'CAR-06D-FLT-01.jpg', E'06D 48, 06D 68, 06D 75, 06D 018, 06D 024, 06D 037', NULL, E'To Shoot', NULL, NULL, NULL, E'Carrier 06D Series Oil Filter and Strainer spare part - Efforts Engineers', E'/carrier/06d/oil-filter-and-strainer', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Carrier - Carrier 06D Series - Unloader and Capacity Control', NULL, E'Carrier', E'Carrier 06D Series', E'Unloader and Capacity Control', NULL, E'CAR-06D-ULD-01', E'CAR-06D-ULD-01.jpg', E'06D 48, 06D 68, 06D 75, 06D 018, 06D 024, 06D 037', NULL, E'To Shoot', NULL, NULL, NULL, E'Carrier 06D Series Unloader and Capacity Control spare part - Efforts Engineers', E'/carrier/06d/unloader-and-capacity-control', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Carrier - Carrier 06D Series - Safety Head and Relief Valve', NULL, E'Carrier', E'Carrier 06D Series', E'Safety Head and Relief Valve', NULL, E'CAR-06D-SAF-01', E'CAR-06D-SAF-01.jpg', E'06D 48, 06D 68, 06D 75, 06D 018, 06D 024, 06D 037', NULL, E'To Shoot', NULL, NULL, NULL, E'Carrier 06D Series Safety Head and Relief Valve spare part - Efforts Engineers', E'/carrier/06d/safety-head-and-relief-valve', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Carrier - Carrier 06E Series - Cylinder Liner', NULL, E'Carrier', E'Carrier 06E Series', E'Cylinder Liner', NULL, E'CAR-06E-CLN-01', E'CAR-06E-CLN-01.jpg', E'06E (sizes to add)', NULL, E'To Shoot', NULL, NULL, NULL, E'Carrier 06E Series Cylinder Liner spare part - Efforts Engineers', E'/carrier/06e/cylinder-liner', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Carrier - Carrier 06E Series - Piston Assembly', NULL, E'Carrier', E'Carrier 06E Series', E'Piston Assembly', NULL, E'CAR-06E-PST-01', E'CAR-06E-PST-01.jpg', E'06E (sizes to add)', NULL, E'To Shoot', NULL, NULL, NULL, E'Carrier 06E Series Piston Assembly spare part - Efforts Engineers', E'/carrier/06e/piston-assembly', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Carrier - Carrier 06E Series - Piston Ring Set', NULL, E'Carrier', E'Carrier 06E Series', E'Piston Ring Set', NULL, E'CAR-06E-PRG-01', E'CAR-06E-PRG-01.jpg', E'06E (sizes to add)', NULL, E'To Shoot', NULL, NULL, NULL, E'Carrier 06E Series Piston Ring Set spare part - Efforts Engineers', E'/carrier/06e/piston-ring-set', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Carrier - Carrier 06E Series - Connecting Rod', NULL, E'Carrier', E'Carrier 06E Series', E'Connecting Rod', NULL, E'CAR-06E-CRD-01', E'CAR-06E-CRD-01.jpg', E'06E (sizes to add)', NULL, E'To Shoot', NULL, NULL, NULL, E'Carrier 06E Series Connecting Rod spare part - Efforts Engineers', E'/carrier/06e/connecting-rod', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Carrier - Carrier 06E Series - Crankshaft', NULL, E'Carrier', E'Carrier 06E Series', E'Crankshaft', NULL, E'CAR-06E-CRK-01', E'CAR-06E-CRK-01.jpg', E'06E (sizes to add)', NULL, E'To Shoot', NULL, NULL, NULL, E'Carrier 06E Series Crankshaft spare part - Efforts Engineers', E'/carrier/06e/crankshaft', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Carrier - Carrier 06E Series - Gudgeon Pin and Bush', NULL, E'Carrier', E'Carrier 06E Series', E'Gudgeon Pin and Bush', NULL, E'CAR-06E-PIN-01', E'CAR-06E-PIN-01.jpg', E'06E (sizes to add)', NULL, E'To Shoot', NULL, NULL, NULL, E'Carrier 06E Series Gudgeon Pin and Bush spare part - Efforts Engineers', E'/carrier/06e/gudgeon-pin-and-bush', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Carrier - Carrier 06E Series - Main Bearing and Bush', NULL, E'Carrier', E'Carrier 06E Series', E'Main Bearing and Bush', NULL, E'CAR-06E-BRG-01', E'CAR-06E-BRG-01.jpg', E'06E (sizes to add)', NULL, E'To Shoot', NULL, NULL, NULL, E'Carrier 06E Series Main Bearing and Bush spare part - Efforts Engineers', E'/carrier/06e/main-bearing-and-bush', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Carrier - Carrier 06E Series - Suction Valve Plate', NULL, E'Carrier', E'Carrier 06E Series', E'Suction Valve Plate', NULL, E'CAR-06E-SVP-01', E'CAR-06E-SVP-01.jpg', E'06E (sizes to add)', NULL, E'To Shoot', NULL, NULL, NULL, E'Carrier 06E Series Suction Valve Plate spare part - Efforts Engineers', E'/carrier/06e/suction-valve-plate', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Carrier - Carrier 06E Series - Discharge Valve Assembly', NULL, E'Carrier', E'Carrier 06E Series', E'Discharge Valve Assembly', NULL, E'CAR-06E-DVA-01', E'CAR-06E-DVA-01.jpg', E'06E (sizes to add)', NULL, E'To Shoot', NULL, NULL, NULL, E'Carrier 06E Series Discharge Valve Assembly spare part - Efforts Engineers', E'/carrier/06e/discharge-valve-assembly', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Carrier - Carrier 06E Series - Valve Spring and Cage', NULL, E'Carrier', E'Carrier 06E Series', E'Valve Spring and Cage', NULL, E'CAR-06E-VSP-01', E'CAR-06E-VSP-01.jpg', E'06E (sizes to add)', NULL, E'To Shoot', NULL, NULL, NULL, E'Carrier 06E Series Valve Spring and Cage spare part - Efforts Engineers', E'/carrier/06e/valve-spring-and-cage', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Carrier - Carrier 06E Series - Cylinder Head Cover', NULL, E'Carrier', E'Carrier 06E Series', E'Cylinder Head Cover', NULL, E'CAR-06E-HDC-01', E'CAR-06E-HDC-01.jpg', E'06E (sizes to add)', NULL, E'To Shoot', NULL, NULL, NULL, E'Carrier 06E Series Cylinder Head Cover spare part - Efforts Engineers', E'/carrier/06e/cylinder-head-cover', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Carrier - Carrier 06E Series - Gasket and Overhaul Kit', NULL, E'Carrier', E'Carrier 06E Series', E'Gasket and Overhaul Kit', NULL, E'CAR-06E-GSK-01', E'CAR-06E-GSK-01.jpg', E'06E (sizes to add)', NULL, E'To Shoot', NULL, NULL, NULL, E'Carrier 06E Series Gasket and Overhaul Kit spare part - Efforts Engineers', E'/carrier/06e/gasket-and-overhaul-kit', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Carrier - Carrier 06E Series - Oil Pump Assembly', NULL, E'Carrier', E'Carrier 06E Series', E'Oil Pump Assembly', NULL, E'CAR-06E-OPA-01', E'CAR-06E-OPA-01.jpg', E'06E (sizes to add)', NULL, E'To Shoot', NULL, NULL, NULL, E'Carrier 06E Series Oil Pump Assembly spare part - Efforts Engineers', E'/carrier/06e/oil-pump-assembly', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Carrier - Carrier 06E Series - Shaft Seal', NULL, E'Carrier', E'Carrier 06E Series', E'Shaft Seal', NULL, E'CAR-06E-SHS-01', E'CAR-06E-SHS-01.jpg', E'06E (sizes to add)', NULL, E'To Shoot', NULL, NULL, NULL, E'Carrier 06E Series Shaft Seal spare part - Efforts Engineers', E'/carrier/06e/shaft-seal', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Carrier - Carrier 06E Series - Oil Filter and Strainer', NULL, E'Carrier', E'Carrier 06E Series', E'Oil Filter and Strainer', NULL, E'CAR-06E-FLT-01', E'CAR-06E-FLT-01.jpg', E'06E (sizes to add)', NULL, E'To Shoot', NULL, NULL, NULL, E'Carrier 06E Series Oil Filter and Strainer spare part - Efforts Engineers', E'/carrier/06e/oil-filter-and-strainer', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Carrier - Carrier 06E Series - Unloader and Capacity Control', NULL, E'Carrier', E'Carrier 06E Series', E'Unloader and Capacity Control', NULL, E'CAR-06E-ULD-01', E'CAR-06E-ULD-01.jpg', E'06E (sizes to add)', NULL, E'To Shoot', NULL, NULL, NULL, E'Carrier 06E Series Unloader and Capacity Control spare part - Efforts Engineers', E'/carrier/06e/unloader-and-capacity-control', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

INSERT INTO products (name, description, brand, series, category, part_number, photo_id, file_name, compatible_models, material_size, photo_status, photo_source, photo_view, stock_status, alt_text, page_url, remarks)
VALUES (E'Carrier - Carrier 06E Series - Safety Head and Relief Valve', NULL, E'Carrier', E'Carrier 06E Series', E'Safety Head and Relief Valve', NULL, E'CAR-06E-SAF-01', E'CAR-06E-SAF-01.jpg', E'06E (sizes to add)', NULL, E'To Shoot', NULL, NULL, NULL, E'Carrier 06E Series Safety Head and Relief Valve spare part - Efforts Engineers', E'/carrier/06e/safety-head-and-relief-valve', NULL)
ON CONFLICT (photo_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  brand = EXCLUDED.brand,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  part_number = EXCLUDED.part_number,
  file_name = EXCLUDED.file_name,
  compatible_models = EXCLUDED.compatible_models,
  material_size = EXCLUDED.material_size,
  photo_status = EXCLUDED.photo_status,
  photo_source = EXCLUDED.photo_source,
  photo_view = EXCLUDED.photo_view,
  stock_status = EXCLUDED.stock_status,
  alt_text = EXCLUDED.alt_text,
  page_url = EXCLUDED.page_url,
  remarks = EXCLUDED.remarks;

COMMIT;
