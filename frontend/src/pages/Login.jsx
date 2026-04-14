import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Loader from "../components/Loader";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true); // 🔥 start loading

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
      setLoading(false); // 🔥 stop loading
    }
  };

  <p>
    Don't have account?{" "}
    <span onClick={() => navigate("/register")}>Register</span>
  </p>;

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>Login</h2>

      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ padding: "10px", margin: "10px", width: "250px" }}
      />
      <br />

      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ padding: "10px", margin: "10px", width: "250px" }}
      />
      <br />

      <button
        onClick={handleLogin}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded flex items-center justify-center gap-2"
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
    </div>
  );
}

export default Login;
