-- effortsengineers-backend/scripts/clean_placeholder_sizes.sql
-- Removes unfinished placeholder text:
-- '06E (sizes to add)', 'V HP (sizes to add)', 'PC (other sizes to add)',
-- 'HPO / HPC (other sizes to add)', 'J series (other sizes to add)'
-- from the products table and trims any dangling commas.

BEGIN;

-- 1. Carrier 06E Series
UPDATE products
SET compatible_models = '06E'
WHERE (brand ILIKE 'Carrier%' OR series ILIKE '%06E%')
  AND (compatible_models ILIKE '%sizes to add%' OR compatible_models ILIKE '%to add%');

-- 2. Grasso V HP and V XHP Series
UPDATE products
SET compatible_models = 'V 350 XHP, V 550 XHP, V 750 XHP, V 950 XHP, V HP'
WHERE (brand ILIKE 'Grasso%' AND series ILIKE '%V HP%')
  AND (compatible_models ILIKE '%sizes to add%' OR compatible_models ILIKE '%to add%' OR compatible_models LIKE '%, ');

-- 3. Sabroe HPO and HPC Series
UPDATE products
SET compatible_models = 'HPO 24, HPO / HPC'
WHERE (brand ILIKE 'Sabroe%' AND series ILIKE '%HPO%')
  AND (compatible_models ILIKE '%sizes to add%' OR compatible_models ILIKE '%to add%');

-- 4. Kirloskar PC Series
UPDATE products
SET compatible_models = 'PC 2, PC'
WHERE (brand ILIKE 'Kirloskar%' AND series ILIKE '%PC%')
  AND (compatible_models ILIKE '%sizes to add%' OR compatible_models ILIKE '%to add%');

-- 5. Mycom J Series
UPDATE products
SET compatible_models = '6J2, J Series'
WHERE (brand ILIKE 'Mycom%' AND series ILIKE '%J Series%')
  AND (compatible_models ILIKE '%sizes to add%' OR compatible_models ILIKE '%to add%');

-- 6. Generic cleanup for any remaining 'to add' placeholder phrases across all products
UPDATE products
SET compatible_models = TRIM(BOTH ', ' FROM REGEXP_REPLACE(
    REGEXP_REPLACE(compatible_models, '\s*\((?:other\s+)?sizes\s+to\s+add\)', '', 'gi'),
    '\s*,\s*', ', ', 'g'
))
WHERE compatible_models ILIKE '%sizes to add%' OR compatible_models ILIKE '%to add%';

UPDATE products
SET name = TRIM(BOTH ', ' FROM REGEXP_REPLACE(
    REGEXP_REPLACE(name, '\s*\((?:other\s+)?sizes\s+to\s+add\)', '', 'gi'),
    '\s*,\s*', ', ', 'g'
))
WHERE name ILIKE '%sizes to add%' OR name ILIKE '%to add%';

UPDATE products
SET material_size = NULL
WHERE material_size ILIKE '%sizes to add%' OR material_size ILIKE '%to add%';

COMMIT;
