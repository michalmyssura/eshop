const express = require('express')
const router =express.Router();

const {isAuthenticatedUser,authorizeRoles} = require('../middleware/auth');

const {deleteUser,updateUser,registerUser,loginUser,logout,forgotPassword,resetPassword,getUserProfile,updatePassword,updateUserProfile,adminAllUsers,getUserDetails} = require ('../controllers/authController');

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logout);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);
router.route('/me').get(isAuthenticatedUser,getUserProfile);
router.route('/password/update').put(isAuthenticatedUser,updatePassword);
router.route('/me/update').put(isAuthenticatedUser,updateUserProfile);
router.route('/admin/users').get(isAuthenticatedUser,authorizeRoles('admin'),adminAllUsers);
router.route('/admin/user/:id').get(isAuthenticatedUser,authorizeRoles('admin'),getUserDetails);
router.route('/admin/user/:id').put(isAuthenticatedUser,authorizeRoles('admin'),updateUser);
router.route('/admin/user/:id').delete(isAuthenticatedUser,authorizeRoles('admin'),deleteUser);












module.exports = router;
