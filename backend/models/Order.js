import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
      },
      quantity: Number
    }
  ],
  totalAmount: Number,
  status: {
    type: String,
    default: "pending"
  }
}, { timestamps: true });


const Order = mongoose.model("Order", orderSchema);

export default Order;