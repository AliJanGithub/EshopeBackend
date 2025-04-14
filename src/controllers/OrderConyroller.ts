import { Request, Response } from "express";
import Order from "../models/Order";
import Product from "../models/Products";

// Create Order
export const createOrder = async (req: Request, res: Response) => {
  try {
    const {  products } = req.body;
    const userId=req.user._id;

    let totalAmount = 0;
    for (const item of products) {
      const product = await Product.findById(item.productId);
      if (!product) return res.status(404).json({ success: false, message: "Product not found" });
      totalAmount += product.price * item.quantity;
    }

    const order = new Order({ userId, products, totalAmount });
    await order.save();
    
    res.status(201).json({ success: true, message: "Order created successfully", order });
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: "Server error",error });
  }
};

// Get All Orders
export const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find().populate("userId", "name email").populate("products.productId", "name price");
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get Single Order
export const getOrderById = async (req: Request, res: Response) => {
  try {
    const  id  = req.user._id;
    const proid=req.params.id
    const order = await Order.findById(proid).populate("userId", "name email").populate("products.productId", "name price");

    if (!order) return res.status(404).json({ success: false, message: "Order not found" });

    res.status(200).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Update Order Status
export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const  id  = req.user._id;
    const { status } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(id, { status }, { new: true, runValidators: true });

    if (!updatedOrder) return res.status(404).json({ success: false, message: "Order not found" });

    res.status(200).json({ success: true, message: "Order status updated", order: updatedOrder });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};



export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params; // Get order ID from params
    const userId = req.user.id; // Get logged-in user's ID (assuming authentication middleware)

    // Find the order to check if it belongs to the user
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    // Check if the logged-in user is the owner of the order
    if (order.userId.toString() !== userId.toString()) {
      return res.status(403).json({ success: false, message: "Unauthorized: You can't delete this order" });
    }

    // Delete the order since the user is authorized
    await Order.findByIdAndDelete(orderId);

    res.status(200).json({ success: true, message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

