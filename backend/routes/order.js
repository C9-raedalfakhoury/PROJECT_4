const express = require("express");
const{createOrder,getOrderByUserId} =require('../controllers/order')
const orderRouter = express.Router();
orderRouter.post("/createOrder",createOrder)
orderRouter.get("/myOrder/:id",getOrderByUserId)
module.exports = orderRouter