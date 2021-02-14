const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const jwtSecret = require("./config.json").jwt.secret;

const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const corsOptions = {
  origin: "http://localhost:3001",
  credentials: true,
};

let indexRouter = require("./routes/index");
let usersRouter = require("./routes/users");
let authRouter = require("./routes/auth");
let showRouter = require("./routes/show");
let theaterRouter = require("./routes/theater");

const dbConnector = require("./dbConnector");
dbConnector
  .authenticate()
  .then(() => {
    console.log("Connection Success");
  })
  .catch((err) => {
    console.log(err);
  });

const User = require("./models/User");
const Theater = require("./models/Theater");
const Show = require("./models/Show");

User.sync({ force: false });
Theater.sync({ force: false });
Show.sync({ force: false });

User.hasMany(Theater, { foreignKey: "user_id" });
Theater.belongsTo(User, { foreignKey: "user_id" });

Theater.hasMany(Show, { foreignKey: "theater_id" });
Show.belongsTo(Theater, { foreignKey: "theater_id" });

let app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.set("jwt-secret", jwtSecret);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors(corsOptions));

const options = {
  apis: ["./routes/*.js"],
  swaggerDefinition: {
    info: {
      title: "작은 객석 (Tiny Seat) API DOCS",
      version: "0.1.0",
      description: "작은 객석 프로젝트 api 문서",
      contact: {
        name: "Nick",
        email: "iostream1701@gmail.com",
      },
    },
    securityDefinitions: {
      jwt: {
        type: "apiKey",
        name: "Authorization",
        in: "header",
      },
    },
    security: [{ jwt: [] }],
  },
};

const specs = swaggerJsdoc(options);

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);
app.use("/show", showRouter);
app.use("/theater", theaterRouter);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
