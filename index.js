const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

//route
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const premiumRoute = require("./routes/premium");
const globalRoute = require("./routes/global");
const productRoute = require("./routes/product");

//middleware
const middlewareCheckIdentity = require("./middleware/middleware.controller");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }));
app.use(express.json());

mongoose
  .connect(process.env.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to DB");
    app.listen(process.env.PORT, () => {
      console.log(`Example app listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.log("err", err);
  });

//route
app.use("/v1/auth", authRoute);
app.use("/v1/index", globalRoute);
app.use("/v1/user", middlewareCheckIdentity.checkIdentity, userRoute);
app.use("/v1/product", productRoute);
app.use("/v1/premium", premiumRoute);
