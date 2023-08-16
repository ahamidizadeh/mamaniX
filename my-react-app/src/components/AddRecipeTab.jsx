import React, { useState } from "react";
import axios from "axios";
import "./styles/AddRecipeTab.css";

function AddRecipeTab() {
  const [ingredient, setIngredient] = useState({ name: "", quantity: "" });
  const [recipeData, setRecipeData] = useState({
    title: "",
    image: "",
    cookingTime: "",
    ingredients: [],
    instructions: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setRecipeData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:1234/api/recipes", recipeData);

      // Clear form fields
      setRecipeData({
        title: "",
        image: "",
        cookingTime: "",
        ingredients: [],
        instructions: "",
      });

      // Optionally refetch recipes from backend or update state
    } catch (error) {
      // Handle error
      console.error("Error adding recipe:", error);
    }
  };
  const handleIngredientChange = (event) => {
    const { name, value } = event.target;
    setIngredient((prev) => ({ ...prev, [name]: value }));

    // console.log(ingredient);
    // setIngredient({ name: name, quantity: value });
    // console.log(ingredient);
  };
  const handleAddIngredient = (e) => {
    e.preventDefault();
    if (ingredient.name && ingredient.quantity) {
      const newIngredient = { ...ingredient };
      setRecipeData((prevData) => ({
        ...prevData,
        ingredients: [...prevData.ingredients, newIngredient],
      }));
    }
    setIngredient({ name: "", quantity: "" });
    console.log(recipeData.ingredients);
  };

  return (
    <div className="tab-content">
      <h2 className="recipeHeader">Add Recipe</h2>
      <form onSubmit={handleSubmit}>
        <label className="titleAddRecipe">Title:</label>
        <input
          type="text"
          name="title"
          value={recipeData.title}
          onChange={handleInputChange}
        />

        <label className="titleAddRecipe">Image URL:</label>
        <input
          type="text"
          name="image"
          value={recipeData.image}
          onChange={handleInputChange}
        />

        <label className="titleAddRecipe">Cooking Time:</label>
        <input
          type="text"
          name="cookingTime"
          value={recipeData.cookingTime}
          onChange={handleInputChange}
        />
        <label className="titleAddRecipe">Ingredients:</label>

        <div className="ingridentsAddRecipe">
          <ul className="ingredientList">
            {recipeData.ingredients.map((ingredient, index) => (
              <li key={index}>
                {ingredient.name} - {ingredient.quantity}
              </li>
            ))}
          </ul>
          <input
            type="text"
            name="name"
            placeholder="Ingredient"
            value={ingredient.name}
            onChange={handleIngredientChange}
          />
          <input
            type="text"
            name="quantity"
            placeholder="Quantity"
            value={ingredient.quantity}
            onChange={handleIngredientChange}
          />
        </div>
        <button
          type="button"
          className="buttonAddIngredient"
          onClick={handleAddIngredient}
        >
          Add Ingredient
        </button>

        <label className="titleAddRecipe">Instructions:</label>
        <textarea
          className="instructionsAddRecipe"
          name="instructions"
          value={recipeData.instructions}
          onChange={handleInputChange}
        />

        <button
          type="button"
          className="buttonAddRecipe"
          onClick={handleSubmit}
        >
          Add Recipe
        </button>
      </form>
    </div>
  );
}

export default AddRecipeTab;
