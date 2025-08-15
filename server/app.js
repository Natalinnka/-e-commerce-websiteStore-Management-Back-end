const express = require('express');
const cors = require('cors');
const sequelize = require('./db');

const productRoutes = require('./routes/productsRoutes');
const ordersRoutes = require('./routes/ordersRoutes');
const messagesRoutes = require('./routes/messagesRoutes');

const app = express();

// CORS: front-end pro-domain + locale
app.use(cors({
  origin: ['https://e-commerce-websitestore-management-back-cp8j.onrender.com', 'http://localhost:5173'],
  credentials: true
}));

app.use(express.json());

// API routes
app.use('/api/products', productRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/messages', messagesRoutes);

// Health + root
app.get('/api/health', (_req, res) => res.json({ ok: true }));
app.get('/', (_req, res) => res.send('API is running'));

// 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Error handling middleware
app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});
   
// Load models & sync
require('./models/Product');
require('./models/Order');
sequelize.sync({ alter: true });

module.exports = app;



