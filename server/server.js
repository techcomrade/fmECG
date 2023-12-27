const dotenv = require("dotenv");
const app = require("./app");
// const path = require('path');
const {createUsers, deleteAllUsers} = require('./dummy/dummyUser');


dotenv.config({ path: "./config.env" });


app.get("/", (req, res) => {
  res.redirect("/admin");
});

// const dummyDataEnabled = process.env.DUMMY_DATA === 'true';
// if (dummyDataEnabled) {
//     deleteAllUsers();
  
//     createUsers(0, 1000);
  
//     createUsers(1, 500);
//   }

const http = require("http").createServer(app);
http.listen(process.env.APP_PORT, () => console.log(`Server running on port ${process.env.APP_PORT}`));
