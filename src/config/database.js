const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,        // ชื่อฐานข้อมูลจาก .env
  process.env.DB_USER,        // ชื่อผู้ใช้จาก .env
  process.env.DB_PASSWORD,    // รหัสผ่านจาก .env
  {
    host: process.env.DB_HOST,   // ชื่อ container mysql (จาก .env)
    port: process.env.DB_PORT || 3306,  // พอร์ตที่ใช้ (จาก .env)
    dialect: process.env.DB_CONNECTION || 'mysql',  // ใช้ MySQL เป็นค่าเริ่มต้น
    logging: process.env.DB_DEBUG === 'true' ? console.log : false,  // เปิด debug logs ถ้า DB_DEBUG เป็น true
    dialectOptions: {
      useUTC: false,  // ใช้เวลาของภูมิภาค
    },
    timezone: '+07:00',  // เวลาของประเทศไทย
  }
);

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Sync without altering the existing database schema
sequelize.sync({ alter: false })  // `alter: false` prevents Sequelize from trying to add missing columns like timestamps
  .then(() => {
    console.log('Database synced successfully.');
  })
  .catch((error) => {
    console.error('Failed to sync database:', error);
  });

module.exports = sequelize;
