import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AuthModal.css"; // Custom styles

const AuthModal = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState("user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isLogin ? "login" : "signup";
      const res = await axios.post(`http://localhost:5000/api/auth/${endpoint}`, {
        email,
        password,
        role,
      });

      if (isLogin) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.role);
        onClose(); // Close modal
        window.location.href = res.data.role === "officer" ? "/admin" : "/mydashboard";
      } else {
        alert("Signup successful! Please login.");
        setIsLogin(true);
      }
    } catch (err) {
      alert(err.response?.data?.msg || "Authentication failed");
    }
  };

  return (
    <div className="auth-overlay">
      <div className="auth-modal">
        <button className="auth-close" onClick={onClose}>×</button>

        <h2>{isLogin ? "Login to Nagrik" : "Create Your Nagrik Account"}</h2>

        <form onSubmit={handleAuth}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="auth-role">
            <label>
              <input
                type="radio"
                name="role"
                value="user"
                checked={role === "user"}
                onChange={() => setRole("user")}
              />
              User
            </label>
            <label>
              <input
                type="radio"
                name="role"
                value="officer"
                checked={role === "officer"}
                onChange={() => setRole("officer")}
              />
              Officer / Mentor
            </label>
          </div>

          <button type="submit" className="auth-button">
            {isLogin ? "Login" : "Signup"}
          </button>
        </form>

        <p className="auth-switch">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? " Signup" : " Login"}
          </span>
        </p>

        <button
  className="guest-button"
  onClick={() => {
    localStorage.setItem("guest", "true");
    onClose(); // Close modal
  }}
>
  Continue as Guest
</button>

      </div>
    </div>
  );
};

export default AuthModal;
