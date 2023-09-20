import React, { useState, useEffect } from "react";
import "./styles/AddRecipeIngredient.css";

function AddRecipeIngredientList({ ingredient, allIngredients }) {
  const [hoveredIngredient, setHoveredIngredient] = useState(null);
  console.log("from leaf:", allIngredients);

  const handleHoverIngredient = (name) => {
    setHoveredIngredient(name);
  };
  const handleMouseLeave = () => {
    setHoveredIngredient(null);
  };
  return (
    <div className="ingredient-item">
      {allIngredients.map((ingredient) => {
        const imageUrl = `http://localhost:1234${ingredient.image}`;
        return (
          <div>
            <img
              src={imageUrl}
              alt={ingredient.name}
              onMouseEnter={() => handleHoverIngredient(ingredient)}
              onMouseLeave={handleMouseLeave}
              className="ingredient-pic"
            />
            {hoveredIngredient === ingredient ? (
              <div className="tooltip">
                <p>Nutrition Facts:</p>
                <ul>
                  <li>Calories: {ingredient.calories}</li>
                  <li>Fats: {ingredient.fats}g</li>
                  <li>Carbs: {ingredient.carbs}g</li>
                  <li>Protein: {ingredient.protein}g</li>
                </ul>
              </div>
            ) : null}
          </div>
        );
      })}
      {/* <img className="ingredient-image" src={imageUrl} alt={ingredient.name} /> */}
      {/* <div className="info">
        <h3>{ingredient.name}</h3>
        <p>calories: {ingredient.calories}</p>
        <p>protein: {ingredient.protein}</p>
        <p>carbs: {ingredient.carbs}</p>
        <p>fats: {ingredient.fats}</p>
      </div> */}
    </div>
  );
}

export default AddRecipeIngredientList;
