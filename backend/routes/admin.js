const express = require("express");
const adminRouter = express.Router();
const {
  deleteUserById,
  createCategory,
  deleteCommentById,
  deleteProductById
} = require("../controllers/admin");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");
adminRouter.delete(
  "/admin/:id/delete",
  // authentication,
  // authorization("Manage_users"),
  deleteUserById
);
adminRouter.delete(
  "/admin/:id/comments/delete",
  authentication,
  authorization("Delete_comments"),
  deleteCommentById
);
adminRouter.delete(
  "/admin/:id/products/delete",
  // authentication,
  // authorization("Manage_products"),
  deleteProductById
);
adminRouter.post(
  "/category",
  // authentication,
  // authorization("add_category"),
  createCategory
);
module.exports = adminRouter;
