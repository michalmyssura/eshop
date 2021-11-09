const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const userSchema = new mongoose.Schema({


    name:{
        type:String,
        required:[true,"Podaj swoje Imię"],

    },

    email:{
        type:String,
        required:[true,"Podaj adres email"],
        unique:true,
        validate:[validator.isEmail,"Podaj poprawny adres email"]

    },
    password:{
        type:String,
        required:[true,"Podaj hasło"],
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,

        select:false,

    },
    role:{
        type:String,
        default:'Użytkownik',

    },
    createdAt:{
        type:Date,
        default:Date.now

    },
    resetPasswordToken: String,
    resetPasswordExpire:Date,


})

//kryptowanie hasla po zapisaniu uzytkownika
userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next()
    }
    this.password = await bcrypt.hash(this.password,10)
})

//porownanie hasla

userSchema.methods.comparePassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}


//zwracanie tokenu
userSchema.methods.getJwtToken = function (){

    return jwt.sign({id:this.id},process.env.JWT_SECRET,{expiresIn: process.env.JWT_EXPIRES_TIME})
};

//generowanie tokenu od resetu hasla

userSchema.methods.getResetPasswordToken = function (){
const resetToken = crypto.randomBytes(20).toString('hex');

//cryptowanie
this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

// ustawione 30 minut
this.resetPasswordExpire = Date.now() +30*60*1000;

return resetToken;
}


module.exports = mongoose.model('User',userSchema);
