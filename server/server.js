const app = require('./app');
const sequelize = require('./db');
const Product = require('./models/Product'); 

const PORT = process.env.PORT || 10000;

const startServer = async () => {
  try {
    console.log('🔄 Connecting to database...');
    await sequelize.authenticate();
    console.log('🟢 Database connected!');

    await sequelize.sync();
    console.log('🟢 Models synced!');

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('🔴 Failed to start server:', error);
  }
};

startServer();


