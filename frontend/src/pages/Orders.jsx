import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

function Orders() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");

  const fetchOrders = async () => {
    const res = await API.get("/orders", {
      headers: { Authorization: `Bearer ${token}` },
    });

    setOrders(res.data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">My Orders 📦</h2>

        {orders.map((o) => (
          <div key={o._id} className="bg-white p-4 mb-3 rounded shadow">
            <p>Order ID: {o._id}</p>
            <p>Status: {o.status}</p>

            {o.products.map((p, i) => (
              <p key={i}>
                {p.productId} × {p.quantity}
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
