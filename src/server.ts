import express from "express";
import dotenv from "dotenv";
import dzConn from './configs/dbConn'
import  userRoutes  from "./routes/userRoutes";
import { productRoutes } from "./routes/ProductsRoutes";
import { oredrRoutes } from "./routes/OrderRoutes";
import cors from "cors";
dotenv.config();

const app = express();
app.use(cors())
app.use(express.json({ limit: '10mb' })); // or even 20mb depending on image size
app.use(express.urlencoded({ limit: '10mb', extended: true }));
dzConn()
try {
    
} catch (error) {
    console.log(error)
}
app.get("/", (req, res) => {
  res.send("Server is running!");
});
app.use("/user",userRoutes)
app.use("/product",productRoutes)
app.use("/order",oredrRoutes)

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`✅ Server is running on port ${port}`);
})
