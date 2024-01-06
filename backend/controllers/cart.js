const cartSchema = require("../models/cart");

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
const deleteProductBy = (req, res) => {
  const { id } = req.params;
  cartSchema
    .findByIdAndDelete({ _id: id })
    .then((result) => {
      res.status(200).json({
        success: true,
        message: `product deleted from cart`,
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

const addToCart = (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  const userId = req.token.id;
  console.log(userId);
  cartSchema
    .findOneAndUpdate(
      { user: userId },
      {
        $push: { products: id, quantity: quantity },
      }
    )
    .then((result) => {
      console.log("from add to cart", result);
      res.status(201).json({
        success: true,
        message: `add product to cart successfully`,
        result: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Server Error",
        err: err,
      });
    });
};
module.exports = { getCart, addToCart ,deleteProductBy};

//  add product /
