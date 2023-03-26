const bcrypt = require("bcrypt");

const { userModel } = require("../models/");

const userController = {
  getUser: async (req, res) => {
    try {
      const user = await userModel.findById(req.params.id);
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json("err", err);
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const users = await userModel.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json("err", err);
    }
  },

  changePassword: async (req, res) => {
    try {
      const user = await userModel.findById(req.params.id);
      if (user) {
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(req.body.newpassword, salt);
        await user.updateOne({ password: hashed });
        res.status(200).json("Success");
      } else {
        res.status(404).json("Invalid ID");
      }
    } catch (err) {
      res.status(500).json("err", err);
    }
  },

  deleteUser: async (req, res) => {
    try {
      const findUser = await userModel.findOneAndDelete({ _id: req.params.id });
      if (findUser) {
        res.status(200).json("Remove Success !");
      } else {
        res.status(404).json("Invalid ID !");
      }
    } catch (err) {
      res.status(500).json("err", err);
    }
  },
};

module.exports = userController;
