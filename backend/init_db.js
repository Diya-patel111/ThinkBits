const { Client } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const dbPassword = process.env.DB_PASSWORD || '1234';
const dbUser = process.env.DB_USER || 'postgres';

async function createDbAndTables() {
  // First connect to default postgres DB just to create nexhire database
  const client1 = new Client({
    connectionString: `postgresql://${dbUser}:${dbPassword}@localhost:5432/postgres`
  });
  
  try {
    await client1.connect();
    const res = await client1.query("SELECT 1 FROM pg_database WHERE datname='nexhire'");
    if (res.rowCount === 0) {
      console.log("Database nexhire doesn't exist, creating it...");
      await client1.query('CREATE DATABASE nexhire');
      console.log("Database nexhire created!");
    } else {
      console.log("Database nexhire already exists.");
    }
  } catch (e) {
    console.error('Error creating database:', e.message);
  } finally {
    await client1.end();
  }

  // Now connect to the new 'nexhire' DB and run the schema script
  const client2 = new Client({
    connectionString: `postgresql://${dbUser}:${dbPassword}@localhost:5432/nexhire`
  });

  try {
    await client2.connect();
    const schemaPath = path.join(__dirname, '../database/schema.sql');
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');
    await client2.query(schemaSql);
    console.log('Schema successfully applied to nexhire database!');
  } catch (e) {
    console.error('Error applying schema:', e.message);
  } finally {
    await client2.end();
  }
}

createDbAndTables();