const express = require("express");
const bodyParser = require("body-parser");
const config = require("./config");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const app = express();
const axios = require('axios');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: "application/json" }));
app.use(bodyParser.raw());
app.use(cors());
app.use(cookieParser());
app.use(express.static("views"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const port = process.env.REACT_APP_PORT || 3000;
const host = process.env.REACT_APP_HOST || '127.0.0.1';

app.get("/login/test", (req, res) => {
  res.send("ok cool");
});

app.get("/login", (req, res) => {
  const haveCookie = req.cookies?.token;
  if (haveCookie) {
    res.redirect(config.redirect_url);
  } else {
    res.render("index", { url: `${process.env.REACT_APP_LOGIN}/login` });
  }
});

app.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  await fetch(`${config.default_api_url}/api/auth/login`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify({
      email: username,
      password: password,
    }),
  })
    .then((result) => {
      console.log(result);
      if (result.ok) {
        res.cookie("token", "login");
        return res.status(200).json("login successfully");
      }
      return res.status(400).json("login failed");
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json("login failed");
    });
});

app.get("/logout", (req, res) => {
  res.cookie("token", "");
  res.send("logout success");
});

// catching error bin 
app.use((err, req, next) => {
  if (err.stack) {
    console.log(
      `node server error. \nTime: ${new Date()} \nPlease refer to the attached message: \nError code: ${
        err.code
      } \nError message: ${err.message} \nError stack: ${err.stack} \n`
    );
    err.stack = "";
    err.message = "internal server error";
    next(err);
  } else {
    next();
  }
});

app.listen(port, () => {
  console.log(
    `hello Server bin is running at http://${host}:${port}`
  );
});
