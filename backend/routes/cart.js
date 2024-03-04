const express = require("express");

const cartRouter = express.Router();

const {
  getCart,
  addToCart,
  deleteProductBy,
  getCartByUserId,
  decreasefromCart,
  deleteAllCartByUserId
} = require("../controllers/cart");

const authentication = require("../middleware/authentication");
 

cartRouter.get("/", authentication, getCart);
cartRouter.get("/:userId", authentication, getCartByUserId);

cartRouter.post("/:id/addtocart", authentication, addToCart);
cartRouter.post("/:id/decrease", authentication, decreasefromCart);
cartRouter.delete("/:id/delete", authentication, deleteProductBy);
cartRouter.delete("/:id/dropCart",  deleteAllCartByUserId);

module.exports = cartRouter;
