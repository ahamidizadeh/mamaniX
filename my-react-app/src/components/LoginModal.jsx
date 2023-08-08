import React, { useState } from "react";
import axios from "axios";
import "./styles/LoginModal.css";

function RegisterModal({ closeModal }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    const userData = { username, password };
    try {
      const response = await axios.post(
        "http://localhost:1234/api/login",
        userData
      );

      if (response.status === 200) {
        console.log("you are logged in!");
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

export default RegisterModal;
