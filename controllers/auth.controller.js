const User = require("../models/user");
const bcrypt = require("bcrypt");

const authController = {
  //register
  register: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);

      const newUser = await new User({
        username: req.body.username,
        email: req.body.email,
        password: hashed,
      });

      const user = await newUser.save();
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json("err", err);
    }
  },

  //login
  login: async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (!user) {
        res.status(404).json("Wrong username !");
        return;
      }
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword) {
        res.status(404).json("wrong password !");
      }
      if (user && validPassword) {
        res.status(200).json(user);
      }
    } catch (err) {
      res.status(500).json("err", err);
    }
  },


};

module.exports = authController;
