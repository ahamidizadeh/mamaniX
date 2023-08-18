import React, { useState } from "react";
import "./styles/RegisterModal.css";
// import axios from "axios";
import api from "../utils/api";
function RegisterModal({ closeModal }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (event) => {
    event.preventDefault();

    const userData = { username, password };

    try {
      const response = await api.post("/register", userData);

      if (response.status === 201) {
        const token = response.data.token;

        console.log("you are now registered!", token);
        localStorage.setItem("authToken", token);
      } else {
        console.log("registration failed");
      }
    } catch (error) {
      console.log("Error during registration:", error);
    }
  };
  return (
    <div className="modal-container">
      <h2 className="modal-title">Register</h2>
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
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="button-container">
          <button className="button" onClick={handleRegister}>
            Register
          </button>
          <button className="button" onClick={closeModal}>
            Close
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegisterModal;
