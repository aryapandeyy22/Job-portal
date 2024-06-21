'use strict';
const User = require('../models/user');
const ErrorHandler = require('../middleware/error');
const catchAsyncErrors = require('../middleware/catchAsyncError');
const sendToken = require('../utils/jwtToken');

const register = async (req, res) => {
    try {
        const { name, email, contact, password, role, age } = req.body;
        
        // Check if the email is already registered
        const existingUser = await User.findOne({ where: { email }});
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" });
        }

        // Create the user
        const newUser = await User.create({ name, email, contact, password, role, age });

        sendToken(newUser,201, res, "User resgistered successfully!");
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

const login = catchAsyncErrors(async (req, res, next) => {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
        return next(new ErrorHandler("Please provide email, password, and role."));
    }
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return next(new ErrorHandler("Invalid Email Or Password.", 400));
        }
        const isPasswordMatched = await user.validPassword(password);
        if (!isPasswordMatched) {
            return next(new ErrorHandler("Invalid Email Or Password.", 400));
        }
        if (user.role !== role) {
            return next(new ErrorHandler(`User with provided email and ${role} not found!`, 404));
        }
        sendToken(user,201, res, "User Logged In successfully!");
    } catch (err) {
        next(err);
    }
});

const logout = catchAsyncErrors(async (req, res, next) => {
    res.status(201).cookie("token", "", { httpOnly: true, expires: new Date(Date.now()) }).json({
        success: true,
        message: "Logged Out Successfully.",
    });
});

const getUser = catchAsyncErrors((req, res, next) => {
    // Check if req.user is populated
    if (!req.user) {
        return next(new ErrorHandler('Unauthorized', 401));
    }

    // User details are available in req.user
    const user = req.user;
    res.status(200).json({ success: true, user });
});
const updatePassword = catchAsyncErrors(async (req, res, next) => {
    const { currentPassword, newPassword } = req.body;

    // Validate input
    if (!currentPassword || !newPassword) {
        return next(new ErrorHandler("Please provide both current and new password.", 400));
    }

    const user = await User.findByPk(req.user.id);

    if (!user) {
        return next(new ErrorHandler("User not found.", 404));
    }

    // Check if current password is correct
    const isPasswordMatched = await user.validPassword(currentPassword);
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Current password is incorrect.", 400));
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.status(200).json({
        success: true,
        message: "Password updated successfully."
    });
});


module.exports = {
    register,
    login,
    logout,
    getUser,
    updatePassword
};
