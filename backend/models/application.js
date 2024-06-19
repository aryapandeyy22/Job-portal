const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const User = require('./user'); // Ensure the User model is imported

const Application = sequelize.define('applications', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Please enter your Name!"
      },
      len: {
        args: [3, 30],
        msg: "Name must contain at least 3 and at most 30 characters!"
      }
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: {
        msg: "Please provide a valid Email!"
      },
      notNull: {
        msg: "Please enter your Email!"
      }
    }
  },
  coverLetter: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Please provide a cover letter!"
      }
    }
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Please enter your Phone Number!"
      }
    }
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Please enter your Address!"
      }
    }
  },
  resume:{
    type:DataTypes.BLOB,
    allowNull:false
  },
  resume_public_id: {
    type: DataTypes.STRING,
    allowNull: false
  },
  resume_url: {
    type: DataTypes.STRING,
    allowNull: false
  },
  applicantID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users', // Ensure the table name matches your User model's table
      key: 'id'
    }
  },
  employerID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users', // Ensure the table name matches your User model's table
      key: 'id'
    }
  },
  role: {
    type: DataTypes.ENUM('Job Seeker', 'Employer'),
    allowNull: false
  }
});

// Define associations
Application.belongsTo(User, { as: 'applicant', foreignKey: 'applicantID' });
Application.belongsTo(User, { as: 'employer', foreignKey: 'employerID' });

module.exports = Application;
