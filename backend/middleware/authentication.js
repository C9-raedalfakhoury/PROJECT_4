const jwt = require("jsonwebtoken");
const authentication = (req, res, next) => {
  console.log("fron authen",req.headers.authorization);
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    try {
      const SECRET = process.env.SECRET;
      const signture = jwt.verify(token, SECRET);
      console.log("signture from authntication.js line 8", signture);
      req.token = signture;
      next();
    } catch (error) {
      res.status(403).json({
        success: false,
        message: "The token is invalid or expired",error
      });
    }
  } else {
    console.log("error from authntication.js line 8");
    res.status(403).json({
      success: false,
      message: "Forbidden",
    });
  }
};
module.exports = authentication;