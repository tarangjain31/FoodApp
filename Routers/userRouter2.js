const express = require("express");
const userRouter2 = express.Router();
const { getUser, getAllUsers, updateData, deleteUser } = require('../Controller/userController');
const { protectRoute, isAuthorized, login, signup, forgotPassword, resetPassword, logout } = require('../Controller/authController');

//user ke options
userRouter2
    .route('/:id')
    .patch(updateData)
    .delete(deleteUser)

userRouter2
    .route('/signup')
    .post(signup)

userRouter2
    .route('/login')
    .post(login)

userRouter2
    .route('/logout')
    .get(logout)

userRouter2
    .route('/forgotPassword')
    .post(forgotPassword)

userRouter2
    .route('/resetPassword/:token')
    .post(resetPassword)

//profile page
userRouter2.use(protectRoute)
userRouter2
    .route('/userProfile')
    .get(getUser)

userRouter2.use(isAuthorized(['admin']));
userRouter2
    .route('/')
    .get(getAllUsers);

module.exports = userRouter2;