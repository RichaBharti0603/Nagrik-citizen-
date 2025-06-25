import React, { useState } from "react";
import axios from "axios";
import "./Login.css";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/signup", {
        username,
        password,
      });
      alert("Signup successful! Please login.");
      window.location.href = "/login";
    } catch (err) {
      alert(err.response?.data?.msg || "Signup failed");
    }
  };

  return (
    <div className="auth-container">
      <h2>Create your Nagrik Account</h2>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Choose a Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Choose a Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default Signup;
