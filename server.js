import "dotenv/config.js";
import express from 'express';
import cors from "cors";
import morgan from "morgan";
import {connectDB} from "./config/db.js";
import productRoutes from "./routes/productRoutes.js"
import cartRoutes from "./routes/cartRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import {notFound, errorHandler} from './middleware/errorhandler.js'

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.get("/", (_req, res) => res.send("ShoppyGlobe API is running"));

app.use("/products", productRoutes);
app.use("/cart", cartRoutes);
app.use("/", authRoutes);//register-login

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));