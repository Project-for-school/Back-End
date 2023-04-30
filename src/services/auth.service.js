const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authService = {
  register: ({ username, password, email }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);
        const newUser = await db.User.findOrCreate({
          where: { email, username },
          defaults: {
            email,
            username,
            password: hashed,
          },
        });
        resolve({
          err: newUser[1] ? 0 : 1,
          mes: newUser[1] ? newUser[0] : "Email is used",
        });
      } catch (err) {
        reject(err);
      }
    });
  },

  login: ({ username, password }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.User.findOne({
          where: { username },
          raw: true,
        });
        const isCheck =
          response && (await bcrypt.compare(password, response.password));
        const accessToken =
          isCheck &&
          jwt.sign(
            {
              id: response.id,
              role_code: response.role_code,
              email: response.email,
              username: response.username,
            },
            process.env.JWT_ACCESS_KEY,
            {
              expiresIn: "1d",
            }
          );
        resolve({
          err: accessToken ? 0 : 1,
          mess: accessToken
            ? "Login Successfully"
            : response
            ? "Wrong password"
            : "username unregistered",
          "access-token": accessToken ? `Bearer ${accessToken}` : null,
        });
      } catch (err) {
        reject(err);
      }
    });
  },
};
module.exports = authService;
