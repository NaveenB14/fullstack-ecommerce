import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1
        className="text-xl font-bold cursor-pointer"
        onClick={() => navigate("/products")}
      >
        🛒 MyShop
      </h1>

      <div className="space-x-4">
        <button
          onClick={() => navigate("/products")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Products
        </button>

        <button
          onClick={() => navigate("/cart")}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Cart
        </button>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;