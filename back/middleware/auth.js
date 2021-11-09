const User = require('../models/user');
const catchAsyncError = require('./asyncError');
const ErrorHandler = require('../utils/errorHandler')
const jwt = require("jsonwebtoken");
//sprawdzenie czy user jest auth czy nie

exports.isAuthenticatedUser = catchAsyncError(async (req,res,next)=>{
    const { token } = req.cookies;
if(!token) {
    return next(new ErrorHandler('Zaloguj się aby przeglądać zawartość', 401));
}
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    req.user=await User.findById(decoded.id);
    next();

})

exports.authorizeRoles = (...roles) => {
    return(req,res,next) => {
if(!roles.includes(req.user.role)){
    return next(
    new ErrorHandler(`Jesteś (${req.user.role}) nie masz dostępu do oglądania tej zawartości`,403))
    }
    next();
}
}
