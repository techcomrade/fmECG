const dotenv = require("dotenv");
const app = require("./app");
// const User = require("./Models/userModel");
const path = require('path');
dotenv.config({ path: "./config.env" });


const http = require("http").createServer(app);
http.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));


// const express = require('express');
// const app = express();
// app.get("/", (req,res) => {
//   res.send("abc");
// });

// app.listen(5000, () => {
//   console.log("server");
// });