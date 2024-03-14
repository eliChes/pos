const sequelize = require('../config/sequelize.config');
const { DataTypes } = require('sequelize');

const Product = sequelize.define('product', {
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true
  },
});

// Define Category model if not already defined
const Category = sequelize.define('Category', {

});

// Define associateCategories method
Product.prototype.associateCategories = async function(categoryIds) {
  await this.addCategories(categoryIds);
};

module.exports = Product;