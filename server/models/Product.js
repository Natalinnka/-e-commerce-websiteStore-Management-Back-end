// Import DataTypes from Sequelize
const { DataTypes } = require('sequelize');
// Import configured Sequelize instance
const sequelize = require('../db');

// Define Product model
const Product = sequelize.define('Product', {
  name: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.FLOAT, allowNull: false },
  image: { type: DataTypes.STRING },
  category: { type: DataTypes.STRING },
  stock: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  sugarFree: { type: DataTypes.BOOLEAN, defaultValue: false }, // For "No Sugar" badge
  noBake: { type: DataTypes.BOOLEAN, defaultValue: false }      // For "No Bake" badge
});

module.exports = Product;





