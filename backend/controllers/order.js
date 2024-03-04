const orderSchema = require("../models/order");
//create order

// get order by userId

const createOrder = async (req, res) => {
  try {
    // cartId
    //   const { cartId,userId } = req.params;

    const { cartItems, totalPrice, user } = req.body;

    const newOrder = new orderSchema({
      cartItems,
      totalPrice,
      user,
    });
    const order = await newOrder.save();
    res.status(201).json({
      success: true,
      result: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      massage: "Server error",
      err: error,
    });
  }
};
const getOrderByUserId = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await orderSchema.find({ user: id }).populate("cartItems user")
    res.status(201).json({
      success: true,
      result: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      massage: "Server error",
      err: error,
    });
  }
};
module.exports = { createOrder ,getOrderByUserId};
