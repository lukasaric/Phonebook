'use strict';

const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  storage: process.env.DB_STORAGE,
  logging: true,
  port: process.env.DB_PORT
});

const db = {
  Contact: sequelize.import('./models/contact'),
  PhoneNumber: sequelize.import('./models/phoneNumber'),
  User: sequelize.import('./models/user')
};

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) db[modelName].associate(db);
});

db.sequelize = sequelize;
db.Sequelize = sequelize;
module.exports = db;
