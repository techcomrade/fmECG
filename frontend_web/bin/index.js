const express = require("express");
const bodyParser = require("body-parser");
const config = require("./config");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: "application/json" }));
app.set("host", config.default_app_host);
app.use(bodyParser.raw());
app.set("port", config.default_app_port);
app.use(express.static("views"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(cookieParser());
app.use(cors());
app.get("/test", (req, res) => {
  res.send("ok cool");
});

app.get("/", (req, res) => {
  const haveCookie = req.cookies?.token;
  if (haveCookie) {
    res.redirect(config.redirect_url);
  } else {
    res.render("index", { url: `http://127.0.0.1:3001/login` });
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

app.listen(app.get("port"), app.get("host"), () => {
  console.log(
    `hello Server is running at http://${app.get("host")}:${app.get("port")}`
  );
});
