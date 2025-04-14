import { Request, Response } from "express";
import Product from "../models/Products";
import { ErrorResponse } from "../utils/ErrorHandler";

export const uploadProduct = async (req: Request, res: Response) => {
  try {
    const {name,description,price,category,stock } = req.body;
    const images = req.files ? (req.files as Express.Multer.File[]).map(file => ({
      data: file.buffer.toString("base64"), // Convert to Base64
      contentType: file.mimetype
    })) : [];  
    const {id}=req.user;
    console.log(req.body)
    if (!name || !description || !price || !category || !stock) {
      return ErrorResponse(res, 400, "All fields are required");
    }

    const newProduct = new Product({ name, description, price, category, stock, images,uploaderId:id });
    await newProduct.save();

    res.status(201).json({ success: true, message: "Product uploaded successfully", product: newProduct });
  } catch (error) {
    console.log(error)
    return ErrorResponse(res, 500, "Server error");
  }
};

export const getProducts=async(req: Request, res: Response)=>{
    const product=await Product.find();
    res.status(200).json({success:true,message:"Products fetched successfully",products:product});
}

export const getProductById=async(req:Request,res:Response)=>{
      const {id}=req.params;
      const product=await Product.findById(id);
      if(!product)return ErrorResponse(res,401,"No product match the id")
        res.status(200).json({success:true,message:"Product fetched successfully",product:product});
}

export const searchProducts=async(req:Request,res:Response)=>{
    try {
        const {name}=req.query;
        if (!name) {
            return res.status(400).json({ success: false, message: "Product name is required" });
          }
          const product=await Product.find({name:{$regex:name,$options:"i"}});
          res.status(200).json({success:true,message:"Products fetched successfully",products:product});
    } catch (error) {
        console.log(error)
    }
  
}



export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      res.status(401).json({ success: false, message: "No product matches the ID" });
      return;
    }

    const userId = req.user._id;
    if (userId.toString() !== product.uploaderId.toString()) {
      res.status(403).json({ success: false, message: "Unauthorized: You can't delete this product" });
      return;
    }

    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Product deleted successfully" });

  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};


export const updateProduct = async (req: Request, res: Response):Promise<void> => {
    try {
      const { id } = req.params;
      const userId=req.user._id
      const { name, description, price, category, stock } = req.body;
      if (!id) {
       
        res.status(400).json({ success: false, message: "Product ID is required" });
        return ;
      }
      const product = await Product.findById(id);

  if(userId?.toString()!==product?.uploaderId.toString()){
    res.status(404).json({ success: false, message: "Product not found" });
    return;
  }
    

  
      const updatedProduct = await Product.findByIdAndUpdate(
        id, 
        { name, description, price, category, stock },
        { new: true, runValidators: true } 
      );
  
     
  
      res.status(200).json({ success: true, message: "Product updated successfully", product: updatedProduct });
    } catch (error) {
      res.status(500).json({ success: false, message: "Server error" });
    }
  };