import React from "react";
import { Link } from "react-router-dom";

function NavigationTabs({ activeTab, setActiveTab }) {
  const tabs = [
    { id: "search", label: "Search" },
    { id: "add-recipe", label: "Add Recipe" },
    { id: "favorites", label: "Favorites" },
    { id: "previously-tried", label: "Previously Tried" },
  ];

  return (
    <div className="navigation-tabs">
      {tabs.map((tab) => (
        <Link
          key={tab.id}
          to={`/${tab.id}`}
          className={activeTab === tab.id ? "active" : ""}
          onClick={() => setActiveTab(tab.id)}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
}

export default NavigationTabs;
