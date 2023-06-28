const dotenv = require("dotenv");
const app = require("./app");
// const User = require("./Models/userModel");
const path = require('path');
// const webpack = require('webpack');
// const webpackDevMiddleware = require('webpack-dev-middleware');
// const webpackConfig = require('./webpack.config.js');
// const compiler = webpack(webpackConfig);

dotenv.config({ path: "./config.env" });

// app.use(
//     webpackDevMiddleware(compiler, {
//       publicPath: webpackConfig.output.publicPath,
//     })
//   );
  

app.get("/", (req, res) => {
    res.send("server");
});

const http = require("http").createServer(app);
http.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
