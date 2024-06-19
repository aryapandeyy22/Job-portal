const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('jobportal', 'root', 'Alcher123@', {
    host: 'localhost',
    dialect: 'mysql' // or 'postgres', 'sqlite', 'mssql'
    // Other options
});
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = sequelize;






