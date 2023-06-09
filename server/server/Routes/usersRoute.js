import express from 'express';
import bodyParser from 'body-parser';
import { updateUserInfo, changePassword, getUserProfile, getAllUsers, getUserById } from '../Controllers/userController.js';


const usersRoute = express.Router();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

usersRoute.put("/profile", updateUserInfo);
usersRoute.put("/change-password", changePassword);
usersRoute.get("/profile", getUserProfile);
usersRoute.get("/", getAllUsers);
usersRoute.get("/:userId", getUserById);

export default usersRoute;
