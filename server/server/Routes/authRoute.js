import express from 'express';
import bodyParser from 'body-parser';
import { register, login, logout, resetPasswordToken, resetPassword, isLogin } from '../Controllers/authController.js';
const authRoute = express.Router();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

authRoute.post("/register",register);
authRoute.post("/login", login);
authRoute.post("/reset-password", resetPasswordToken);
authRoute.post("/reset-password/reset", resetPassword);
authRoute.get("/logout", logout);
authRoute.get("/is-login", isLogin);

export default authRoute;
