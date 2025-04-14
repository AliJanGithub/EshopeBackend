import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { ErrorResponse } from "../utils/ErrorHandler";




export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  if(!email || !name || !password) return ErrorResponse(res,401,"fill details")

  try {
    
    const userExists = await User.findOne({ email });
    if (userExists) return ErrorResponse(res, 400, "User already exists");

    
    const hashedPassword = await bcrypt.hash(password, 10);

    
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    return res.status(201).json({ success: true, message: "User registered successfully" });
  } catch (error) {
   console.log(error)
  }
};


export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
   
    const user = await User.findOne({ email });
    if (!user) return ErrorResponse(res, 400, "Invalid email or password");

   
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return ErrorResponse(res, 400, "Invalid email or password");

   
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" } 
    );

    return res.json({ success: true, token });
  } catch (error) {
    console.log(error);
  }
};
export const getUserDetails = async (req: Request, res: Response) => {
  try {
    if (!req.user) return ErrorResponse(res, 401, "Unauthorized");

    const user = await User.findById(req.user.id).select("-password");

    if (!user) return ErrorResponse(res, 404, "User not found");

    res.json({ success: true, user });
  } catch (error) {
    console.log(error);
    return ErrorResponse(res, 500, "Internal Server Error");
  }
};