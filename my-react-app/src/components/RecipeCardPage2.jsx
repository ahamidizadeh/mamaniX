import react, { useState } from "react";
import "./styles/RecipeCardPage2.css";

const RecipeCardPage2 = ({ recipe, currentPage, nextPage, prevPage }) => {
  const [currentServingSize, setCurrentServingSize] = useState(
    recipe.servingSize
  );
  // console.log("Ingredient:", recipe.ingredients[1].quantity);
  // const quantityAsNumber = parseFloat(recipe.ingredients[1].quantity);
  // console.log("Parsed Quantity:", quantityAsNumber);

  const handleServingSizeChange = (newServingSize) => {
    setCurrentServingSize(newServingSize);
  };
  const adjustedIngredients = recipe.ingredients.map((ingredient) => {
    const quantityNumber = parseFloat(ingredient.quantity);
    console.log(quantityNumber);
    const adjustedQuantity =
      (quantityNumber * currentServingSize) / ingredient.servingSize;
    // console.log(adjustedQuantity);
    return { ...ingredient, adjustedQuantity };
  });
  return (
    <div className="recipe-card-page2">
      <h2>Ingredients</h2>
      <div className="ingredients-page2-box">
        <label htmlFor="servingSize"> Serving Size: </label>
        <input
          type="number"
          min="1"
          value={currentServingSize}
          onChange={(e) => handleServingSizeChange(e.target.value)}
        ></input>

        {adjustedIngredients.map((ingredient, index) => (
          <li key={index} className="ingredients-page2">
            <input type="checkbox" id={`ingredient-${index}`} />
            <label htmlFor={`ingredient-${index}`}>
              {ingredient.name} - {ingredient.adjustedQuantity} -{" "}
              {ingredient.measurement}
            </label>
          </li>
        ))}
      </div>
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
