const { Pool } = require('pg');
require('dotenv').config();

// Extract DATABASE_URL from .env
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error("FATAL ERROR: DATABASE_URL is not set in backend/.env!");
  console.error("Please add your Supabase connection string to the .env file.");
  process.exit(1);
}

// Supabase and most cloud Postgres providers require SSL
const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false // Required for Supabase Node.js connections
  }
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool
};