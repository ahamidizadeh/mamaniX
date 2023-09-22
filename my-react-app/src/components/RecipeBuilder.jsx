import React, { useState } from "react";
import "./styles/RecipeBuilder.css"; // Add your CSS for styling

function RecipeBuilder({ selectedIngredient, setSelectedIngredient }) {
  const [droppedIngredients, setDroppedIngredients] = useState([]);
  //   const [selectedIngredient, setSelectedIngredient] = useState(null);

  //   const handleDragStart = (ingredient) => (event) => {
  //     setSelectedIngredient(ingredient);
  //     // Start the drag operation when an ingredient is dragged
  //     event.dataTransfer.setData("text/plain", JSON.stringify(ingredient));
  //   };

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
        {/* Display the area where ingredients can be dropped */}
        {/* You can style this area and add a background image, etc. */}
        {selectedIngredient && (
          <div className="selected-ingredient">
            {/* Display the selected ingredient (image) */}
            <img
              src={selectedIngredient.imageUrl}
              alt={selectedIngredient.name}
              draggable="false" // Prevent the selected image from being draggable
            />
          </div>
        )}
      </div>

      <div className="dropped-ingredients">
        {/* Display the dropped ingredients with quantities */}
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
