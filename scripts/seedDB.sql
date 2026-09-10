-- Connect to the effortsengineers database
\c effortsengineers;

-- Insert sample clients
INSERT INTO clients (name, email, phone) VALUES
('Acme Corp', 'contact@acme.com', '9876543210'),
('Global Traders', 'info@globaltraders.com', '9123456780'),
('Sunrise Industries', 'sales@sunrise.com', '9988776655');

-- Insert sample catalog items
INSERT INTO catalog (name, description, price, stock) VALUES
('Steel Rod', 'High quality steel rod', 1200.00, 500),
('Copper Wire', 'Industrial grade copper wire', 800.00, 1000),
('Aluminium Sheet', 'Lightweight aluminium sheet', 1500.00, 300);

-- Insert sample quotations
INSERT INTO quotations (client_id, catalog_id, quantity, status) VALUES
(1, 1, 100, 'pending'),
(2, 2, 200, 'approved'),
(3, 3, 50, 'rejected');

-- Insert sample orders
INSERT INTO orders (client_id, quotation_id, total_amount, status) VALUES
(1, 1, 120000.00, 'processing'),
(2, 2, 160000.00, 'completed');

-- Insert sample inventory records
INSERT INTO inventory (catalog_id, quantity) VALUES
(1, 500),
(2, 1000),
(3, 300);

-- Insert dashboard metrics
INSERT INTO dashboard (metric_name, metric_value) VALUES
('Monthly Sales', 250000.00),
('Pending Orders', 5),
('Inventory Value', 500000.00);

-- Insert sample users
INSERT INTO users (username, password_hash, role) VALUES
('admin', 'hashed_admin_password', 'admin'),
('manager', 'hashed_manager_password', 'manager'),
('client1', 'hashed_client_password', 'client');
