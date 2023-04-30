const bcrypt = require("bcrypt");
const joi = require("joi");

const handleErrors = require("../middleware/handleErrors");
const userService = require("../services/user.service");
const { password } = require("../helpers/joi.schema");

const userController = {
  getUserCurrent: async (req, res) => {
    try {
      const { id } = req.user;
      const message = await userService.getCurrentUserOrById(id);
      res.status(200).json(message);
    } catch (err) {
      return handleErrors.interalServerErrors(res);
    }
  },

  getUser: async (req, res) => {
    try {
      const message = await userService.getCurrentUserOrById(req.params.id);
      res.status(200).json(message);
    } catch (err) {
      return handleErrors.interalServerErrors(res);
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const message = await userService.getAllUsers();
      res.status(200).json(message);
    } catch (err) {
      return handleErrors.interalServerErrors(res);
    }
  },

  changePassword: async (req, res) => {
    try {
      const { error } = joi.object({ password }).validate(req.body);
      if (error) return handleErrors.badRequest(error.details[0]?.message, res);
      const newPassword = req.body.password;
      const userId = req.params.id;
      const message = await userService.repairPassword(newPassword, userId);
      res.status(200).json(message);
    } catch (err) {
      return handleErrors.interalServerErrors(res);
    }
  },

  deleteUser: async (req, res) => {
    try {
      const message = await userService.deleteUser(req.params.id);
      res.status(200).json(message);
    } catch (err) {
      return handleErrors.interalServerErrors(res);
    }
  },
};

module.exports = userController;
