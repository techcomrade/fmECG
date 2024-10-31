import express, { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { config } from "./config";
const app = express();

// Middleware to parse JSON
app.use(express.json());

function getIndexHtml() {
  return fs
    .readFileSync(path.resolve(__dirname, "../www/index.html"))
    .toString();
}
app.use(
  express.static(path.resolve(__dirname, "../www")),
  express.json({ limit: "500kb" }),
  express.urlencoded({ extended: true, limit: "500kb" })
);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "view"));

app.get("/", (req, res) => {
  const termplate = getIndexHtml();
  res.send(termplate);
});

app.get("/identity", (req: Request, res: Response) => {
  res.render("login", { loginurl: "dsfdsfdsf", registerurl: "" });
});
app.post("/login", async (req: Request, res: Response)=> {
  const email = req.body.email;
  const password = req.body.password;
  if(!email || !password) {
    return res.status(404).json("lack of email or password");
  }

  // console.log(config.SSO_URL);
  // console.log(email);
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
  //       throw new Error("login failed" + response.statusText);
  //     }
  //     return response.json();
  //   })
  //   .then((data) => {
  //     // const termplate = getIndexHtml();
  //     // let context: AppContext = {
  //     //   env: config.NODE_ENV,
  //     //   ssoUrl: `${config.APP_HOST}:${config.APP_PORT}/login`,
  //     //   apiUrl: config.DEFAULT_API_URL,
  //     //   token: data.access_token || "",
  //     //   loginResult: true,
  //     // }
  //     console.log(data);
  //     res.send("DSfdsf")
  //   })
  //   .catch((error) => {
  //     res.status(500).json("error")
  //   });
  //   res.status(500).json("error")
});
app.post("/register", (req: Request, res: Response) => {
  res.send("register");
});
app.post("/refreshtoken", (req: Request, res: Response) => {
  res.send("Hello, TypeScript with Express!");
});

app.get("/test", (req: Request, res: Response) => {
  res.send("Hello, TypeScript with Express!");
});

app.use("*", (req, res) => res.redirect("/"));
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
