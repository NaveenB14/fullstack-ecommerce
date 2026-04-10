import express from "express";
import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// PLACE ORDER
router.post("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await Cart.findOne({ userId });

    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const totalAmount = cart.products.length * 100; // simple logic

    const order = new Order({
      userId,
      products: cart.products,
      totalAmount,
    });

    await order.save();

    // clear cart
    await Cart.findOneAndDelete({ userId });

    res.json({
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", authMiddleware, async (req, res) => {
  const userId = req.user.id;

  const cart = await Cart.findOne({ userId });

  if (!cart || cart.products.length === 0) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  const totalAmount = cart.products.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  const order = new Order({
    userId,
    products: cart.products,
    totalAmount,
    status: "pending",
  });

  await order.save();

  cart.products = [];
  await cart.save();

  res.json(order);
});

router.get("/", authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
