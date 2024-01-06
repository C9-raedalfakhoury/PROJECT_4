const express = require("express");
const categoryRouter = express.Router();
const { createCategory,deleteCategoryById } = require("../controllers/category");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");
categoryRouter.post(
  "/category",
  authentication,
  authorization("add_category"),
  createCategory
);
categoryRouter.delete(
  "/category/:id/delete",
  authentication,
  authorization("Manage_products"),
  deleteCategoryById
);
module.exports = categoryRouter;
