const sequelize = require('../config/sequelize.config');
const { DataTypes } = require('sequelize');

const Category = sequelize.define('category', {
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

module.exports = Category;