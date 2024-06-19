const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Project = sequelize.define('project', {
  title: {
    type: DataTypes.STRING,
    defaultValue: "",
  },
  yearRange: {
    type: DataTypes.STRING,
    defaultValue: "",
  },
  link: {
    type: DataTypes.STRING,
    defaultValue: "",
  },
  description: {
    type: DataTypes.TEXT,
    defaultValue: "",
  },
}, {
  timestamps: true,
  tableName: 'projects',
});

module.exports = Project;
