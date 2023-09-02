import React, { useState, useEffect } from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

import "./styles/AddRecipeTab.css";
import api from "../utils/api";

function AddRecipeTab() {
  const [ingredient, setIngredient] = useState({
    name: "",
    quantity: "",
    measurement: "defaultOption",
  });
  const [recipeData, setRecipeData] = useState({
    title: "",
    typeOfFood: "defaultOption",
    image: null,
    servingSize: 1,
    cookingTime: "",
    ingredients: [],
    instructions: "",
  });

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      console.log("authtoken has expired");
    } else {
      console.log(authToken);
    }
  }, []);

  const handleTypeOfFoodChange = (event) => {
    const { name, value } = event.target;

    setRecipeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleImageUpload = (event) => {
    const selectedImage = event.target.files[0];

    setRecipeData((prevData) => ({
      ...prevData,
      image: selectedImage,
    }));
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
    formData.append("servingSize", recipeData.servingSize);
    formData.append("cookingTime", recipeData.cookingTime);
    recipeData.ingredients.forEach((ingredient, index) => {
      formData.append(`ingredients[${index}][name]`, ingredient.name);
      formData.append(`ingredients[${index}][quantity]`, ingredient.quantity);
      formData.append(
        `ingredients[${index}][measurement]`,
        ingredient.measurement
      );
    });
    formData.append("instructions", recipeData.instructions);
    try {
      await api.post("/recipes", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      // Clear form fields
      setRecipeData({
        title: "",
        typeOfFood: "default value",
        image: null,
        servingSize: 1,
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
    if (ingredient.name && ingredient.quantity && ingredient.measurement) {
      const newIngredient = { ...ingredient };
      setRecipeData((prevData) => ({
        ...prevData,
        ingredients: [...prevData.ingredients, newIngredient],
      }));
    }
    setIngredient({ name: "", quantity: "", measurement: "defaultOption" });
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
          onChange={handleTypeOfFoodChange}
          value={recipeData.typeOfFood}
          name="typeOfFood"
        >
          <option value="defaultOption" disabled>
            Select Food Type
          </option>
          <option value="Main dish"> Main dish</option>
          <option value="Desert"> Desert</option>
          <option value="Breakfast"> Breakfast</option>
          <option value="Shake"> Shake</option>
          <option value="Appetizer"> Appetizer</option>
          <option value="Drink"> Drink</option>
        </select>

        <label>Image:</label>
        <input type="file" onChange={handleImageUpload} />
        <label>Serving Size(roundup):</label>
        <input
          type="number"
          min="1"
          name="servingSize"
          value={recipeData.servingSize}
          onChange={handleInputChange}
        ></input>
        <label>Cooking Time:</label>
        <input
          type="text"
          name="cookingTime"
          value={recipeData.cookingTime}
          onChange={handleInputChange}
        />
        <label>Ingredients:</label>

        <div className="listOfIngredients">
          {recipeData.ingredients.map((ingredient, i) => (
            <div className="ingredient-list">
              <li key={i}>
                {ingredient.name} : {ingredient.quantity} {"  "}
                {ingredient.measurement}
                <HighlightOffIcon
                  onClick={() => handleDeleteIngredient(i)}
                  style={{
                    fontSize: "16px",
                    color: "#803d06",
                    cursor: "pointer",
                    marginLeft: "15px",
                    marginTop: "5px",
                  }}
                />
              </li>
            </div>
          ))}

          {/* <div className="ingredient-inputs"> */}
          <input
            type="text"
            name="name"
            placeholder="Ingredient"
            value={ingredient.name}
            onChange={handleIngredientChange}
          />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={ingredient.quantity}
            onChange={handleIngredientChange}
          />
          <select
            className="measurements"
            name="measurement"
            onChange={handleIngredientChange}
            value={ingredient.measurement}
          >
            <option value="defaultOption" disabled>
              measurements
            </option>
            <option value="grams">grams</option>
            <option value="lbs">lbs</option>
            <option value="cups">cup/cups</option>
            <option value="liter">Liter</option>
            <option value="units">units</option>
            <option value="table spoon">table spoon</option>
            <option value="tea spoon">tea spoon</option>
            <option value="to your liking">to your liking</option>
          </select>
          {/* </div> */}
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
