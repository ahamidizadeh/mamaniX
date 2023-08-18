import React from "react";
import "./styles/RecipeCard.css"; // Import your CSS file for styling

const RecipeCard = ({ recipe }) => {
  return (
    <div className="recipe-card">
      <img src={recipe.image} alt={recipe.title} className="recipe-image" />
      <h3 className="recipe-title">{recipe.title}</h3>
      <h3 className="recipe-contributor">{recipe.contributor}</h3>
      <h3 className="recipe-cookingTime">{recipe.cookingTime}</h3>
      <p className="recipe-rating">Rating: {recipe.rating}</p>
    </div>
  );
};

export default RecipeCard;
