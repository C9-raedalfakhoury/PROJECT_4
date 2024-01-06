const express = require("express");
const adminRouter = express.Router();
const { deleteUserById ,createCategory,deleteCommentById} = require("../controllers/admin");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");
adminRouter.delete(
  "/admin/:id/delete",
  authentication,
  authorization("Manage_users"),
  deleteUserById
);
adminRouter.delete(
  "/admin/:id/comments/delete",
  authentication,
  authorization("Delete_comments"),
  deleteCommentById
);
adminRouter.post(
    "/category",
    authentication,
    authorization("add_category"),
    createCategory
  );
module.exports = adminRouter;
