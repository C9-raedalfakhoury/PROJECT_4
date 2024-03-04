const cartSchema = require("../models/cart");
const itemSchema = require("../models/item");

const getCart = async (req, res) => {
  try {
    const result = await cartSchema.find().populate("products user");
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
const getCartByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await cartSchema
      .find({ user: userId })
      .populate("products")
      .populate("user");
    res.status(200).json({
      success: true,
      message: "Cart By User Id",
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
    .findByIdAndDelete({ _id: id }, { new: true })
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
  // console.log(req);
  /*
  token: {
    id: '659bd213464d64fab573565c',
    role: { role: 'user', permissions: [Array] },
    iat: 1705165243,
    exp: 1705168843
  },
  */

  // product id from params
  const { id } = req.params;
  // const { status } = req.params;
  // console.log("id", id);
  // console.log("status", status);
  /*
  {
    "product": {
        "price": 12,
        "quantity": 12,
        "product": "65999528c84b9e1544918b20"
    }
}
  */
  // const { product } = req.body;
  // { quantity: status == "yes" ? 1 : -1 }
  const userId = req.token.id;
  const filter = { user: userId, products: id };
  const update = { $inc: { quantity: 1 } };
  try {
    // const result = await item.save();

    const editCart = await cartSchema.findOneAndUpdate(filter, update, {
      new: true,
    }); 
    if (editCart) {
      return res.status(201).json({
        success: true,
        message: `add product to cart successfully`,
        result: editCart,
      });
    } else {
      const newcart = new cartSchema({
        user: userId,
        products: id,
      });
      const cart = await newcart.save();
      res.status(201).json({
        success: true,
        message: `add product to cart successfully`,
        result: cart,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      err: error,
    });
  }
};
const decreasefromCart = async (req, res) => {
  // console.log(req);

  const { id } = req.params;

  const userId = req.token.id;
  const filter = { user: userId, products: id };
  const update = { $inc: { quantity: -1 } };
  try {
    const editCart = await cartSchema.findOneAndUpdate(filter, update, {
      new: true,
    });

    if (editCart) {
      return res.status(201).json({
        success: true,
        message: `deacrese product from cart successfully`,
        result: editCart,
      });
    } else {
      const newcart = new cartSchema({
        user: userId,
        products: id,
      });
      const cart = await newcart.save();
      res.status(201).json({
        success: true,
        message: `deacrese product from cart successfully`,
        result: cart,
      });
    }
  } catch (error) { 
    res.status(500).json({
      success: false,
      message: "Server Error",
      err: JSON.stringify(error),
    });
  }
};
const deleteAllCartByUserId = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await cartSchema.deleteMany(
      { user: id },
      { new: true }
    );
    res.status(201).json({
      success: true,
      message: `the cart is dropped successfully`,
      result: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      err: JSON.stringify(error),
    });
  }
};
module.exports = {
  getCart,
  addToCart,
  decreasefromCart,
  deleteProductBy,
  getCartByUserId,
  deleteAllCartByUserId
};

//  add product /

// const addToCart = async (req, res) => {

//   token: {
//     id: '659bd213464d64fab573565c',
//     role: { role: 'user', permissions: [Array] },
//     iat: 1705165243,
//     exp: 1705168843
//   },

// product id from params
// const { id } = req.params;

//   {
//     "product": {
//         "price": 12,
//         "quantity": 12,
//         "product": "65999528c84b9e1544918b20"
//     }
// }
//   const { product } = req.body;
//   const userId = req.token.id;
//   const item = new itemSchema(product);
//   try {
//     const result = await item.save();
//     const editCart = await cartSchema.findOneAndUpdate(
//       { user: userId },
//       {
//         $push: { products: result._id },
//       },
//       { new: true }
//     );

//     res.status(201).json({
//       success: true,
//       message: `add product to cart successfully`,
//       result: editCart,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Server Error",
//       err: err,
//     });
//   }
// }
