import React, { useState } from "react";
import axios from "axios";
import "./Login.css"; // assumes styles are already updated as shared before

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user"); // default to user
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/signup", {
        name,
        email,
        password,
        role,
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
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Choose a Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Radio Button Role Selection */}
        <div className="auth-role-options">
          <label className="role-option">
            <input
              type="radio"
              name="role"
              value="user"
              checked={role === "user"}
              onChange={() => setRole("user")}
            />
            User
          </label>
          <label className="role-option">
            <input
              type="radio"
              name="role"
              value="officer"
              checked={role === "officer"}
              onChange={() => setRole("officer")}
            />
            Officer
          </label>
        </div>

        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default Signup;
