const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userService = require("../services/user.service");
const authController = {
  //register
  register: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);
      const user = {
        username: req.body.username,
        email: req.body.email,
        password: hashed,
      };
      let messsage = await userService.createNewUser(user);
      res.status(200).json(messsage);
    } catch (err) {
      res.status(500).json("err", err);
    }
  },

  //Generate access token
  generateAccessToken: (user) => {
    return jwt.sign(
      {
        admin: user.admin,
        id: user.id,
      },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: "1d" }
    );
  },

  //Generate refresh token
  generateRefreshToken: (user) => {
    return jwt.sign(
      {
        admin: user.admin,
        id: user.id,
      },
      process.env.JWT_REFRESH_KEY,
      { expiresIn: "1m" }
    );
  },

  //login
  login: async (req, res) => {
    try {
      const user = await userModel.findOne({ username: req.body.username });
      if (!user) {
        return res.status(404).json("Wrong username !");
      }
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword) {
        return res.status(404).json("wrong password !");
      }
      if (user && validPassword) {
        const accessToken = authController.generateAccessToken(user);
        const refreshToken = authController.generateRefreshToken(user);

        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          sameSite: "strict",
        });

        const { password, ...others } = user._doc;
        res.status(200).json({ others, accessToken });
      }
    } catch (err) {
      res.status(500).json("err", err);
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
