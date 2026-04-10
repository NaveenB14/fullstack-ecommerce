import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

function Cart() {
  const [cart, setCart] = useState(null);
  const token = localStorage.getItem("token");

  // ✅ FETCH CART
  const fetchCart = async () => {
    try {
      const res = await API.get("/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart(res.data);
    } catch (err) {
      console.log("Fetch cart error:", err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // ✅ UPDATE QUANTITY
  const updateQuantity = async (productId, quantity) => {
    try {
      await API.put(
        "/cart",
        { productId, quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      fetchCart();
    } catch (err) {
      console.log("Update error:", err);
    }
  };

  // ✅ CALCULATE TOTAL
  const total =
    cart?.products?.reduce(
      (sum, item) => sum + item.productId.price * item.quantity,
      0,
    ) || 0;

  // ✅ FAKE PAYMENT + ORDER
  const handlePayment = async () => {
    try {
      console.log("PAY CLICKED");

      alert("Processing payment... ⏳");

      await new Promise((resolve) => setTimeout(resolve, 2000));

      await API.post(
        "/orders",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      alert("Payment Successful ✅");

      window.location.href = "/orders"; // redirect
    } catch (err) {
      console.log("Payment error:", err);
      alert("Payment Failed ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="p-6">
        <h2 className="text-3xl font-bold text-center mb-6">Your Cart 🛒</h2>

        {!cart || cart.products.length === 0 ? (
          <p className="text-center text-gray-500">Cart is empty</p>
        ) : (
          <>
            <div className="space-y-4 max-w-xl mx-auto">
              {cart.products.map((item, index) => (
                <div key={index} className="bg-white p-4 rounded-xl shadow-md">
                  <p className="font-semibold">{item.productId?.name}</p>

                  <p className="text-gray-500 text-sm">
                    ₹ {item.productId?.price}
                  </p>

                  {/* QUANTITY */}
                  <div className="flex items-center gap-3 mt-3">
                    <button
                      onClick={() =>
                        updateQuantity(item.productId._id, item.quantity - 1)
                      }
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      -
                    </button>

                    <span className="font-bold">{item.quantity}</span>

                    <button
                      onClick={() =>
                        updateQuantity(item.productId._id, item.quantity + 1)
                      }
                      className="bg-green-500 text-white px-3 py-1 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* TOTAL */}
            <div className="text-center mt-6">
              <h2 className="text-xl font-bold">Total: ₹ {total}</h2>
            </div>

            {/* PAY BUTTON */}
            <div className="text-center mt-6">
              <button
                onClick={handlePayment}
                className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
              >
                Pay Now 💳
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;
