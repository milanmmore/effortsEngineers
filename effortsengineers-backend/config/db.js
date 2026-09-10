const { Pool } = require('pg');

const pool = new Pool(
	process.env.DATABASE_URL
		? { connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } }
		: {
				host: process.env.DB_HOST || 'localhost',
				port: Number(process.env.DB_PORT) || 5432,
				user: process.env.DB_USER || 'postgres',
				password: process.env.DB_PASSWORD,
				database: process.env.PGDATABASE,
      }
);

pool.on('error', (err) => {
  console.error('Unexpected PostgreSQL error', err);
  process.exit(1);
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  getClient: () => pool.connect(),
  pool,
};
