import React from "react";
import { NavLink } from "react-router-dom";
import "./styles/NavigationTabs.css"; // Import your CSS file

function NavigationTabs({ setActiveTab }) {
  return (
    <div className="navigation-tabs">
      <NavLink
        to="/dashboard/search"
        className="tab-link"
        activeClassName="active-tab"
        onClick={() => setActiveTab("search")}
      >
        Search
      </NavLink>
      <NavLink
        to="/dashboard/add-recipe"
        className="tab-link"
        activeClassName="active-tab"
        onClick={() => setActiveTab("add-recipe")}
      >
        Add Recipe
      </NavLink>
      <NavLink
        to="/dashboard/favorites"
        className="tab-link"
        activeClassName="active-tab"
        onClick={() => setActiveTab("favorites")}
      >
        Favorites
      </NavLink>
      <NavLink
        to="/dashboard/previously-tried"
        className="tab-link"
        activeClassName="active-tab"
        onClick={() => setActiveTab("previously-tried")}
      >
        Tried Before
      </NavLink>
      <NavLink
        to="/dashboard/shopping-list"
        className="tab-link"
        activeClassName="active-tab"
        onClick={() => setActiveTab("shopping-list")}
      >
        Shopping List
      </NavLink>
    </div>
  );
}

export default NavigationTabs;
