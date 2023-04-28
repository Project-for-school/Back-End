const premiumModel = require("../models/premium");

const premiumController = {
  getPosts: async (req, res) => {
    try {
      const dataPremium = await premiumModel.find();
      res.status(200).json(dataPremium);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  getPost: async (req, res) => {
    try {
      const premium = await premiumModel.findById(req.params.id);
      res.status(200).json(premium);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  postPremium: async (req, res) => {
    try {
      const newPostPremium = new premiumModel(req.body);
      const premium = await newPostPremium.save();
      res.status(200).json(premium);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  deletePost: async (req, res) => {
    try {
      await premiumModel.findByIdAndDelete({
        _id: req.params.id,
      });
      res.status(200).json("Remove Success !");
    } catch (err) {
      res.status(500).json(err);
    }
  },

  repairPost: async (req, res) => {
    try {
      await premiumModel.findByIdAndUpdate({ _id: req.params.id }, req.body);
      res.status(200).json("Repair Success !");
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = premiumController;
