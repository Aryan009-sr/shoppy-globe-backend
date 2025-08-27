import "dotenv/config.js";
import mongoose from "mongoose";
import {connectDB} from "../config/db.js";
import Product from "../models/Product.js"

const products = [
      { name: "Wireless Mouse", price: 799, description: "Ergonomic, 2.4GHz", stock: 25 },
  { name: "Mechanical Keyboard", price: 3499, description: "Blue switches", stock: 10 },
  { name: "USB-C Cable", price: 299, description: "1m braided cable", stock: 100 }
];

(async () => {
    try{
        await connectDB();
        await Product.deleteMany();
        await Product.insertMany(products);
        console.log("Seeded products");
        await mongoose.disconnect();
        process.exit(0);
        // process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
})();