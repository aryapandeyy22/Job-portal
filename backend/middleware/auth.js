const catchAsyncErrors = require('./catchAsyncError');
const ErrorHandler = require('./error');
const jwt = require('jsonwebtoken');
const User  = require('../models/user');
const dotenv = require('dotenv');

dotenv.config();

const isAuthorized = catchAsyncErrors(async(req, res, next)=> {
    const {token} = req.cookies;
    if(!token){
        return next(new ErrorHandler("User not authorized", 401));
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); 
        
        // Find user by id
        const user = await User.findByPk(decoded.id);

        if (!user) {
            return next(new ErrorHandler("User not found", 404));
        }

        req.user = user;
        next();
    } catch (error) {
        return next(new ErrorHandler("Invalid token", 401));
    }
});

module.exports = isAuthorized;
