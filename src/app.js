const express = require("express");
const nunjucks = require("nunjucks");
const morgan = require("morgan");
const path = require("path");
const schedule = require("node-schedule");
const passport = require("passport");
const passportConfig = require("./passport");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const { sequelize } = require("./models");
const indexRouter = require("./routes");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const crawler = require("./controllers/crawler");

const app = express();
passportConfig();
// crawler();
app.set("port", process.env.NODE_ENV || 2000);
app.set("view engine", "html");
nunjucks.configure("views", {
  express: app,
  watch: true,
});
sequelize.sync({ force: false });

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser("puppeteer"));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: "puppeteer",
  cookie: {
    httpOnly: true,
    secure: false,
  },
}));
app.use(passport.initialize());
app.use(passport.session());

app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/user", userRouter);

app.use((req, res, next) => {
  const error = new Error(`${req.url} ${req.method} 존재하지 않습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

app.listen(app.get("port"), () => {
  console.log(2000);
});