import React, { useState, useEffect } from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import "./styles/AddRecipeIngredient.css";

const categories = ["Fruits", "Vegetables", "Grains", "Nuts", "Meats"];

function AddRecipeIngredientList({ ingredient, allIngredients, searchFilter }) {
  const [hoveredIngredient, setHoveredIngredient] = useState(null);
  const [navigateIngredientIndex, setNavigateIngredientIndex] = useState(0);

  const handleHoverIngredient = (name) => {
    setHoveredIngredient(name);
  };
  const handleMouseLeave = () => {
    setHoveredIngredient(null);
  };
  const ingredientsFiltered = searchFilter.length
    ? searchFilter
    : allIngredients;

  const iconStyles = {
    fontSize: "x-large",
    color: "black",
  };
  const handleBeforeNavigate = () => {
    if (navigateIngredientIndex > 0) {
      setNavigateIngredientIndex(navigateIngredientIndex - 1);
    }
  };
  const handleAfterNavigate = () => {
    if (navigateIngredientIndex < categories.length - 1) {
      setNavigateIngredientIndex(navigateIngredientIndex + 1);
    }
  };

  return (
    <div>
      <div className="navigation-ingredient">
        <NavigateBeforeIcon style={iconStyles} onClick={handleBeforeNavigate} />
        <h3>{categories[navigateIngredientIndex]}</h3>
        <NavigateNextIcon style={iconStyles} onClick={handleAfterNavigate} />
      </div>
      <div className="ingredient-item">
        {ingredientsFiltered.map((ingredient) => {
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
    </div>
  );
}

export default AddRecipeIngredientList;
