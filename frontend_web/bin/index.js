const express = require("express");
const bodyParser = require("body-parser");
const config = require("./config");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, './build')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: "application/json" }));
app.use(bodyParser.raw());
app.set("port", config.default_app_port);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));
app.set('views', __dirname + '/views');
app.use(cookieParser());
app.use(cors());

const devEnvironment = config.default_app_host === '127.0.0.1';

app.get("/", (req, res) => {
  const haveCookie = req.cookies?.access_token;
  if (haveCookie) {
    if (!devEnvironment){
      res.render("home");
    }
    else {
      res.redirect(config.redirect_url)
    }
  } else {
    res.render("index", { url: `${config.default_app_host}:${config.default_app_port}/login` });
  }
});

app.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  await fetch(`${config.default_api_url}/auth/login`, {
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
    .then(async (result) => {
      if (result.ok) {
        const userInfo = await result.json();
        res.cookie("user", userInfo.metadata.id);
        res.cookie("access_token", userInfo.metadata.access_token, {maxAge: 60000 * userInfo.metadata.expired_time, httpOnly: false});
        res.cookie("refresh_token", userInfo.metadata.refresh_token);
        res.cookie("api",config.default_api_url);
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
  res.clearCookie("user");
  res.clearCookie("access_token");
  res.clearCookie("refresh_token");
  res.send("logout success");
});
