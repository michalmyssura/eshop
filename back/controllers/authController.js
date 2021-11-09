const User = require('../models/user');
const crypto = require('crypto');
const ErrorHandler = require('../utils/errorHandler');
const AsyncError = require('../middleware/asyncError');
sendToken = require('../utils/jwtToken');
sendEmail = require('../utils/sendEmail');


//Rejestracja jako uzytkownik

exports.registerUser = AsyncError(async (req,res,next)=>{

    const {name,email,password} = req.body;

    const user = await User.create({
        name,
        email,
        password,
    })

    sendToken(user,200,res);


})

//logowanie użytkownika

exports.loginUser = AsyncError(async(req,res,next)=>{
    const {email,password} = req.body;

    if(!email || !password){
        return next (new ErrorHandler("Podaj email i haslo",400))
    }
    const user = await User.findOne({email}).select('+password');

    if(!user){
        return next(new ErrorHandler('Błedne hasłlo albo email',401));
    }

    const isPasswordIsCorrect = await user.comparePassword(password);
    if(!isPasswordIsCorrect){
        return next (new ErrorHandler('Błędne hasło albo email',401))
    }
    const token = user.getJwtToken();

    sendToken(user,200,res);

})


//pobranie profilu użytkownika
exports.getUserProfile = AsyncError(async (req,res,next)=>{
    const user =await User.findById(req.user.id);

    res.status(200).json({
        success:true,
        user,
    })

})

// aktualizacja hasła
exports.updatePassword =  AsyncError(async (req,res,next)=>{
    console.log(req.user.id);
    const user =await User.findById(req.user.id).select('+password');

    const isMatched = await user.comparePassword(req.body.oldPassword)
        if(!isMatched){
            return next(new ErrorHandler('Stare haslo jest nieprawidlowe',400))
        }

        user.password = req.body.password;
        await user.save();

        sendToken(user,200,res);
})

//aktualizacja profilu użytkownika
exports.updateUserProfile = AsyncError(async (req,res,next)=>{

    const newUserData= {
        name : req.body.name,
        email: req.body.email,
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData,{
      new:true,
        runValidators:true,
        useFindAndModify:false

    })

    res.status(200).json({
        success:true,
    })


})


//wylogowanie

exports.logout = AsyncError(async(req,res,next)=>{

    res.cookie('token',null,{
        expires:new Date(Date.now()),
        httpOnly:true,
    })

    res.status(200).json({
        success:true,
        message:'Wylogowano',
    })


})

//przypomnienie hasla na maila

exports.forgotPassword =  AsyncError(async(req,res,next)=>{

    const user = await User.findOne({email: req.body.email});
    if(!user){
        return next(new ErrorHandler('Użytkownik z takim mailem nie zostal znaleziony',404));
    }
    const resetToken = user.getResetPasswordToken();

    await user.save({validateBeforeSave:false})

    const resetUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

    const message = `Twój token do zresetowania hasla : ${resetUrl} . Jeśli nie ty chcesz zmienić hasło zignoruj tą wiadomość.`

    try {

        await sendEmail({
            email:user.email,
            subject:"Zmiana hasła",
            message
        })
        res.status(200).json({
            success:true,
            message:`Wiadomość wysłana do ${user.email}`
        })

    }
    catch (err){
        user.ResetPasswordToken = undefined;
        user.ResetPassworExpire = undefined;

        await user.save({validateBeforeSave:false});
        return next(new ErrorHandler(err.message,500));
    }
})

//reset hasla

exports.resetPassword =  AsyncError(async(req,res,next)=>{
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt:Date.now()}
    })
    if(!user){
        return next(new ErrorHandler("Token z mozliwością resetowania hasła się przedawnił",400))
    }
    if(req.body.password !== req.body.confirmpassword){
        return next(new ErrorHandler("Hasło jest niepoprawne",400))
    }
    user.password = req.body.password;
    user.ResetPasswordToken = undefined;
    user.ResetPassworExpire = undefined;

    await user.save();
    sendToken(user,200,res);
})

// dla admina

exports.adminAllUsers = AsyncError(async(req,res,next)=>{
    const users = await User.find();

    res.status(200).json({

        success:true,
        users
    })


})


exports.getUserDetails = AsyncError(async(req,res,next)=>{
    const user = await User.findById(req.params.id);

    if(!user){
        return next (new ErrorHandler(`Nie znaleziono użytkownika o id: ${req.params.id}`))
    }


    res.status(200).json({

        success:true,
        user
    })


})


exports.updateUser = AsyncError(async (req,res,next)=>{

    const newUserData= {
        name : req.body.name,
        email: req.body.email,
        role: req.body.role
    }

    const user = await User.findByIdAndUpdate(req.params.id, newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false

    })

    res.status(200).json({
        success:true,
    })


})

exports.deleteUser = AsyncError(async(req,res,next)=>{
    const user = await User.findById(req.params.id);

    if(!user){
        return next (new ErrorHandler(`Nie znaleziono użytkownika o id: ${req.params.id}`))
    }

    await user.remove();

    res.status(200).json({

        success:true,

    })


})
