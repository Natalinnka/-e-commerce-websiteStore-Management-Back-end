const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// POST /api/messages/
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const newMessage = await Message.create({ name, email, message });
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(500).json({ error: 'Failed to send message' });
  }
});

// GET/api/messages/
router.get('/', async (req, res) => {
  const messages = await Message.findAll({ order: [['createdAt', 'DESC']] });
  res.json(messages);
});

// DELETE /api/messages/:id
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Message.destroy({ where: { id: req.params.id } })
    if (!deleted) return res.status(404).json({ error: 'Message not found' })
    res.json({ message: 'Message deleted successfully' })
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete message' })
  }
})


module.exports = router;

