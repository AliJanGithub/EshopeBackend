import mongoose, { Schema, Document, Model } from "mongoose";


interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  images: string[];
  uploaderId:mongoose.Schema.Types.ObjectId;
}


const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    category: { type: String, required: true },
    stock: { type: Number, required: true, min: 0 },
    
    images: [
      {
        data: String, // Base64 string
        contentType: String, // image/png, image/jpeg
      }
    ],
    uploaderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  
  },
  { timestamps: true } 
);


const Product: Model<IProduct> = mongoose.model<IProduct>("Product", productSchema);
export default Product;
