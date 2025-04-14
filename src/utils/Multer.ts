import multer, { FileFilterCallback } from "multer";
import { Request } from "express";

const storage = multer.memoryStorage(); // Store files in memory instead of disk

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  const allowedTypes = /jpeg|jpg|png/;
  if (allowedTypes.test(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only images (JPEG, JPG, PNG) are allowed"));
  }
};

const upload = multer({ storage, fileFilter });

export default upload;
