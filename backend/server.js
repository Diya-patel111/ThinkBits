require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

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

// Database connection and Server start
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB connection established successfully.');
  app.listen(PORT, () => {
    console.log(\`Server is successfully running on http://localhost:\${PORT}\`);
  });
})
.catch((err) => {
  console.error('Failed to connect to MongoDB:', err.message);
  process.exit(1);
});
