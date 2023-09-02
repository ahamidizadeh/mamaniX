import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import "./styles/LoginModal.css";

function LoginModal({ closeModal, setIsAuthenticated }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    const userData = { username, password };
    try {
      const response = await api.post("/login", userData);

      if (response.status >= 200 && response.status < 300) {
        localStorage.setItem("isAuthenticated", true);
        setIsAuthenticated(true);
        const authToken = response.data.authToken;

        localStorage.setItem("authToken", authToken);

        closeModal();
        navigate("/dashboard/search");
      } else {
        console.log("your credentials are not correct");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log("Your session has expired. Please log in again."); // Handle expired token
      } else {
        console.log("error during login:", error);
      }
    }
  };
  return (
    <div className="modal-container">
      <h2 className="modal-title">Login</h2>
      <form>
        <input
          className="input-field"
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="input-field"
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="button-container">
          <button onClick={closeModal}>Close</button>
          <button onClick={handleLogin}>Login</button>
        </div>
      </form>
    </div>
  );
}

export default LoginModal;
