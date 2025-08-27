import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      unique: true,          // one cart per user
      required: true
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",    // link to Product collection
          required: true
        },
        name: { type: String, required: true },   // product name snapshot
        price: { type: Number, required: true },  // product price snapshot
        quantity: {
          type: Number,
          required: true,
          min: 1
        }
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model("Cart", cartSchema);
