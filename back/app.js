const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");

const router = require("./router");
const config = require("./config/config");

const app = express();

// Middlewares
const urlencodedParser = bodyParser.urlencoded({ extended: true });

app.use(urlencodedParser);
app.use(bodyParser.json());

app.use(
  session({
    name: "tokendId",
    secret: config.secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: null
    }
  })
);

// Routes
router.init(app);

module.exports = app;
