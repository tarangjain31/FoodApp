const express = require("express");
const userRouter = express.Router();
const protectRoute = require('./authHelper');
const {getData,getUserById,postData,updateData,deleteUser} = require('../Controller/userController');
const { append } = require("express/lib/response");

// userRouter
// .route("/")
// .get(protectRoute,getData) 
// .post(postData)
// .patch(updateData)
// .delete(deleteUser)

// userRouter
// .route("/getCookies")
// .get(getCookies)

// userRouter
// .route("/setCookies")
// .get(setCookies)

// userRouter
// .route("/:id")
// .get(getUserById);

userRouter
.route('/:id')
.patch(updateData)
.delete(deleteUser)

app.use(isAuthorized(['admin']));

userRouter
.route('/')
.get(getData)

module.exports = userRouter;