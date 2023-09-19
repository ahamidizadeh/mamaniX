// FavoritesTab.jsx
import React from "react";
import "./styles/FavoritesTab.css";
import RecipeCardBook from "./RecipeCardBook";
function FavoritesTab({ favorites }) {
  console.log(favorites);
  return (
    <div className="recipe-box">
      {favorites.map((fav) => (
        <RecipeCardBook recipe={fav} />
      ))}
    </div>
  );
}

export default FavoritesTab;
