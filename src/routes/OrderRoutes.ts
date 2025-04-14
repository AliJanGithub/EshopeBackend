
import express from "express";
import {createOrder,deleteOrder,getOrderById,getOrders,updateOrderStatus} from "../controllers/OrderConyroller"
import AuthenticateUser from "../middlewares/AuthenticateUser";


const oredrRoutes=express.Router()

oredrRoutes.post("/createorder",AuthenticateUser as express.RequestHandler,createOrder   as express.RequestHandler )
oredrRoutes.get("/",AuthenticateUser as express.RequestHandler,getOrders   as express.RequestHandler )

oredrRoutes.delete("/delete/:orderId",AuthenticateUser as express.RequestHandler,deleteOrder  as express.RequestHandler)
oredrRoutes.get("/userOrders/:id",AuthenticateUser as express.RequestHandler,getOrderById  as express.RequestHandler)
oredrRoutes.put("/updateorderstatus/:id",AuthenticateUser as express.RequestHandler,updateOrderStatus  as express.RequestHandler)


export {oredrRoutes}