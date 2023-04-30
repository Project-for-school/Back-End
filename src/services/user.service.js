const db = require("../models");
const bcrypt = require("bcrypt");

const userService = {
  getCurrentUserOrById: (userId) =>
    new Promise(async (resovle, reject) => {
      try {
        const response = await db.User.findOne({
          where: { id: userId },
          attributes: { exclude: ["password", "role_code"] },
          include: {
            model: db.Role,
            as: "roleData",
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
          raw: true,
          nest: true,
        });
        resovle({
          err: response ? 0 : 1,
          mess: response ? "Got" : "User not found",
          userData: response,
        });
      } catch (err) {
        reject(err);
      }
    }),

  getAllUsers: () =>
    new Promise(async (resovle, reject) => {
      try {
        const response = await db.User.findAll();
        resovle({
          err: response ? 0 : 1,
          mess: response ? "Got" : "Not found",
          allData: response,
        });
      } catch (err) {
        reject(err);
      }
    }),

  repairPassword: (newPassword, userId) =>
    new Promise(async (resovle, reject) => {
      try {
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(newPassword, salt);
        const response = await db.User.update(
          { password: hashed },
          {
            where: {
              id: userId,
            },
          }
        );
        resovle({
          err: response ? 0 : 1,
          mess: response ? "Repair password successfullt" : "Not found userId",
        });
      } catch (err) {
        reject(err);
      }
    }),

  deleteUser: (userId) =>
    new Promise(async (resovle, reject) => {
      try {
        const response = await db.User.destroy({ where: { id: userId } });
        resovle({
          err: response ? 0 : 1,
          mess: response ? "Delete user success" : "Not found userId",
        });
      } catch (err) {
        reject(err);
      }
    }),
};

module.exports = userService;
