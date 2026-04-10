import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post("/users/login", {
        email,
        password,
      });

      console.log("SUCCESS:", res.data);

      // store token
      localStorage.setItem("token", res.data.token);

      alert("Login successful 🚀");

      // redirect to products page
      navigate("/products");
    } catch (err) {
      console.log("ERROR:", err.response?.data || err.message);
      alert("Login failed ❌");
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
        style={{
          padding: "10px 20px",
          marginTop: "10px",
          cursor: "pointer",
        }}
      >
        Login
      </button>
    </div>
  );
}

export default Login;
