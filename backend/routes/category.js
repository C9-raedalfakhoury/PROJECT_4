const express = require("express");
const categoryRouter = express.Router();
const { deleteCategoryById,updateCategoryById } = require("../controllers/category");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

categoryRouter.delete(
  "/category/:id/delete",
  authentication,
  authorization("Manage_products"),
  deleteCategoryById
);
categoryRouter.put(
  "/category/:id/update",
  authentication,
  authorization("Manage_products"),
  updateCategoryById
);
module.exports = categoryRouter;
