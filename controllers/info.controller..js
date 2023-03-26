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
      if (findPost) {
        res.status(200).json(findPost);
      } else {
        res.status(500).json("Invalid Id");
      }
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
      const findPost = infoModel.findByIdAndUpdate(
        { _id: req.params.id },
        req.body
      );
      if (findPost) {
        res.status(200).json(findPost);
      } else {
        res.status(500).json("Invalid Id");
      }
    } catch (err) {
      res.status(500).json("err: ", err);
    }
  },

  deletePost: async (req, res) => {
    try {
      const findPost = infoModel.findByIdAndDelete({ _id: req.params.id });
      if (findPost) {
        res.status(200).json("Delete Success");
      } else {
        res.status(404).json("Invalid Id");
      }
    } catch (err) {
      res.status(500).json("err: ", err);
    }
  },
};

module.exports = infoController;
