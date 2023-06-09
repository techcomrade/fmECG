import dotenv from "dotenv";
import app from "./app.js";
import http from 'http';
import path from 'path';


dotenv.config({ path: "./config.env" });

app.get("/", (req, res) => {
    res.send("server");
});

const server = http.createServer(app);
server.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
