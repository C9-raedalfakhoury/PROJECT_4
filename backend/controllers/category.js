const categorySchema = require("../models/categories");
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
const deleteCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await categorySchema.findByIdAndDelete({ _id: id });
    res.status(200).json({
        success: true,
        message: `category deleted`,
      });
  } catch (error) {
    res.status(500).json({
        success: false,
        message: "Server Error",
        err: err,
      });
  }
};
const updateCategoryById = (req,res)=>{

}
module.exports = { createCategory,deleteCategoryById };
