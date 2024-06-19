const sequelize = require('./database');
const User = require('./models/user');
const Resume = require('./models/resume');
const Education = require('./models/education');
const Experience = require('./models/experience');
const Project = require('./models/project');
const Achievement = require('./models/achievement');

const syncModels = async () => {
  try {
    await sequelize.sync({ force: true }); // Use { force: true } to drop and re-create tables for development purposes
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Unable to synchronize the models:', error);
  }
};

syncModels();
