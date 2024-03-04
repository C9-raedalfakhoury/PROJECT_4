const express = require("express");
const productRouter = express.Router();
const {
  addProduct,
  getAllProduct,
  deleteProductById,
  updateProductById,
  createNewComment,
  getProductByCategoryId,
  getProductByPrice
} = require("../controllers/product");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");
productRouter.post(
  "/addProduct",
  // authentication,
  // authorization("add_products"),
  addProduct
);
productRouter.delete(
  "/:id/delete",
  authentication,
  authorization("delete_product"),
  deleteProductById
);
productRouter.put(
  "/:id/update",
  // authentication,
  // authorization("add_products"),
  updateProductById
);
productRouter.get("", getAllProduct);

productRouter.get("/:price", getProductByPrice);

productRouter.get("/:id/products", getProductByCategoryId);
productRouter.post(
  "/:id/comments",
  authentication,
  authorization("create_comments"),
  createNewComment
);
module.exports = productRouter;
