const joi = require("joi");

const username = joi.string().min(6).required();
const password = joi.string().min(6).required();
const email = joi.string().pattern(new RegExp("gmail.com")).required();

module.exports = { username, password, email };
