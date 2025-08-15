const express = require('express')
const router = express.Router()
const Order = require('../models/Order')
const Product = require('../models/Product')

// GET /api/orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.findAll()
    res.json(orders)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders' })
  }
})

// POST /api/orders
router.post('/', async (req, res) => {
  try {
    const { items, ...rest } = req.body;

    // Create order
    const newOrder = await Order.create({ ...rest, items });

    // Reduce the remaining stock for each item
    for (const item of items) {
      const product = await Product.findByPk(item.id);
      if (product && product.stock >= item.quantity) {
        product.stock -= item.quantity;
        await product.save();
      }
    }

    res.status(201).json(newOrder);
  } catch (err) {
    console.error('ORDER ERROR:', err); 
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// DELETE /api/orders/:id
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Order.destroy({ where: { id: req.params.id } })
    if (!deleted) return res.status(404).json({ error: 'Order not found' })
    res.json({ message: 'Order deleted successfully' })
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete order' })
  }
})

module.exports = router



