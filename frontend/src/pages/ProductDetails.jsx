import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await API.get(`/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.log("Error:", err);
      }
    };

    fetchProduct();
  }, [id]);

  const addToCart = async () => {
    try {
      await API.post(
        "/cart",
        { productId: id, quantity: 1 },
        {
          headers: {
            Authorization: token,
          },
        },
      );

      alert("Added to cart 🛒");
    } catch (err) {
      console.log(err);
    }
  };

  if (!product) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md mt-6">
        <img
          src={product.image || "https://via.placeholder.com/300"}
          alt={product.name}
          className="w-full h-80 object-cover rounded mb-6"
        />

        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>

        <p className="text-gray-500 mb-2">Category: {product.category}</p>

        <p className="text-gray-700 mb-4">{product.description}</p>

        <p className="text-xl font-bold mb-4">₹ {product.price}</p>

        <button
          onClick={addToCart}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Add to Cart 🛒
        </button>
      </div>
    </div>
  );
}

export default ProductDetails;
