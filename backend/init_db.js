const { Client } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error("FATAL ERROR: DATABASE_URL is not set in backend/.env!");
  process.exit(1);
}

async function createTables() {
  console.log("Connecting to Cloud PostgreSQL (Supabase)...");
  
  // Connect directly to the specific cloud database
  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    
    // Load and run the schema file
    const schemaPath = path.join(__dirname, '../database/schema.sql');
    if (fs.existsSync(schemaPath)) {
      const schemaSql = fs.readFileSync(schemaPath, 'utf8');
      console.log("Executing schema.sql...");
      await client.query(schemaSql);
      console.log("✅ Schema successfully applied to the cloud database!");
    } else {
      console.error("❌ database/schema.sql file not found.");
    }
  } catch (e) {
    console.error('❌ Error applying schema to cloud DB:', e.message);
  } finally {
    await client.end();
  }
}

createTables();