const express = require("express");
const productRouter = express.Router();
const { addProduct, getAllProduct } = require("../controllers/product");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");
productRouter.post(
  "/createProduct",
  authentication,
  authorization("add_products"),
  addProduct
);
productRouter.post("/", authentication, getAllProduct);
module.exports = productRouter;
