
import express from "express";
import {deleteProduct,getProductById,getProducts,searchProducts,updateProduct,uploadProduct} from "../controllers/ProductsControllers"
import AuthenticateUser from "../middlewares/AuthenticateUser";
import upload from "../utils/Multer";

const productRoutes=express.Router()

productRoutes.get("/products",getProducts   as express.RequestHandler )
productRoutes.post(
    "/upload",
    AuthenticateUser as express.RequestHandler,
    upload.array(  "images", 5), 
    uploadProduct as express.RequestHandler
  );
productRoutes.delete("/delete/:id",AuthenticateUser as express.RequestHandler,deleteProduct  as express.RequestHandler)
productRoutes.get("/searchproduct",searchProducts  as express.RequestHandler)
productRoutes.put("/updateproduct/id",AuthenticateUser as express.RequestHandler,updateProduct  as express.RequestHandler)


export {productRoutes}