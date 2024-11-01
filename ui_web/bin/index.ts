import express, { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { config } from "./config";
import cors from "cors";
import { AppContext } from "./declaration";
const app = express();
app.use(cors());
// Middleware to parse JSON
app.use(express.json());
const REFRESHTOKENCOOKIEKEY = "sso_refresh_token";

function getIndexHtml() {
  return fs
    .readFileSync(path.resolve(__dirname, "../www/index.html"))
    .toString();
}

var context = {}; 

app.get("/", (req, res) => {
    const template = getIndexHtml();
    const test = {
      env: "sđfds",
      test:"dfdjshkf"
    }
    const responseHtml = template
      .replace(
        "/\$sso-refresh-token\$/g",
        `${config.APP_HOST}:${config.APP_PORT}/refreshtoken`
      )
      .replace('/\$sso-redirect-url\$/g', `${config.APP_HOST}:${config.APP_PORT}/identity`)
      // .replace('$context$', JSON.stringify(JSON.stringify(context)))
    res.send(responseHtml);
  }
);


app.get("/identity", (req: Request, res: Response) => {
  res.render("login", { registerurl: "" });
});

app.post("/login", async (req: Request, res: Response, next ) => {
  try{
  // const email = req.body.email;
  // const password = req.body.password;
  // if (!email || !password) {
  //   res.status(500).json("email or password empty");
  // }

  // await fetch(config.SSO_URL, {
  //   method: "POST",
  //   mode: "cors",
  //   cache: "no-cache",
  //   credentials: "same-origin",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   redirect: "follow",
  //   referrerPolicy: "no-referrer",
  //   body: JSON.stringify({
  //     email: email,
  //     password: password,
  //   }),
  // })
  //   .then((response) => {
  //     if (!response.ok) {
  //       return Promise.reject(`Error: ${response.status}`);
  //     }
  //     return response.json();
  //   })
  //   .then((data) => {
    try{
      const appContext: AppContext = {
        env: config.NODE_ENV,
        apiUrl: config.DEFAULT_API_URL,
        ssoUrl: config.SSO_URL,
        loginResult: true,
        token: "dfdsfsdfsdf",
        // expiredTime: data.expiredTime,
      };
      // if (data.refresh_token) {
      //   const date = new Date();
      //   res.cookie(REFRESHTOKENCOOKIEKEY, data.refresh_token, {
      //     maxAge: date.getTime() + 5 * 24 * 60 * 60 * 1000,
      //     secure: true,
      //     sameSite: "strict",
      //     httpOnly: true,
      //   });
      // }
    
      const template = getIndexHtml();
      const responseHtml = template.replace(
        '$context$',
        JSON.stringify(appContext) // the purpose of the second "stringify" is to escape characters to avoid XXS issue
      ).replace('/\$sso-redirect-url\$/g', `${config.APP_HOST}:${config.APP_PORT}/identity234`)
      res.send(responseHtml);
    }
    catch (e) {
      console.log(e);
    }
        // })
        // .catch((error) => {
        //   console.error("Error logging in:", error);
        //   res.status(500).json("server error");
        // });
  }
  catch( e){
    console.log(e);
    next(e)
  }

});
app.use(
  express.static(path.resolve(__dirname, "../www")),
  express.json({ limit: "500kb" }),
  express.urlencoded({ extended: true, limit: "500kb" })
);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "view"));
app.post("/register", (req: Request, res: Response) => {
  res.send("register");
});
app.get("/refreshtoken", (req: Request, res: Response) => {
  res.send("Hello, TypeScript with Express!");
});

app.get("/test", (req: Request, res: Response) => {
  res.send("Hello, TypeScript with Express!");
});
// app.use("*", (req, res) => res.redirect("/"));
// catch exception and log
app.use((err: any, req: any, res: any, next: any) => {
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
app.listen(config.APP_PORT, config.APP_HOST, () => {
  console.log(
    `Server is running at http://${config.APP_HOST}:${config.APP_PORT}`
  );
});
