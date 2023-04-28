const db = require("../models");

const userService = {
  createNewUser: (user) => {
    return new Promise(async (resolve, reject) => {
      try {
        await db.User.ind(user);
        resolve("done !");
      } catch (err) {
        reject(err);
      }
    });
  },
};
module.exports = userService;
