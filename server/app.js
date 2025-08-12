// app.js
const express = require('express')
const cors = require('cors')
const sequelize = require('./db')

const productRoutes = require('./routes/productsRoutes')
const ordersRoutes = require('./routes/ordersRoutes')
const messagesRoutes = require('./routes/messagesRoutes')

// Initialize Express app
const app = express()

// Global middleware
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}))
app.use(express.json())

// API routes
app.use('/api/products', productRoutes)
app.use('/api/orders', ordersRoutes)
app.use('/api/messages', messagesRoutes)

app.get('/', (req, res) => {
  res.send('API is running')
})

// Load models and sync database
require('./models/Product')
require('./models/Order')
sequelize.sync({ alter: true })

module.exports = app


