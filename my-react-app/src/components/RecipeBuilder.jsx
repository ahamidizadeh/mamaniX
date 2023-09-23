import React, { useState } from "react";
import "./styles/RecipeBuilder.css"; // Add your CSS for styling
import api from "../utils/api";
function RecipeBuilder({ selectedIngredient, setSelectedIngredient }) {
  const [droppedIngredients, setDroppedIngredients] = useState([]);
  const [dropzoneHeading, setDropzoneHeading] = useState("Drag Here");
  //   const [selectedIngredient, setSelectedIngredient] = useState(null);

  //   const handleDragStart = (ingredient) => (event) => {
  //     setSelectedIngredient(ingredient);
  //     // Start the drag operation when an ingredient is dragged
  //     event.dataTransfer.setData("text/plain", JSON.stringify(ingredient));
  //   };
  console.log("selected ingredient:", selectedIngredient);
  const handleDrop = (event) => {
    event.preventDefault();
    if (selectedIngredient) {
      // Drop the ingredient into the builder area and specify the quantity
      const quantity = parseFloat(
        window.prompt(`Enter the quantity for ${selectedIngredient.name}`, "1")
      );

      if (!isNaN(quantity) && quantity > 0) {
        const ingredientWithQuantity = {
          ...selectedIngredient,
          quantity: quantity,
        };

        setDroppedIngredients((prevIngredients) => [
          ...prevIngredients,
          ingredientWithQuantity,
        ]);
        setSelectedIngredient(null);
      }
    }
  };
  const handleClearClick = () => {
    console.log("clearing");
    setDroppedIngredients([]);
  };
  const handleDragOver = (event) => {
    console.log("draggin");
    event.preventDefault();
  };

  return (
    <div className="recipe-builder-container">
      <div
        className="ingredient-dropzone"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {dropzoneHeading}
        {selectedIngredient && (
          <div className="selected-ingredient">
            <img
              src={`http://localhost:1234/${selectedIngredient.image}`}
              alt={selectedIngredient.name}
              draggable="false"
            />
          </div>
        )}
      </div>
      <button onClick={handleClearClick}>clear</button>
      <div className="dropped-ingredients">
        {"Ingredients:"}

        {droppedIngredients.map((ingredient, index) => (
          <div key={index} className="dropped-ingredient" draggable>
            {ingredient.quantity} - {ingredient.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecipeBuilder;
