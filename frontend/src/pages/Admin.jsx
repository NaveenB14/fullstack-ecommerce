import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

function Admin() {
  const [products, setProducts] = useState([]);

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    image: "",
  });
  const [editId, setEditId] = useState(null);

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      price: product.price,
      description: product.description,
      category: product.category,
      image: product.image,
    });

    setEditId(product._id);
  };

  const fetchProducts = async () => {
    const res = await API.get("/products");
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ADD PRODUCT
  const handleAdd = async () => {
    await API.post("/products", form);
    fetchProducts();
  };

  // DELETE PRODUCT
  const handleDelete = async (id) => {
    await API.delete(`/products/${id}`);
    fetchProducts();
  };

  const handle = async () => {
    try {
      await API.put(`/products/${editId}`, form);

      setEditId(null);
      setForm({
        name: "",
        price: "",
        description: "",
        category: "",
        image: "",
      });

      fetchProducts();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="p-6 max-w-xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>

        {/* FORM */}
        <div className="bg-white p-4 rounded shadow mb-6 space-y-2">
          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border p-2"
          />
          <input
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="w-full border p-2"
          />
          <input
            placeholder="Category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full border p-2"
          />
          <input
            placeholder="Image URL"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            className="w-full border p-2"
          />
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full border p-2"
          />

          <button
            onClick={handleAdd}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Product
          </button>
        </div>

        {/* PRODUCT LIST */}
        {products.map((p) => (
          <div key={p._id} className="bg-white p-3 mb-3 rounded shadow">
            <p className="font-bold">{p.name}</p>
            <p>₹ {p.price}</p>

            <div className="flex gap-2 mt-2">
              <button
                onClick={() => handleEdit(p)}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(p._id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
           
          </div>
        ))}
      </div>
    </div>
  );
}

export default Admin;
