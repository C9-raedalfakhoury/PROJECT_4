const userSchema = require("../models/user");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const register = (req, res) => {
  const {
    firstName,
    lastName,
    age,
    country,
    email,
    password,
    addres,
    phoneNumber,
    role,
  } = req.body;
  const users = new userSchema({
    firstName,
    lastName,
    age,
    country,
    email,
    password,
    addres,
    phoneNumber,
    role,
  });
  users
    .save()
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "Account Created Successfully",
        author: result,
      });
    })
    .catch((err) => {
      res.status(409).json({
        success: false,
        message: "The email already exists",
      });
    });
};
const login = (req, res) => {
  const { email, password } = req.body;
  const users = new userSchema({
    email,
    password,
  });
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
                result.role == "659887e1eeb4a2bd06fb63dc" ? "user" : "admin",
              permissions:
                result.role == "659887e1eeb4a2bd06fb63dc"
                  ? [
                      "Add_products_to_cart",
                      "add_products",
                      "create_comments",
                    ]
                  : [
                      "Manage_products",
                      "View_orders",
                      "Manage_users",
                      "Delete_comments",
                      "add_category"
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
module.exports = { register, login };
