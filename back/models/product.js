const mongoose = require ('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Podaj nazwę produktu'],
        trim: true,
        maxLength: [100, 'Maksymalna długość wynosi 100 znaków']
    },
    price: {
        type: Number,
        required: [true, 'Podaj cenę produktu'],
        maxLength: [10, 'Maksymalna cena może wynosić 10 znaków'],
        default: 0.0
    },
    description: {
        type: String,
        required: [true, 'Podaj opis produktu'],
    },
    ratings: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            },
        }
    ],
    category: {
        type: String,
        required: [true, 'Podaj kategorię produktu'],
        enum: {
            values: [
                'Smartfony',
                'Laptopy',
                'Akcesoria',
                'Słuchawki',
                'Klawiatury',
                'Myszki',
                'Huby',


            ],
            message: 'Podaj poprawną kategorię produktu'
        }
    },
    seller: {
        type: String,
        required: [true, 'Podaj nazwę sprzedawcy']
    },
    stock: {
        type: Number,
        required: [true, 'Podaj stan magazynowy'],
        maxLength: [5, 'Maksymalny stan magazynowy może wynosić 5 cyfr'],
        default: 0
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: 'User',
                required: true
            },
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})


module.exports = mongoose.model('Product',productSchema);
