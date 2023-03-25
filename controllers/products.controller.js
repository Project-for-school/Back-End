const Product = require("../models/product");

const productController = {
  getProducts: async (req, res) => {
    try {
      const products = Product.find();
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  getProduct: async (req, res) => {
    try {
      const findProduct = Product.findById(req.params.id);
      if (findProduct) {
        res.status(200).json(findProduct);
      } else {
        res.status(404).json("Invalid Id");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  postProduct: async (req, res) => {
    try {
      const newProduct = new Product({
        title: req.body.title,
        solution: req.body.solution,
        status: req.body.status,
        difficult: req.body.difficult,
      });
      const product = await newProduct.save();
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  repairProduct: async (req, res) => {
    try {
      const newProduct = {
        title: req.body.title,
        solution: req.body.solution,
        status: req.body.status,
        difficult: req.body.difficult,
      };
      const findProduct = await Product.findByIdAndUpdate(
        { _id: req.params.id },
        newProduct
      );
      if (findProduct) {
        res.status(200).json("Repair Success");
      } else {
        res.status(404).json("Invalid Id");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const findProduct = await Product.findByIdAndRemove({
        _id: req.params.id,
      });
      if (findProduct) {
        res.status(200).json("Delete Success");
      } else {
        res.status(404).json("Invalid Id");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = productController;
