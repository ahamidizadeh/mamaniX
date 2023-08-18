import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../utils/api";
import "./styles/LoginModal.css";

function LoginModal({ closeModal, setAuthenticated }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    const userData = { username, password };
    try {
      const response = await api.post("/login", userData);

      if (response.status === 200) {
        // setAuthenticated(true);
        const token = response.data.token;
        console.log(token);
        localStorage.setItem("authToken", token);

        closeModal();
        navigate("/dashboard");
        console.log("you are logged in!", token);
      } else {
        console.log("your credentials are not correct");
      }
    } catch (error) {
      console.log("error during login:", error);
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
