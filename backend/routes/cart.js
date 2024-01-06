const express = require("express");
const cartRouter = express.Router();
const {createCart,getCart} = require("../controllers/cart");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");
cartRouter.post(
  "/createCart",
  authentication,
  authorization("Add_products_to_cart"),
  createCart
);
cartRouter.get("/",authentication,getCart)
module.exports = cartRouter;
