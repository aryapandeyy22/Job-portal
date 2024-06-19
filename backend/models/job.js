const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const User = require('./user'); // Import the User model if not already imported

const Job = sequelize.define('jobs', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [3, 30]
        }
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [30, 500]
        }
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [20, undefined]
        }
    },
    fixedSalary: {
        type: DataTypes.FLOAT,
        validate: {
            min: 0,
        }
    },
    salaryFrom: {
        type: DataTypes.FLOAT,
        validate: {
            min: 0,
        }
    },
    salaryTo: {
        type: DataTypes.FLOAT,
        validate: {
            min: 0,
        }
    },
    expired: {
        type: DataTypes.TINYINT,
        defaultValue: 0,
    },
    jobPostedOn: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    postedBy: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    }
});

Job.belongsTo(User, { foreignKey: 'postedBy' }); // Define association with User model

module.exports = Job;
