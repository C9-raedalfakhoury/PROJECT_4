const cartSchema = require("../models/cart");
const createCart = async (req, res) => {
  const { product, user, quantity } = req.body;
  const carts = new cartSchema({
    product,
    user,
    quantity,
  });
  carts
    .save()
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "add successfully",
        result: result,
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
const getCart = async (req, res) => {
  try {
    const result = await cartSchema.find().populate("product user");
    res.status(200).json({
      success: true,
      message: "All Cart",
      products: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      err: error,
    });
  }
};
module.exports = { createCart, getCart };
