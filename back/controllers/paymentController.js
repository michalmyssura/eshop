const AsyncError = require('../middleware/asyncError')
const stripe = require ('stripe') (process.env.STRIPE_SECRET_KEY);

//   /payment/process
exports.processPayment = AsyncError(async (req, res, next) => {

    const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: 'pln',

        metadata: { integration_check: 'accept_a_payment' }
    });

    res.status(200).json({
        success: true,
        client_secret: paymentIntent.client_secret
    })

})

//stripeapi
exports.sendStripApi = AsyncError(async (req, res, next) => {

    res.status(200).json({
        stripeApiKey: process.env.STRIPE_API_KEY
    })

})
