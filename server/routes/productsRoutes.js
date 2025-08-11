const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); 
const { Op } = require('sequelize'); 

// GET all products with optional filtering, sorting, and search
router.get('/', async (req, res) => {
  try {
    const { category, sort, search } = req.query;
    let query = {};
    let order = [];

    // Filter by category
    if (category && category !== 'All') {
      query.where = { category };
    }

    // Search by name (case-insensitive)
    if (search) {
      query.where = {
        ...query.where,
        name: { [Op.iLike]: `%${search}%` }
      };
    }

    // Sorting
    if (sort === 'price_asc') order = [['price', 'ASC']];
    else if (sort === 'price_desc') order = [['price', 'DESC']];
    else if (sort === 'name_asc') order = [['name', 'ASC']];
    else if (sort === 'name_desc') order = [['name', 'DESC']];

    const products = await Product.findAll({ ...query, order });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// POST create new product
router.post('/', async (req, res) => {
  try {
    const { name, price, image, category, stock, sugarFree, noBake } = req.body;

    if (!name || price == null || stock == null) {
      return res.status(400).json({ error: 'Name, price, and stock are required' });
    }
    if (price < 0 || stock < 0) {
      return res.status(400).json({ error: 'Price and stock cannot be negative' });
    }

    const newProduct = await Product.create({
      name,
      price,
      image,
      category,
      stock,
      sugarFree: Boolean(sugarFree),
      noBake: Boolean(noBake),
    });

    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update product by ID
router.put('/:id', async (req, res) => {
  try {
    const { name, price, image, category, stock, sugarFree, noBake } = req.body;
    const product = await Product.findByPk(req.params.id);

    if (!product) return res.status(404).json({ error: 'Product not found' });
    if (price < 0 || stock < 0) {
      return res.status(400).json({ error: 'Price and stock cannot be negative' });
    }

    await product.update({
      name,
      price,
      image,
      category,
      stock,
      sugarFree: Boolean(sugarFree),
      noBake: Boolean(noBake),
    });

    res.json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE product by ID
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    await product.destroy();
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update stock after purchase
router.put('/:id/update-stock', async (req, res) => {
  try {
    const { quantity } = req.body;
    const product = await Product.findByPk(req.params.id);

    if (!product) return res.status(404).json({ error: 'Product not found' });
    if (!quantity || quantity <= 0) {
      return res.status(400).json({ error: 'Invalid quantity' });
    }
    if (product.stock < quantity) {
      return res.status(400).json({ error: 'Not enough stock available' });
    }

    product.stock -= quantity;
    await product.save();

    res.json({ message: 'Stock updated', product });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update stock' });
  }
});

module.exports = router;
