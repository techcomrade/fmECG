const express = require("express");
const bodyParser = require("body-parser");
const config = require("./config");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "./build")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: "application/json" }));
app.use(bodyParser.raw());
app.set("host",config.default_app_host);
app.set("port", config.default_app_port);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));
app.set("views", __dirname + "/views");
app.use(cookieParser());
app.use(cors());

app.get("/login", (req, res) => {
  const haveCookie = req.cookies?.access_token;
  if (haveCookie) {
      res.redirect(config.redirect_url)
  } else {
    res.render("index", {
      url: `${config.default_app_host}:${config.default_app_port}/login`,
    });
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
        const isDevEnv = config.default_api_url.match("127.0.0.1:3000") != null
        res.cookie("user", userInfo.metadata.id);
        res.cookie("access_token", userInfo.metadata.access_token, {
          maxAge: 60000 * userInfo.metadata.expired_time,
          httpOnly: false,
        });
        res.cookie("refresh_token", userInfo.metadata.refresh_token);
        res.cookie("role", userInfo.metadata.role);
        res.cookie("api", isDevEnv ? config.default_api_url : `${config.redirect_url}/api`);
        res.cookie("redirect_api", isDevEnv ? `http://${config.default_app_host}:${config.default_app_port}/login` : `${config.redirect_url}/login`);
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
