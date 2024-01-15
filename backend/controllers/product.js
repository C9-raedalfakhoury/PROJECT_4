const productSchema = require("../models/product");
const reviewSchema = require("../models/review");
const categorySchema = require("../models/categories");
const addProduct = (req, res) => {
  const { name, rate, description, price, imageUrl, category } =
    req.body;
  const products = new productSchema({
    name,
    rate,
    description,
    price,
    imageUrl,
    category,
  });
  products
    .save()
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "create product successfully",
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
const getAllProduct = (req, res) => {
  const { filter } = req.query;

  let query = {};
  if (filter) {
    query = { name: { $regex: filter, $options: "i" } };
  }
  productSchema
    .find(query)
    .populate("category", "name")
    .then((result) => {
      console.log(filter, result);
      res.status(200).json({
        success: true,
        message: "All the products",
        products: result,
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
const updateProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      price,
      quantity,
      imageUrl,
      category,
      createdBy,
    } = req.body;
    const result = await productSchema
      .findOneAndUpdate(
        { _id: id },
        { name, description, price, quantity, imageUrl, category, createdBy },
        { new: true }
      )
      .populate("category createdBy", "name firstName-_id");
    res.status(200).json({
      success: true,
      message: `product updated`,
      result: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      err: err,
    });
  }
};
const createNewComment = (req, res) => {
  const { id } = req.params;
  const commenter = req.token.id;
  const { comments } = req.body;
  const review = new reviewSchema({
    comments,
    commenter,
  });
  review
    .save()
    .then(async (result) => {
      await productSchema.findOneAndUpdate(
        { _id: id },
        {
          $push: { comments: result._id },
        }
      );
      console.log("result from create commet", result);
      res.status(201).json({
        success: true,
        message: `Comment created`,
        comment: result,
      });
    })
    .catch((err) => {
      console.log("error from create comments", err);
      res.status(500).json({
        success: false,
        message: "Server Error",
        err: err,
      });
    });
};
const getProductByCategoryId = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await productSchema
      .find({ category: id })
      .populate("category")
      .exec();
    res.status(201).json({
      success: true,
      message: `successfully`,
      result: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      err: error,
    });
  }
};
module.exports = {
  addProduct,
  getAllProduct,
  deleteProductById,
  updateProductById,
  createNewComment,
  getProductByCategoryId,
};
