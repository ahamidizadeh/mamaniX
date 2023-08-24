import react from "react";
import "./styles/RecipeCardPage2.css";

const RecipeCardPage2 = ({ recipe, currentPage, nextPage, prevPage }) => {
  console.log(recipe.ingredients[0]);
  return (
    <div className="recipe-card">
      <h2>Ingredients</h2>
      {recipe.ingredients.map((ingredient, index) => (
        <li key={index} className="ingredients">
          <input type="checkbox" id={`ingredient-${index}`} />
          <label htmlFor={`ingredient-${index}`} className="ingredients">
            {ingredient.name} - {ingredient.quantity}
          </label>
        </li>
      ))}
      <div className="recipe-card-book-controls-page2">
        {currentPage > 1 && (
          <button className="prev-button" onClick={prevPage}>
            prev
          </button>
        )}
        {currentPage < 3 && (
          <button className="instructions-button" onClick={nextPage}>
            Instructions
          </button>
        )}
      </div>
    </div>
  );
};

export default RecipeCardPage2;
