const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

const {
  assignmentRoute,
  globalRoute,
  authRoute,
  premiumRoute,
  userRoute,
  topicRoute,
  infoRoute,
  subjectRoute
} = require("./routes");

//middleware
const middleware = require("./middleware/");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(cookieParser());
app.use(morgan("common"));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }));

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
app.use("/v1/subject", subjectRoute);
app.use("/v1/auth", authRoute);
app.use("/v1/info", infoRoute);
app.use("/v1/topic", topicRoute);
app.use("/v1/home", globalRoute);
app.use("/v1/premium", premiumRoute);
app.use("/v1/assignment", assignmentRoute);
app.use("/v1/user", middleware.checkIdentity, userRoute);
