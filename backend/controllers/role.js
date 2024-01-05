const roleSchema = require("../models/role");
const createNewRole = (req, res) => {
  const { role, permissions } = req.body;
  const roles = new roleSchema({
    role,
    permissions,
  });
  roles
    .save()
    .then((result) => {
      res.status(201).json({
        success: true,
        massage: "Success role created",
        role: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        massage: "Server error",
        err: err,
      });
    });
};
module.exports = {createNewRole}