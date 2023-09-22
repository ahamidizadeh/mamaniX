import React, { useState, useEffect } from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import "./styles/AddRecipeIngredient.css";

const categories = ["Fruits", "Vegetables", "Grains", "Nuts", "Meats"];

function AddRecipeIngredientList({
  ingredient,
  allIngredients,
  searchFilter,
  setSelectedIngredient,
}) {
  const [hoveredIngredient, setHoveredIngredient] = useState(null);
  const [navigateIngredientIndex, setNavigateIngredientIndex] = useState(0);

  const onDragStart = (e, ingredient) => {
    setSelectedIngredient(ingredient);
    e.dataTransfer.setData("text/plain", JSON.stringify(ingredient));
  };

  const handleHoverIngredient = (name) => {
    setHoveredIngredient(name);
  };
  const handleMouseLeave = () => {
    setHoveredIngredient(null);
  };
  const ingredientsFiltered = searchFilter.length
    ? searchFilter
    : allIngredients;

  const numRows = Math.ceil(ingredientsFiltered.length / 3);
  const gridRowStyle = {
    gridTemplateRows: `repeat(${numRows}, 1fr)`,
  };
  const iconStyles = {
    fontSize: "x-large",
    color: "black",
  };
  const handleBeforeNavigate = () => {
    if (navigateIngredientIndex == 0) {
      setNavigateIngredientIndex(categories.length - 1);
    } else {
      setNavigateIngredientIndex(navigateIngredientIndex - 1);
    }
  };
  const handleAfterNavigate = () => {
    if (navigateIngredientIndex < categories.length - 1) {
      setNavigateIngredientIndex(navigateIngredientIndex + 1);
    } else {
      setNavigateIngredientIndex(0);
    }
  };

  return (
    <div>
      <div className="navigation-ingredient" style={gridRowStyle}>
        <NavigateBeforeIcon style={iconStyles} onClick={handleBeforeNavigate} />
        <h3>{categories[navigateIngredientIndex]}</h3>
        <NavigateNextIcon style={iconStyles} onClick={handleAfterNavigate} />
      </div>
      <div className="ingredient-item">
        {ingredientsFiltered
          .filter(
            (ingredient) =>
              ingredient.type == categories[navigateIngredientIndex]
          )
          .map((ingredient, index) => {
            const imageUrl = `http://localhost:1234${ingredient.image}`;
            return (
              <div
                key={index}
                className="image-container"
                draggable
                onDragStart={(e) => onDragStart(e, ingredient)}
              >
                <img
                  key={ingredient.id}
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
      </div>
    </div>
  );
}

export default AddRecipeIngredientList;
