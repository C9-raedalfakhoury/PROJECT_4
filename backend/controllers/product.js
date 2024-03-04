const productSchema = require("../models/product");
const reviewSchema = require("../models/review");
const categorySchema = require("../models/categories");
const addProduct = (req, res) => {
  const { name, rate, description, price, imageUrl, category } = req.body;
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
  const { filter, minPrice, maxPrice } = req.query;

  let query = {};
  if (filter) {
    query.name = { $regex: filter, $options: "i" };
  }

  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) {
      query.price.$gte = parseFloat(minPrice);
    }
    if (maxPrice) {
      query.price.$lte = parseFloat(maxPrice);
    }
  }

  productSchema
    .find(query)
    .populate("category", "name")
    .then((result) => { 
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
      price,
    } = req.body;
    const result = await productSchema
      .findOneAndUpdate(
        { _id: id },
        { name,  price},
        { new: true }
      )
      .populate("category", "name");
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
      res.status(201).json({
        success: true,
        message: `Comment created`,
        comment: result,
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
const getProductByPrice = (req, res) => {
  const { price } = req.params;

  // Parse price to ensure it's a number
  const numericPrice = parseFloat(price);

  // Check if the parsed price is a valid number
  if (isNaN(numericPrice)) {
    return res.status(400).json({
      success: false,
      message: "Invalid price value",
    });
  }

  productSchema
    .find({ price: { $gte: numericPrice } })
    .then((result) => {
      res.status(200).json({
        result,
      });
    })
    .catch((err) => {
      // Send a proper error response with a status code
      res.status(500).json({
        success: false,
        message: "Server Error",
        error: err.message,
      });
    });
};
 

module.exports = {
  addProduct,
  getAllProduct,
  deleteProductById,
  updateProductById,
  createNewComment,
  getProductByCategoryId,
  getProductByPrice,
};
