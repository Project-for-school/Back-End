const joi = require("joi");

const handleErrors = require("../middleware/handleErrors");
const userService = require("../services/auth.service");
const { username, password, email } = require("../helpers/joi.schema");

const authController = {
  //register
  register: async (req, res) => {
    try {
      const { error } = joi
        .object({ username, password, email })
        .validate(req.body);
      if (error) return handleErrors.badRequest(error.details[0]?.message, res);
      const message = await userService.register(req.body);
      res.status(200).json(message);
    } catch (err) {
      return handleErrors.interalServerErrors(res);
    }
  },

  //login
  login: async (req, res) => {
    try {
      const { error } = joi.object({ username, password }).validate(req.body);
      if (error) return handleErrors.badRequest(error.details[0]?.message, res);
      const message = await userService.login(req.body);
      res.status(200).json(message);
    } catch (err) {
      return handleErrors.interalServerErrors(res);
    }
  },

  requestRefreshToken: (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      res.status(401).json("You're not authenticated !");
    }
    jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
      if (err) console.log(err);

      //create new access token, refresh token
      const newAccessToken = authController.generateAccessToken(user);
      res.status(200).json({ accessToken: newAccessToken });
    });
  },

  logOut: async (req, res) => {
    try {
      res.clearCookie("refreshToken");
      res.status(200).json("Logged Out !");
    } catch (err) {
      res.status(500).json("err", err);
    }
  },
};

module.exports = authController;
