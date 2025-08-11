// db.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

const isProd = process.env.NODE_ENV === 'production';

// Initialize Sequelize instance
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: false,
});

module.exports = sequelize;






