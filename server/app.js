// app.js
const express = require('express');
const cors = require('cors');
const sequelize = require('./db');

const productRoutes = require('./routes/productsRoutes');
const ordersRoutes = require('./routes/ordersRoutes');
const messagesRoutes = require('./routes/messagesRoutes');

// Initialize Express app
const app = express();

/* ========= Global middleware ========= */

// Simple request logger (helps during Render debugging)
app.use((req, _res, next) => {
  console.log(
    `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} | Origin: ${
      req.headers.origin || 'n/a'
    }`
  );
  next();
});

// CORS: allow production frontend + local Vite
const allowedOrigins = new Set([
  process.env.FRONTEND_URL,       // e.g. https://e-commerce-websitestore-management-back-cp8j.onrender.com
  'http://localhost:5173'
]);

app.use(cors({
  origin: (origin, cb) => {
    // Allow same-origin / server-to-server / curl (no origin header)
    if (!origin) return cb(null, true);
    if (allowedOrigins.has(origin)) return cb(null, true);
    return cb(new Error(`Not allowed by CORS: ${origin}`));
  },
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Universal OPTIONS handler (safe for Express 5)
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

app.use(express.json());

/* ========= Health check ========= */
app.get('/api/health', (_req, res) => {
  res.json({ ok: true, env: process.env.NODE_ENV || 'dev' });
});

/* ========= API routes ========= */
app.use('/api/products', productRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/messages', messagesRoutes);

// Root info
app.get('/', (_req, res) => {
  res.send('API is running');
});

/* ========= DB sync (load models first) ========= */
require('./models/Product');
require('./models/Order');
sequelize.sync({ alter: true });

module.exports = app;


