const express = require("express");
const adminRouter = express.Router();
const { deleteUserById ,createCategory} = require("../controllers/admin");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");
adminRouter.delete(
  "/admin/:id/delete",
  authentication,
  authorization("Manage_users"),
  deleteUserById
);
adminRouter.post(
    "/category",
    authentication,
    authorization("add_category"),
    createCategory
  );
module.exports = adminRouter;
