const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Achievement = sequelize.define('achievement', {
  title: {
    type: DataTypes.STRING,
    defaultValue: "",
  },
  yearRange: {
    type: DataTypes.STRING,
    defaultValue: "",
  },
  description: {
    type: DataTypes.TEXT,
    defaultValue: "",
  },
}, {
  timestamps: true,
  tableName: 'achievements',
});

module.exports = Achievement;
