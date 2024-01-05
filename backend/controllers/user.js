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
          const isValid = await bcryptjs.compare(password, result.password);
          if (!isValid) {
            res.send(
              "The email doesn’t exist or the password you’ve entered is incorrect"
            );
          } else {
            console.log(result.role);
            const payload = {
              id: result._id,
              country: result.country,
              role: {
                role:
                  result.role == "659842fef7aaa05259ea8920" ? "user" : "admin",
                permissions:
                  result.role == "659842fef7aaa05259ea8920"
                    ? [
                        "Add_products_to_cart",
                        "create_products",
                        "create_comments",
                      ]
                    : [
                        "Manage_products",
                        "View_orders",
                        "Manage_users",
                        "Delete_comments",
                      ],
              },
            };
            const options = {
              expiresIn: "60m",
            };
            const SECRET = process.env.SECRET;
            const userToken = jwt.sign(payload, SECRET, options);
            res.status(200).json({
              success: true,
              message: "Valid login credentials",
              token: userToken,
            });
          }
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
