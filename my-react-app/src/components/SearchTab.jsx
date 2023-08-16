import React, { useState } from "react";
import RecipeCard from "./RecipeCard"; // Import your RecipeCard component
import "./styles/SearchTab.css"; // Import your SearchTab styles

function SearchTab() {
  const [searchValue, setSearchValue] = useState(""); // State to store the search input value

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  // Dummy recipe data for demonstration
  const recipes = [
    {
      id: 1,
      title: "Delicious Pasta",
      image: "path-to-image",
      rating: 4.5,
      ingredients: ["Ingredient 1", "Ingredient 2", "Ingredient 3"],
      instructions: "Cook the pasta and enjoy!",
    },
    {
      id: 2,
      title: "ghorme sabzi",
      image: "path-to-image",
      rating: 4.5,
      ingredients: ["Ingredient 1", "Ingredient 2", "Ingredient 3"],
      instructions: "Cook the pasta and enjoy!",
    },
    // ... other recipe objects
  ];

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
        {filteredRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}

export default SearchTab;
