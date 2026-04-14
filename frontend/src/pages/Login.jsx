import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Loader from "../components/Loader";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setLoading(true);

      const res = await API.post("/users/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      alert("Login successful ✅");
      navigate("/products");
    } catch (err) {
      alert("Login failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-80 space-y-3 text-center">
        <h2 className="text-xl font-bold">Login</h2>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2"
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2"
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader />
              Logging in...
            </>
          ) : (
            "Login"
          )}
        </button>

        <p>
          Don't have account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-500 cursor-pointer"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
