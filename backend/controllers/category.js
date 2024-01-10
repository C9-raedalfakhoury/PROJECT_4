const categorySchema = require("../models/categories");
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
      err: error,
    });
  }
};
const updateCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const result = await categorySchema.findOneAndUpdate(
      { _id: id },
      { name: name },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: `category updated`,
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
const getAllCategory = async (req, res) => {
  try {
    const result = await categorySchema.find();
    res.status(200).json({
      success: true,
      message: `get successfully`,
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
module.exports = { deleteCategoryById, updateCategoryById, getAllCategory };
