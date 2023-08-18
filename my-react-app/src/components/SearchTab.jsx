import React, { useState, useEffect } from "react";
import RecipeCard from "./RecipeCard";
import axios from "axios"; // Import your RecipeCard component
import "./styles/SearchTab.css"; // Import your SearchTab styles

function SearchTab() {
  const [searchValue, setSearchValue] = useState(""); // State to store the search input value
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    console.log("fetching recipes...");
    axios.get("http://localhost:1234/api/recipes").then((response) => {
      console.log("fetching recipes:", response.data);
      setRecipes(response.data);
    });

    console.log(recipes);
  }, []);

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  // Dummy recipe data for demonstration
  // const recipes = [
  //   {
  //     id: 1,
  //     title: "Delicious Pasta",
  //     image: "path-to-image",
  //     rating: 4.5,
  //     ingredients: ["Ingredient 1", "Ingredient 2", "Ingredient 3"],
  //     instructions: "Cook the pasta and enjoy!",
  //   },
  //   {
  //     id: 2,
  //     title: "ghorme sabzi",
  //     image: "path-to-image",
  //     rating: 4.5,
  //     ingredients: ["Ingredient 1", "Ingredient 2", "Ingredient 3"],
  //     instructions: "Cook the pasta and enjoy!",
  //   },
  //   // ... other recipe objects
  // ];

  // Filter recipes based on the search input value
  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="tab-content">
      <input
        type="text"
        className="search-input"
        placeholder="Search recipes..."
        value={searchValue}
        onChange={handleSearchChange}
      />
      <div className="recipe-box">
        {filteredRecipes.map((recipes) => (
          <RecipeCard key={recipes.id} recipe={recipes} />
        ))}
      </div>
    </div>
  );
}

export default SearchTab;
