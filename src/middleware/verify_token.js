const jwt = require("jsonwebtoken");
const handleErrors = require("./handleErrors");

const verifyToken = (req, res, next) => {
  const token = req.headers.token;
  if (!token) return handleErrors.unAuth("Require login", res);
  const accessToken = token.split(" ")[1];
  jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
    if (err) return handleErrors.unAuth("Token is not valid", res);
    req.user = user;
    next();
  });
};

module.exports = verifyToken;
