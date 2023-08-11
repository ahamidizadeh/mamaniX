import React, { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import ProfileSection from "./ProfileSection";
import NavigationTabs from "./NavigationTabs";
import SearchTab from "./SearchTab";
import AddRecipeTab from "./AddRecipeTab";
import FavoritesTab from "./FavoritesTab";
import PreviouslyTriedTab from "./PreviouslyTriedTab";

function Dashboard() {
  const [activeTab, setActiveTab] = useState("search");

  return (
    <div className="dashboard">
      <ProfileSection />
      <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="tab-content">
        <Routes>
          <Route path="/" element={<SearchTab />} />
          <Route path="/add-recipe" element={<AddRecipeTab />} />
          <Route path="/favorites" element={<FavoritesTab />} />
          <Route path="/previously-tried" element={<PreviouslyTriedTab />} />
        </Routes>
      </div>
    </div>
  );
}

export default Dashboard;
