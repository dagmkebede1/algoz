// node modules
require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");
const path = require("path");

// Routing configuration
const userRouter = require("./route/userRouter");
const courseRouter = require("./route/courseRouter");
const authRouter = require("./route/authRouter");
const enrolRouter = require("./route/enrolRouter");
const questionRouter = require("./route/questionRouter");
const answerRouter = require("./route/answerRouter");
const resourceRouter = require("./route/resourceRouter");
const globalErrorHanddler = require("./middlewares/errorHanddler");
const notFound = require("./route/notFound");

// Utility functions
const CatchAsync = require("./utils/CatchAsync");

const app = express();

// serving a static files
app.use("/public", express.static(path.join(__dirname, "public")));

// Securing the header
// app.use(helmet());

// cors policy
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));

//Limit the requests from the same IP's....protections against {DDOS & brute force attacks}
const Limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, Please try again in an hour",
});
app.use("/", Limiter);
// {
//   limit: "10kb";
// }

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//Data Sanitization against NoSQL query injections
app.use(mongoSanitize());

//Data Sanitization against XSS attacks
app.use(xss());

// Prevent Parameter Pollution
app.use(
  hpp({
    // whitelist: ["price"],
  })
);

// Router usages
app.use(authRouter);
app.use(questionRouter);
app.use(answerRouter);
app.use(courseRouter);
app.use(enrolRouter);
app.use(userRouter);
app.use(resourceRouter);
// 404
app.use(notFound);
// Error handling Middleware
app.use(globalErrorHanddler);

// Starting the Applications with the Mongodb Database
const start = CatchAsync(async (uri, port) => {
  mongoose.set("strictQuery", true);
  await mongoose
    .connect(uri)
    .then(console.log("Database connected Successfully!"))
    .catch((err) => {
      console.log(err.message);
    });
  app.listen(port, console.log(`server running on port: ${port}`));
});

start(process.env.MONGO, process.env.PORT);
