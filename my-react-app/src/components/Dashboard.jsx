import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import api from "../utils/api";
import ProfileSection from "./ProfileSection";
import NavigationTabs from "./NavigationTabs";
import SearchTab from "./SearchTab";
import ShoppingListTab from "./ShoppingListTab";
import AddRecipeTab from "./AddRecipeTab";
import FavoritesTab from "./FavoritesTab";
import PreviouslyTriedTab from "./PreviouslyTriedTab";

import "./styles/Dashboard.css";

function Dashboard() {
  const [activeTab, setActiveTab] = useState("");
  const [favRecipes, setFavRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {}, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    console.log("loggingout");
    navigate("/");
  };

  return (
    <div className="dashboard">
      <aside className="profile">
        <ProfileSection />
        <button className="logout" onClick={handleLogout}>
          Logout
        </button>
      </aside>
      <div className="middle-section">
        {/* <div className="logo">
          <img
            src={logoImage}
            alt="mamanilogo"
            style={{ width: "200px", height: "200px" }}
          ></img>
        </div> */}
        <div className="navigation">
          <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
        <div className="content">
          <Routes>
            <Route
              path="/search"
              element={
                <SearchTab
                  favRecipes={favRecipes}
                  setFavRecipes={setFavRecipes}
                />
              }
            />
            <Route path="/add-recipe" element={<AddRecipeTab />} />
            <Route
              path="/favorites"
              element={<FavoritesTab favorites={favRecipes} />}
            />
            <Route path="/previously-tried" element={<PreviouslyTriedTab />} />
            <Route path="/shopping-list" element={<ShoppingListTab />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
