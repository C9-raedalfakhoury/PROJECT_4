const productSchema = require("../models/product");

const addProduct = (req, res) => {
  const { name, description, price, quantity, imageUrl,category ,createdBy } = req.body;
  const products = new productSchema({
    name,
    description,
    price,
    quantity,
    imageUrl,
    category,
    createdBy,
    // ! "غير مكتمله"
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
  productSchema
    .find()
    .populate("createdBy category", "firstName-_id name")
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

module.exports = { addProduct, getAllProduct };
