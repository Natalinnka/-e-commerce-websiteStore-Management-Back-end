const express = require('express');
const cors = require('cors');
const sequelize = require('./db');

const productRoutes = require('./routes/productsRoutes');
const ordersRoutes = require('./routes/ordersRoutes');
const messagesRoutes = require('./routes/messagesRoutes');

const app = express();

// CORS: прод-домен фронта + локалка
app.use(cors({
  origin: ['https://e-commerce-websitestore-management-back-cp8j.onrender.com', 'http://localhost:5173'],
  credentials: true
}));
app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/messages', messagesRoutes);

app.get('/api/health', (_req, res) => res.json({ ok: true }));
app.get('/', (_req, res) => res.send('API is running'));

// (як і було)
require('./models/Product');
require('./models/Order');
sequelize.sync({ alter: true });

module.exports = app;



