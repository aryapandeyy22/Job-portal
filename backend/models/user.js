const { DataTypes, Model } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sequelize = require('../database');

class User extends Model {
    async validPassword(password) {
        return bcrypt.compare(password, this.password);
    }

    generateAuthToken() {
        return jwt.sign({ id: this.id }, process.env.JWT_SECRET_KEY, {
            expiresIn: process.env.JWT_EXPIRE,
        });
    }
}

User.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [3, 30]
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    contact: {
        type: DataTypes.STRING, // Assuming phone number is stored as string
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [8, 32]
        }
    },
    role: {
        type: DataTypes.ENUM('Job Seeker', 'Employer'),
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: false,
});

User.beforeSave(async (user) => {
    if (user.changed('password')) {
        user.password = await bcrypt.hash(user.password, 10);
    }
});

module.exports = User;
