const Order = require('../models/order');
const Product = require('../models/product');
const ErrorHandler = require('../utils/errorHandler');
const AsyncError = require('../middleware/asyncError')


//nowe zamówienie

exports.newOrder = AsyncError(async (req, res, next) => {
    const {
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo

    } = req.body;

    const order = await Order.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt: Date.now(),
        user: req.user._id
    })

    setTimeout(() => {
        res.status(200).json({
            success: true,
            order
        })
    },1000)
})



//pobranie pojedyńczego zamówienia /order/:id

exports.getSingleOrder = AsyncError(async (req, res, next ) => {

        const order = await Order.findById(req.params.id).populate('user','name email');

        if(!order){

            return next(new ErrorHandler('Zamówienie nie zostało znalezione',404));

        }


        res.status(200).json ({
            success:true,
            order,
            message:"Zamówienie zostało znalezione"
        })

    }
)

exports.myOrders = AsyncError(async (req, res, next ) => {

        const orders = await Order.find({user:req.user.id});



        res.status(200).json ({
            success:true,
            orders,
            message:"Zamówienia zostało znalezione"
        })

    }
)

// DLA ADMINA
// WSZYSTKIE ZAMÓWIENIA

//admin/orders
exports.allOrders = AsyncError(async (req, res, next ) => {

        const orders = await Order.find();

        let amount = 0;

        orders.forEach(order =>{
            amount += order.totalPrice;
        })

        res.status(200).json ({
            success:true,
            amount,
            orders,

        })

    }
)


exports.updateOrder = AsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id)

    if (order.orderStatus === 'Doręczone') {
        return next(new ErrorHandler('Zamówienie zostało dostarczone', 400))
    }

    order.orderItems.forEach(async item => {
        await updateStock(item.product, item.quantity)
    })

    order.orderStatus = req.body.status,
        order.deliveredAt = Date.now()

    await order.save()

    res.status(200).json({
        success: true,
    })
})

async function updateStock(id, quantity) {
    const product = await Product.findById(id);

    product.stock = product.stock - quantity;

    await product.save({ validateBeforeSave: false })
}

//admin/order/id
exports.deleteOrder = AsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id)

    if (!order) {
        return next(new ErrorHandler('Zamówienie nie zostało znalezione', 404))
    }

    await order.remove()

    res.status(200).json({
        success: true
    })
})
