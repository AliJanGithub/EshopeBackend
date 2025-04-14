import { Response } from "express"; 


export const ErrorResponse = (res: Response, status: number, message: string) => {
  return res.status(status).json({ success: false, message });
};
