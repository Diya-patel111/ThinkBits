require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db');

const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static uploads if necessary
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api', apiRoutes);

// Health check
app.get('/health', (req, res) => res.status(200).json({ status: 'ok', msg: 'NexHire Backend is up and running' }));

// Database connection check and Server start
db.pool.connect()
.then(client => {
  console.log('PostgreSQL connection established successfully.');
  client.release();
  app.listen(PORT, () => {
    console.log(`Server is successfully running on http://localhost:${PORT}`);
  });
})
.catch((err) => {
  console.error('Failed to connect to PostgreSQL:', err.message);
  process.exit(1);
});
