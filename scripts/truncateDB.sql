-- Truncate script for effortsengineers database
-- Keeps schema, removes all data

\c effortsengineers;

-- Disable foreign key checks temporarily
SET session_replication_role = replica;

-- Truncate tables in dependency order
TRUNCATE TABLE orders RESTART IDENTITY CASCADE;
TRUNCATE TABLE quotations RESTART IDENTITY CASCADE;
TRUNCATE TABLE inventory RESTART IDENTITY CASCADE;
TRUNCATE TABLE catalog RESTART IDENTITY CASCADE;
TRUNCATE TABLE clients RESTART IDENTITY CASCADE;
TRUNCATE TABLE dashboard RESTART IDENTITY CASCADE;
TRUNCATE TABLE users RESTART IDENTITY CASCADE;

-- Re-enable foreign key checks
SET session_replication_role = DEFAULT;

-- Optionally re-seed data
-- Uncomment below if you want to immediately reload seed data
-- \i scripts/seedDB.sql
