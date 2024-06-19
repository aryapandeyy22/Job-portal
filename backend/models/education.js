const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Education = sequelize.define('education', {
  yearRange: {
    type: DataTypes.STRING,
    defaultValue: "",
  },
  qualification: {
    type: DataTypes.STRING,
    defaultValue: "",
  },
  percentage: {
    type: DataTypes.STRING,
    defaultValue: "",
  },
  institution: {
    type: DataTypes.STRING,
    defaultValue: "",
  },
}, {
  timestamps: true,
  tableName: 'education',
});

module.exports = Education;
