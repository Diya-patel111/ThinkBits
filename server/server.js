import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import errorHandler from './middleware/errorHandler.js';
import routes from './routes/index.js';
import authRoutes from './routes/authRoutes.js';
import parseRoutes from './routes/parseRoutes.js';
import candidateRoutes from './routes/candidateRoutes.js';
import matchRoutes from './routes/matchRoutes.js';

// Setup environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware setup
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Basic routes setup
app.use('/api', routes);
app.use('/api/auth', authRoutes);
app.use('/api/v1/parse', parseRoutes);
app.use('/api/v1/candidates', candidateRoutes);
app.use('/api/v1/match', matchRoutes);

// 404 Route handling
app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
});

// Setup basic error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});