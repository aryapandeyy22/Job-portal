const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const User = require('./user');
const Education = require('./education');
const Experience = require('./experience');
const Project = require('./project');
const Achievement = require('./achievement');

const Resume = sequelize.define('resume', {
  firstName: {
    type: DataTypes.STRING,
    defaultValue: "",
  },
  lastName: {
    type: DataTypes.STRING,
    defaultValue: "",
  },
  email: {
    type: DataTypes.STRING,
    defaultValue: "",
  },
  mobileNumber: {
    type: DataTypes.STRING,
    defaultValue: "",
  },
  portfolio: {
    type: DataTypes.STRING,
    defaultValue: "",
  },
  linkedIn: {
    type: DataTypes.STRING,
    defaultValue: "",
  },
  github: {
    type: DataTypes.STRING,
    defaultValue: "",
  },
  skills: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [],
  },
  address: {
    type: DataTypes.STRING,
    defaultValue: "",
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
}, {
  timestamps: true,
  tableName: 'resumes',
});

// Associations
Resume.belongsTo(User, { foreignKey: 'userId' });
Resume.hasMany(Education, { foreignKey: 'resumeId', onDelete: 'CASCADE' });
Resume.hasMany(Experience, { foreignKey: 'resumeId', onDelete: 'CASCADE' });
Resume.hasMany(Project, { foreignKey: 'resumeId', onDelete: 'CASCADE' });
Resume.hasMany(Achievement, { foreignKey: 'resumeId', onDelete: 'CASCADE' });

Education.belongsTo(Resume, { foreignKey: 'resumeId' });
Experience.belongsTo(Resume, { foreignKey: 'resumeId' });
Project.belongsTo(Resume, { foreignKey: 'resumeId' });
Achievement.belongsTo(Resume, { foreignKey: 'resumeId' });

module.exports = Resume;
