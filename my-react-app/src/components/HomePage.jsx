import React, { useState, useContext, createContext } from "react";
import Modal from "react-modal";
import { useAuth } from "../utils/AuthContext";
import RegisterModal from "./RegisterModal";
import LoginModal from "./LoginModal";

function HomePage() {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useAuth();

  console.log(isAuthenticated);
  return (
    <div className="homepage">
      <h1>MamaniX welcomes you!</h1>
      <p>Get started by registering or logging in :</p>

      <button onClick={() => setShowRegisterModal(true)}>Register</button>
      <button onClick={() => setShowLoginModal(true)}>Login</button>

      <Modal
        isOpen={showRegisterModal}
        onRequestClose={() => setShowRegisterModal(false)}
      >
        <RegisterModal closeModal={() => setShowRegisterModal(false)} />
      </Modal>

      <Modal
        isOpen={showLoginModal}
        onRequestClose={() => setShowLoginModal(false)}
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

// const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used withing an AuthContext.provider");
//   }

//   return context;
// };
export { HomePage };
