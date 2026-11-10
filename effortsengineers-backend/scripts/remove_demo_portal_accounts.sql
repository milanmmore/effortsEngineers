BEGIN;

DELETE FROM users
WHERE LOWER(BTRIM(email)) IN ('admin@example.com', 'user@example.com')
RETURNING email, role;

COMMIT;
