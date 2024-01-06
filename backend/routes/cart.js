const express = require("express");

const cartRouter = express.Router();

const { getCart ,addToCart ,deleteProductBy} = require("../controllers/cart");

const authentication = require("../middleware/authentication");

const authorization = require("../middleware/authorization");

cartRouter.get("/", authentication, getCart);
cartRouter.post("/:id/addtocart", authentication, addToCart);
cartRouter.delete("/:id/delete", authentication, deleteProductBy);

module.exports = cartRouter;
