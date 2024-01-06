const express = require("express");
const userRouter = express.Router();
const {register,login,editUserInfo} = require("../controllers/user");
const authentication = require('../middleware/authentication')
userRouter.post('/register',register)
userRouter.post('/login',login)
userRouter.put('/:id/update',authentication,editUserInfo)
module.exports = userRouter;
