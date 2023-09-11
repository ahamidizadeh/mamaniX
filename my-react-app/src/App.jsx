import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HomePage } from "./components/HomePage";
import Dashboard from "./components/Dashboard";
import { AuthProvider, useAuth } from "./utils/AuthContext";

import "./App.css";

function App() {
  // const { isAuthenticated, setIsAuthenticated } = useAuth();
  // // console.log("homepage:", isAuthenticated);
  // const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard/*" element={<PrivateRoute />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

function PrivateRoute({ element }) {
  // const isAuthenticated = true;
  // const { isAuthenticated } = useAuth();
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  return isAuthenticated ? <Dashboard /> : <HomePage />;
}

export default App;
