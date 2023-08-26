import React, { useState } from "react";
// import axios from "axios";

import "./styles/AddRecipeTab.css";
import api from "../utils/api";

function AddRecipeTab() {
  const [ingredient, setIngredient] = useState({ name: "", quantity: "" });
  const [recipeData, setRecipeData] = useState({
    title: "",
    typeOfFood: "",
    image: null,
    cookingTime: "",
    ingredients: [],
    instructions: "",
  });

  const handleImageUpload = (event) => {
    const selectedImage = event.target.files[0];
    console.log(selectedImage);
    setRecipeData((prevData) => ({
      ...prevData,
      image: selectedImage,
    }));
    console.log(recipeData.image);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setRecipeData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("image", recipeData.image);
    formData.append("typeOfFood", recipeData.typeOfFood);
    formData.append("title", recipeData.title);
    formData.append("cookingTime", recipeData.cookingTime);
    recipeData.ingredients.forEach((ingredient, index) => {
      formData.append(`ingredients[${index}][name]`, ingredient.name);
      formData.append(`ingredients[${index}][quantity]`, ingredient.quantity);
    });
    formData.append("instructions", recipeData.instructions);
    try {
      await api.post("/recipes", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Clear form fields
      setRecipeData({
        title: "",
        typeOfFood: "",
        image: null,
        cookingTime: "",
        ingredients: [],
        instructions: "",
      });
    } catch (error) {
      // Handle error
      console.error("Error adding recipe:", error);
    }
  };
  const handleIngredientChange = (event) => {
    const { name, value } = event.target;
    setIngredient((prev) => ({ ...prev, [name]: value }));
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
  };
  const handleDeleteIngredient = (indexToDelete) => {
    console.log("deleting");
    const updatedIngredients = recipeData.ingredients.filter(
      (item, index) => index !== indexToDelete
    );
    setRecipeData((prevData) => ({
      ...prevData,
      ingredients: updatedIngredients,
    }));
  };
  return (
    <div className="tab-content">
      <h2 className="recipeHeader">Add Recipe</h2>
      <form className="form-inline" onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={recipeData.title}
          onChange={handleInputChange}
        />
        <label>Food Category:</label>
        <select
          onChange={handleInputChange}
          value={recipeData.typeOfFood}
          name="typeOfFood"
        >
          <option> Main dish</option>
          <option> Desert</option>
          <option> Breakfast</option>
          <option> Shake</option>
          <option> Appetizer</option>
          <option> Drink</option>
        </select>

        <label>Image:</label>
        <input type="file" onChange={handleImageUpload} />
        <label>Cooking Time:</label>
        <input
          type="text"
          name="cookingTime"
          value={recipeData.cookingTime}
          onChange={handleInputChange}
        />
        <label>Ingredients:</label>

        <div className="listOfIngredients">
          <ul>
            {recipeData.ingredients.map((ingredient, index) => (
              <div className="ingredient">
                <li key={index}>
                  {ingredient.name} - {ingredient.quantity}
                  <button
                    className="delete-ingredient"
                    onClick={() => handleDeleteIngredient(index)}
                  >
                    x
                  </button>
                </li>
              </div>
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
          className="main-button"
          onClick={handleAddIngredient}
        >
          Add Ingredient
        </button>

        <label>Instructions:</label>
        <textarea
          className="instructionsAddRecipe"
          name="instructions"
          value={recipeData.instructions}
          onChange={handleInputChange}
        />

        <button type="button" className="main-button" onClick={handleSubmit}>
          Add Recipe
        </button>
      </form>
    </div>
  );
}

export default AddRecipeTab;
