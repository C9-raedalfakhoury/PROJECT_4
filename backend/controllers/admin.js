const userSchema = require("../models/user");
const categorySchema = require("../models/categories");
const productSchema = require("../models/product");
const reviewSchema = require("../models/review");
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
  const { name ,imageUrl} = req.body;
  const category = new categorySchema({
    name,
    imageUrl
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
const deleteCommentById = async (req, res) => {
  try {
    const { id } = req.params;
    await reviewSchema.findOneAndDelete({ _id: id });
    res.status(200).json({
      success: true,
      message: `comment deleted`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      err: error,
    });
  }
};
const deleteProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await productSchema.findByIdAndDelete({ _id: id });
    res.status(200).json({
      success: true,
      message: `product deleted`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      err: error,
    });
  }
};
module.exports = { deleteUserById, createCategory,deleteCommentById ,deleteProductById};
