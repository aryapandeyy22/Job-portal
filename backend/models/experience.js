const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Experience = sequelize.define('experience', {
  company: {
    type: DataTypes.STRING,
    defaultValue: "",
  },
  place: {
    type: DataTypes.STRING,
    defaultValue: "",
  },
  yearRange: {
    type: DataTypes.STRING,
    defaultValue: "",
  },
  position: {
    type: DataTypes.STRING,
    defaultValue: "",
  },
  description: {
    type: DataTypes.TEXT,
    defaultValue: "",
  },
}, {
  timestamps: true,
  tableName: 'experience',
});

module.exports = Experience;
