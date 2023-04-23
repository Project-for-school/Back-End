const { infoModel } = require("../models");

const infoController = {
  getAllPosts: async (req, res) => {
    try {
      const info = await infoModel.find();
      res.status(200).json(info);
    } catch (err) {
      res.status(500).json("err: ", err);
    }
  },

  getPost: async (req, res) => {
    try {
      const findPost = infoModel.findById(req.params.id);
      res.status(200).json(findPost);
    } catch (err) {
      res.status(500).json("err: ", err);
    }
  },

  postInfo: async (req, res) => {
    try {
      const newPost = new infoModel(req.body);
      const info = await newPost.save();
      res.status(200).json(info);
    } catch (err) {
      res.status(500).json("err: ", err);
    }
  },

  repairPost: async (req, res) => {
    try {
      await infoModel.findByIdAndUpdate({ _id: req.params.id }, req.body);
      res.status(200).json("Repair Success !");
    } catch (err) {
      res.status(500).json("err: ", err);
    }
  },

  deletePost: async (req, res) => {
    try {
      await infoModel.findByIdAndDelete({ _id: req.params.id });
      res.status(200).json("Delete Success");
    } catch (err) {
      res.status(500).json("err: ", err);
    }
  },
};

module.exports = infoController;
