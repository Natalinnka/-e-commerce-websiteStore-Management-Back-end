const { DataTypes } = require('sequelize')
const sequelize = require('../db')

const Order = sequelize.define('Order', {
  buyerName: { type: DataTypes.STRING, allowNull: false },
  items: { type: DataTypes.JSON, allowNull: true }, // ✅ null
  total: { type: DataTypes.FLOAT, allowNull: false },
  status: { type: DataTypes.STRING, defaultValue: 'pending' },
})

module.exports = Order
