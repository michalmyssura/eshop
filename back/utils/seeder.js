const Product = require('../models/product');

const dotenv = require ('dotenv');

const connectDatabase = require ('../config/database');

const products = require ('../data/products');

dotenv.config({path: 'back/config/config.env'});

connectDatabase();

const seedProducts = async () => {
    try{

        await Product.deleteMany();
        console.log('Produkt usuniety');
        await Product.insertMany(products);
        console.log('Produkty zostaly dodane');

        process.exit();
    }
    catch (error)
    {
        console.log(error.message);
        process.exit();
    }
}

seedProducts()
