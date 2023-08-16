import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import ProfileSection from "./ProfileSection";
import NavigationTabs from "./NavigationTabs";
import SearchTab from "./SearchTab";
import ShoppingListTab from "./ShoppingListTab";
import AddRecipeTab from "./AddRecipeTab";
import FavoritesTab from "./FavoritesTab";
import PreviouslyTriedTab from "./PreviouslyTriedTab";
import "./styles/Dashboard.css";

function Dashboard() {
  const [activeTab, setActiveTab] = useState("search");

  return (
    <div className="dashboard">
      <ProfileSection />
      <div className="content">
        <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        <Routes>
          <Route path="/search" element={<SearchTab />} />
          <Route path="/add-recipe" element={<AddRecipeTab />} />
          <Route path="/favorites" element={<FavoritesTab />} />
          <Route path="/previously-tried" element={<PreviouslyTriedTab />} />
          <Route path="/shopping-list" element={<ShoppingListTab />} />
        </Routes>
      </div>
    </div>
  );
}

export default Dashboard;
