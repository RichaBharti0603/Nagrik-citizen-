import React, { useState } from "react";
import axios from "axios";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // Default to "user"

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
        role
      });

      // Store token in localStorage
      localStorage.setItem("token", res.data.token);
      alert("Login successful!");

      // Redirect based on role
      if (role === "officer") {
        window.location.href = "/officer-dashboard";
      } else {
        window.location.href = "/user-dashboard";
      }
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login to Nagrik</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <select value={role} onChange={(e) => setRole(e.target.value)} required>
          <option value="user">User</option>
          <option value="officer">Officer</option>
        </select>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
