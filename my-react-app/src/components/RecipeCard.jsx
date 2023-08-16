import React from "react";
import "./styles/RecipeCard.css"; // Import your CSS file for styling

const RecipeCard = ({ recipe }) => {
  return (
    <div className="recipe-card">
      <img src={recipe.image} alt={recipe.title} className="recipe-image" />
      <h3 className="recipe-title">{recipe.title}</h3>
      <p className="recipe-rating">Rating: {recipe.rating}</p>
      <ul className="recipe-ingredients">
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <p className="recipe-instructions">{recipe.instructions}</p>
    </div>
  );
};

export default RecipeCard;
