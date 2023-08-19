import React from "react";
import "./styles/RecipeCard.css"; // Import your CSS file for styling

const RecipeCard = ({ recipe }) => {
  const imageSrc = `http://localhost:1234/${recipe.image}`;
  return (
    <div className="recipe-card">
      <img src={imageSrc} alt={recipe.title} className="recipe-image" />
      <h3 className="recipe-title">{recipe.title}</h3>
      <h3 className="recipe-contributor">{recipe.contributor.username}</h3>
      <h3 className="recipe-cookingTime">{recipe.cookingTime}</h3>
      <p className="recipe-rating">Rating: {recipe.rating}</p>
    </div>
  );
};

export default RecipeCard;
