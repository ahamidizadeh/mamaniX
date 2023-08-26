import React, { useState, useContext, createContext } from "react";
import Modal from "react-modal";
import { useAuth } from "../utils/AuthContext";
import RegisterModal from "./RegisterModal";
import LoginModal from "./LoginModal";
import "./styles/HomePage.css";

function HomePage() {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  return (
    <div className="homepage">
      <div className="homepage-intro">
        <h1>Welcome to Mamani's kitchen!</h1>
      </div>
      <div className="homepage-buttons">
        <h1>Get Started</h1>
        <button onClick={() => setShowRegisterModal(true)}>Register</button>
        <button onClick={() => setShowLoginModal(true)}>Login</button>
      </div>
      <Modal
        isOpen={showRegisterModal}
        onRequestClose={() => setShowRegisterModal(false)}
        style={{
          overlay: {
            backgroundColor: "black",
          },
          content: {
            backgroundColor: "pink",
          },
        }}
      >
        <RegisterModal closeModal={() => setShowRegisterModal(false)} />
      </Modal>

      <Modal
        isOpen={showLoginModal}
        onRequestClose={() => setShowLoginModal(false)}
        style={{
          overlay: {
            backgroundColor: "black",
          },
          content: {
            backgroundColor: "black",
          },
        }}
      >
        <LoginModal
          closeModal={() => setShowLoginModal(false)}
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
        />
      </Modal>
    </div>
  );
}

export { HomePage };
