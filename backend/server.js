import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import menuRoutes from './routes/menu.js';
import orderRoutes from './routes/orders.js';
import paymentRoutes from './routes/payment.js';
import contactRoutes from './routes/contact.js';
import statsRoutes from './routes/stats.js';
import { verifyEmailConfig } from './utils/email.js';
import initializeProductionData from './scripts/initProduction.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({
  origin: function (origin, callback) {
    // Дозволяємо запити без origin (мобільні додатки, curl, postman)
    if (!origin) return callback(null, true);
    
    // Дозволені домени
    const allowedOrigins = [
      'http://localhost:5173',
      'http://localhost:3000',
      process.env.FRONTEND_URL,
    ];
    
    // Дозволяємо всі Vercel preview URLs
    if (origin.includes('vercel.app')) {
      return callback(null, true);
    }
    
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api', paymentRoutes);
app.use('/api', contactRoutes);
app.use('/api/stats', statsRoutes);

// Health check endpoint for monitoring
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Coffee Shop API is running!',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Ping endpoint specifically for cron-job.org
app.get('/ping', (req, res) => {
  res.status(200).send('pong');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

app.listen(PORT, async () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  
  // Initialize production data if needed (non-blocking)
  if (process.env.NODE_ENV === 'production') {
    try {
      initializeProductionData();
    } catch (error) {
      console.warn('⚠️  Failed to initialize production data:', error.message);
    }
  }
  
  // Verify email configuration (non-blocking)
  verifyEmailConfig().catch(err => {
    console.warn('⚠️  Email service unavailable, but server will continue');
  });
});
