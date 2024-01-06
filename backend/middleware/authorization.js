const authorization = (text) => {
  return (req, res, next) => {
    console.log("req.token from authorization.js line 3", req.token.id);
    if (!req.token.role.permissions.includes(text)) {
      res.status(403).json({
        success: false,
        massage: "Unauthorized",
      });
    } else {
      next();
    }
  };
};
module.exports = authorization;
