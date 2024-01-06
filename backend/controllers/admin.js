const userSchema = require("../models/user");
const categorySchema = require("../models/categories");
const deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await userSchema.findByIdAndDelete({ _id: id });
    res.status(200).json({
      success: true,
      message: `user deleted`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      err: error,
    });
  }
};

const createCategory = (req, res) => {
  const { name } = req.body;
  const category = new categorySchema({
    name,
  });
  category
    .save()
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "create category successfully",
        product: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
        err: err,
      });
    });
};

module.exports = {deleteUserById,createCategory}