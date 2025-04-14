import mongoose, { Schema, Document, Model } from "mongoose";

// Define the Order interface
interface IOrder extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  products: {
    productId: mongoose.Schema.Types.ObjectId;
    quantity: number;
  }[];
  totalAmount: number;
  status: string;
}


const orderSchema = new Schema<IOrder>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    products: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, required: true },
      },
    ],
    totalAmount: { type: Number, required: true },
    status: { type: String, default: "Pending" },
  },
  { timestamps: true } 
);


const Order: Model<IOrder> = mongoose.model<IOrder>("Order", orderSchema);
export default Order;
