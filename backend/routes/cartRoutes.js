import express from "express";
import Cart from "../models/Cart.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// ADD TO CART
router.post("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        products: [{ productId, quantity }],
      });
    } else {
      const index = cart.products.findIndex(
        (p) => p.productId.toString() === productId,
      );

      if (index > -1) {
        cart.products[index].quantity += quantity;
      } else {
        cart.products.push({ productId, quantity });
      }
    }

    await cart.save();

    // populate product details
    const updatedCart = await Cart.findOne({ userId }).populate(
      "products.productId",
    );

    res.json(updatedCart);
  } catch (error) {
    console.log("Cart error:", error);
    res.status(500).json({ message: error.message });
  }
});
// GET CART
router.get("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await Cart.findOne({ userId }).populate("products.productId"); // ✅ correct place

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    const cart = await Cart.findOne({ userId });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.products.find(
      (p) => p.productId.toString() === productId,
    );

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    // Update quantity
    if (quantity < 1) {
      cart.products = cart.products.filter(
        (p) => p.productId.toString() !== productId,
      );
    } else {
      item.quantity = quantity;
    }

    await cart.save();

    res.json(cart);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});
export default router;
