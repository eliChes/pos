const sequelize = require('../config/sequelize.config');
const { DataTypes } = require('sequelize');

const ProductManagement = sequelize.define('extra_option', {
  extra_option_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  limit_quantity: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  choose_one_option: {
    type: DataTypes.BOOLEAN
  },
});

module.exports = ProductManagement;