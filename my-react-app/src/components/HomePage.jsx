import React, { useState } from "react";
import Modal from "react-modal";
import RegisterModal from "./RegisterModal";
import LoginModal from "./LoginModal";

function HomePage() {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <div>
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
        <LoginModal closeModal={() => setShowLoginModal(false)} />
      </Modal>
    </div>
  );
}

export default HomePage;
