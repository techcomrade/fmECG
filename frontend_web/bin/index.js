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
    res.render("index", { url: `http://127.0.0.1:3001` });
  }
});

app.post("/login");

app.get("/logout", (req, res) => {
  res.cookie("token", "");
  res.send("logout success");
});

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
