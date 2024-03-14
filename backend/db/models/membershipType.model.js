const sequelize = require('../config/sequelize.config');
const { DataTypes } = require('sequelize');

const MembershipType = sequelize.define('membership_type', {
  membership_type_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  }
});

module.exports = MembershipType;