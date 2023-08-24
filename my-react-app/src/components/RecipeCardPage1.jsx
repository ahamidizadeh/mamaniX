import React from "react";
import "./styles/RecipeCardPage1.css"; // Import your CSS file for styling

const RecipeCardPage1 = ({ recipe, currentPage, nextPage, prevPage }) => {
  const imageSrc = `http://localhost:1234/${recipe.image}`;
  return (
    <div className="recipe-card">
      <img src={imageSrc} alt={recipe.title} className="recipe-image" />
      <h3 className="recipe-title">{recipe.title}</h3>
      <h4 className="recipe-contributor">{`${recipe.contributor.username}`}</h4>
      <h4 className="recipe-cookingTime">{`${recipe.cookingTime}`}</h4>
      <h4 className="recipe-rating">Rating: {recipe.rating}</h4>
      <div className="recipe-card-book-controls">
        {currentPage > 1 && (
          <button className="prev-button" onClick={prevPage}>
            prev
          </button>
        )}
        {currentPage < 3 && (
          <button className="ingredients-button" onClick={nextPage}>
            Ingredients
          </button>
        )}
      </div>
    </div>
  );
};

export default RecipeCardPage1;
