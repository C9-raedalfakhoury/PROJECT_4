const userSchema = require("../models/user");
const cartSchema = require("../models/cart");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const register = async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    const users = new userSchema({
      userName,
      email,
      password,
      role: "6599365ae4061d69406d4898",
      // user Role = "6599365ae4061d69406d4898"
      // admin Role = "65991dd369a49cd5cbda7ea2"
    });
    const savedUser = await users.save();

    res.status(201).json({
      success: true,
      message: "Account Created Successfully",
      user: savedUser,
    });
  } catch (error) {
    if (error.code === 11000) {
      /*
      the error.code === 11000 يعني انه يوجد حقل يجب ان يكون فريد وغير متكرر مثل حقل البريد الالكتروني بحسب مخطط المستخدمين
      index: 0,
       code: 11000,
       keyPattern: { email: 1 },
       keyValue: { email: 'q' },
       [Symbol(errorLabels)]: Set(0) {}
      */

      console.log(error);
      res.status(409).json({
        success: false,
        message: "The email already exists",
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Server Error",
        error: error.message,
      });
    }
  }
};
const login = (req, res) => {
  const { email, password } = req.body;
  userSchema
    .findOne({ email })
    .then(async (result) => {
      if (!result) {
        res.status(403).json({
          success: false,
          message:
            "The email doesn’t exist or the password you’ve entered is incorrect",
        });
      } else {
        const isValid = await bcryptjs.compare(password, result.password);
        if (!isValid) {
          res.send(
            "The email doesn’t exist or the password you’ve entered is incorrect"
          );
        } else {
          const payload = {
            id: result._id,
            country: result.country,
            role: {
              role:
                result.role == "6599365ae4061d69406d4898" ? "user" : "admin",
              permissions:
                result.role == "6599365ae4061d69406d4898"
                  ? [
                      "Add_products_to_cart",
                      "add_products",
                      "create_comments",
                      "delete_product",
                    ]
                  : [
                      "Manage_products",
                      "View_orders",
                      "Manage_users",
                      "Delete_comments",
                      "add_category",
                    ],
            },
          };
          const options = {
            expiresIn: "60m",
          };
          const SECRET = process.env.SECRET;
          const token = jwt.sign(payload, SECRET, options);
          res.status(200).json({
            success: true,
            message: "Valid login credentials",
            token: token,
            result: result,
          });
        }
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};
const editUserInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, addres, phoneNumber } = req.body;
    const result = await userSchema.findOneAndUpdate(
      { _id: id },
      { firstName, lastName, addres, phoneNumber },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: `updated`,
      user: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      err: error,
    });
  }
};
const getAllUser = async (req, res) => {
  try {
    const result = await userSchema.find()
     const newResult= result.filter((item,i)=>{
      return item.role == "6599365ae4061d69406d4898"
    }) ;
    res.status(200).json({
      success: true, 
      user: newResult,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      err: error,
    });
  }
};
module.exports = { register, login, editUserInfo ,getAllUser};
