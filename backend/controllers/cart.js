const cartSchema = require("../models/cart");
const itemSchema= require("../models/item")

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

const addToCart = async (req, res) => {
  const { id } = req.params;
  const { product } = req.body;

  const userId = req.token.id;
  console.log(userId);
  const item = new itemSchema(product);
  try {
    const result = await item.save();
    const editCart = await cartSchema.findOneAndUpdate(
      { user: userId },
      {
        $push: { products: result._id },
      }
    );

    res.status(201).json({
      success: true,
      message: `add product to cart successfully`,
      result: editCart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      err: err,
    });
  }
};
module.exports = { getCart, addToCart, deleteProductBy };

//  add product /
