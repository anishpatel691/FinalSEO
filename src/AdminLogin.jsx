import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const API_URL = "https://finalseobackend-1.onrender.com/api/admin/login";

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(API_URL, { username, password });

      if (res.data.success) {
        localStorage.setItem("admin-auth", "true");
        localStorage.setItem("admin-username", username);
        localStorage.setItem("loginTime", new Date().toISOString());
        localStorage.setItem("lastLoginTime", res.data.lastLogin);
        navigate("/admin-panel");
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      console.error(err);
      setError("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "30px", maxWidth: "400px", margin: "auto" }}>
      <h2>🔐 Admin Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{ width: "100%", marginBottom: "10px" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: "100%", marginBottom: "10px" }}
        />

        <button type="submit" style={{ width: "100%" }} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        {loading && <p>⏳ Please wait...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default AdminLogin;
