import React, { useState, useEffect } from "react";

function AddRecipeIngredientList({ ingredient }) {
  console.log(ingredient.image);
  const imageUrl = `http://localhost:1234${ingredient.image}`;

  return (
    <div className="ingredient-item">
      <img src={imageUrl} alt={ingredient.name} />
      <div className="info">
        <h3>{ingredient.name}</h3>
        <p>calories: {ingredient.calories}</p>
        <p>protein: {ingredient.protein}</p>
        <p>carbs: {ingredient.carbs}</p>
        <p>fats: {ingredient.fats}</p>
      </div>
    </div>
  );
}

export default AddRecipeIngredientList;
