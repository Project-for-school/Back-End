const globalModel = require("../models/global");

const globalController = {
  getAllData: async (req, res) => {
    try {
      const data = await globalModel.find();
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  getData: async (req, res) => {
    try {
      const findData = globalModel.findById(req.params.id);
      res.status(200).json(findData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  postData: async (req, res) => {
    try {
      const newPost = new globalModel(req.body);
      const global = await newPost.save();
      res.status(200).json(global);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  repairData: async (req, res) => {
    try {
      await globalModel.findByIdAndUpdate({ _id: req.params.id }, req.body);
      res.status(200).json("Repair Success");
    } catch (err) {
      res.status(500).json(err);
    }
  },

  deleteData: async (req, res) => {
    try {
      await globalModel.findByIdAndDelete({ _id: req.params.id });
      res.status(200).json("Delete Success");
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = globalController;
