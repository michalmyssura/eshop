const express = require('express')
const router =express.Router();

const {getAdminProducts,getProducts, newProduct, getSingleProduct,updateProduct,deleteProduct,createProductReview,getProductReviews,deleteReview} = require('../controllers/productController')

const{isAuthenticatedUser, authorizeRoles} = require ('../middleware/auth')

router.route('/products').get(getProducts);


router.route('/admin/products').get(getAdminProducts);

router.route('/admin/product/new').post(isAuthenticatedUser,authorizeRoles('admin'),newProduct);

router.route('/product/:id').get(getSingleProduct);

router.route('/admin/product/:id').put(isAuthenticatedUser,authorizeRoles('admin'),updateProduct);

router.route('/admin/product/:id').delete(isAuthenticatedUser,authorizeRoles('admin'),deleteProduct);


router.route('/review').put(isAuthenticatedUser,createProductReview);
router.route('/reviews').get(isAuthenticatedUser,getProductReviews);
router.route('/reviews').delete(isAuthenticatedUser,deleteReview);

module.exports = router;
