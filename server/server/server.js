const dotenv = require("dotenv");
const app = require("./app");
// const User = require("./Models/userModel");
const path = require('path');
dotenv.config({ path: "./config.env" });

app.get("/", (req, res) => {
    res.send("server");
});

const http = require("http").createServer(app);
http.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
