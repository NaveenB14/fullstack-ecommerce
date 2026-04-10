import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function Products() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/products");

        console.log(res.data); // DEBUG

        setProducts(res.data || []); 
      } catch (err) {
        console.log(err);
        setProducts([]); 
      }
    };

    fetchProducts();
  }, []);

  const addToCart = async (productId) => {
    try {
      await API.post(
        "/cart",
        {
          productId,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        },
      );

      alert("Added to cart 🛒");
    } catch (err) {
      console.log("ADD ERROR:", err.response?.data || err.message);
      alert("Error adding to cart ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="p-6">
        <h2 className="text-3xl font-bold text-center mb-6">Products</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((p) => (
            <div
              key={p._id}
              onClick={() => navigate(`/product/${p._id}`)}
              className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition cursor-pointer"
            >
              <img
                src={p.image || "https://via.placeholder.com/300"}
                alt={p.name}
                className="w-full h-48 object-cover rounded mb-3"
              />

              <h3 className="text-xl font-semibold">{p.name}</h3>

              <p className="text-xs text-gray-400 mb-1">
                {p.category || "General"}
              </p>

              <p className="text-gray-500 text-sm mb-2">
                {p.description || "No description"}
              </p>

              <p className="text-gray-700 font-bold mb-3">₹ {p.price}</p>

              <button
                onClick={(e) => {
                  e.stopPropagation(); // prevents navigation
                  addToCart(p._id);
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-6">
          <button
            onClick={() => (window.location.href = "/cart")}
            className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
          >
            Go to Cart 🛒
          </button>
        </div>
      </div>
    </div>
  );
}

export default Products;
