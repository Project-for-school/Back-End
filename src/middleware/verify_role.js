const handleErrors = require("../middleware/handleErrors");

const isAdmin = (req, res, next) => {
  const { role_code } = req.user;
  if (role_code !== "R1") return handleErrors.unAuth("Require role Admin", res);
  next();
};

const isModeratorOrAdmin = (req, res, next) => {
  const { role_code } = req.user;
  if (role_code !== "R1" && role_code !== "R2")
    return handleErrors.unAuth("Require role Moderator or Admin", res);
  next();
};

module.exports = { isAdmin, isModeratorOrAdmin };
