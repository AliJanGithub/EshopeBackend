import jwt from "jsonwebtoken";
import Usermodel from "../models/User";
import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "../utils/ErrorHandler";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

const AuthenticateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.headers.authorization;
    
    if (!token || !token.startsWith("Bearer ")) {
      ErrorResponse(res, 401, "Please provide a valid token");
      return; 
    }

    const decodedToken = token.split(" ")[1];
    const decoded = jwt.verify(decodedToken, process.env.JWT_SECRET as string) as { id: string; isAdmin: boolean };

    const user = await Usermodel.findById(decoded.id);
    if (!user) {
      ErrorResponse(res, 401, "User not found");
      return; 
    }

    req.user = user;
    next(); 
  } catch (error) {
    ErrorResponse(res, 401, "Invalid token");
    return;
  }
};

export default AuthenticateUser;
