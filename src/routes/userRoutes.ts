import express from "express";
import { registerUser, loginUser, getUserDetails } from "../controllers/UserController";
import  AuthenticateUser  from "../middlewares/AuthenticateUser";

const userRoutes = express.Router();

// Ensure your functions follow `RequestHandler` type
userRoutes.post("/signup", registerUser as express.RequestHandler);
userRoutes.post("/login", loginUser as express.RequestHandler);
userRoutes.get("/profile", AuthenticateUser as express.RequestHandler, getUserDetails as express.RequestHandler);

export default userRoutes;
