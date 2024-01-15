const express = require("express");

const cartRouter = express.Router();

const {
  getCart,
  addToCart,
  deleteProductBy,
  getCartByUserId,
} = require("../controllers/cart");

const authentication = require("../middleware/authentication");
 

cartRouter.get("/", authentication, getCart);
cartRouter.get("/:userId", authentication, getCartByUserId);

cartRouter.post("/:id/addtocart", authentication, addToCart);
cartRouter.delete("/:id/delete", authentication, deleteProductBy);

module.exports = cartRouter;
