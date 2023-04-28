require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
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
  subjectRoute,
  questionRoute,
} = require("./routes");

//connectDatabase
const connectDatabase = require("./config/connectDB");
//middleware
const middleware = require("./middleware/");

const app = express();
const port = process.env.PORT || 8888;

app.use(
  cors({
    origin: process.env.REACT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(cookieParser());
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }));

app.listen(process.env.PORT, async () => {
  try {
    await connectDatabase();
    console.log(`Example app listening on port ${port}`);
  } catch (err) {
    throw Error(err);
  }
});

//route
app.use("/v1/subject", subjectRoute);

app.use("/v1/auth", authRoute);

app.use("/v1/info", infoRoute);

app.use("/v1/topic", topicRoute);

app.use("/v1/home", globalRoute);

app.use("/v1/premium", premiumRoute);

app.use("/v1/assignment", assignmentRoute);

app.use("/v1/question", questionRoute);

app.use("/v1/user", userRoute);
