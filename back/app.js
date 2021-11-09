const express = require('express');

const app = express();
const fileUpload = require('express-fileupload')
const bodyparser= require('body-parser')
const dotenv = require('dotenv');
dotenv.config({ path: 'back/config/config.env' })

const cookieParser = require('cookie-parser');

const errorMiddleware = require ('../back/middleware/error');




app.use(express.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(fileUpload());

const products = require('../back/routes/product');
const user = require('../back/routes/user');
const payment = require('../back/routes/payment');
const order = require('../back/routes/order');



app.use('/api/v1',products)
app.use('/api/v1',user)
app.use('/api/v1',payment)
app.use('/api/v1',order)


app.use(errorMiddleware);

module.exports = app;

