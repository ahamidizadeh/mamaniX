import React, { useState, useEffect } from "react";
import RecipeCardBook from "./RecipeCardBook";
import NavigationTabs from "./NavigationTabs";
import axios from "axios"; // Import your RecipeCard component
import "./styles/SearchTab.css"; // Import your SearchTab styles

function SearchTab() {
  const [searchValue, setSearchValue] = useState(""); // State to store the search input value
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    console.log(NavigationTabs.props);
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
          <RecipeCardBook key={recipes._id} recipe={recipes} />
        ))}
      </div>
    </div>
  );
}

export default SearchTab;
