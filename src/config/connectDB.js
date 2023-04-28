const mongoose = require("mongoose");
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    logging: false,
    query: {
      raw: true,
    },
    timezone: "+07:00",
  }
);

const connectDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to MySql");
    await mongoose.connect(process.env.URI_MONGODB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to Mongodb");
  } catch (err) {
    throw Error(err);
  }
};

module.exports = connectDatabase;
