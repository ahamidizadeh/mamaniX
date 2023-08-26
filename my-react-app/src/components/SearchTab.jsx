import React, { useState, useEffect } from "react";
import RecipeCardBook from "./RecipeCardBook";
import NavigationTabs from "./NavigationTabs";
import axios from "axios"; // Import your RecipeCard component
import "./styles/SearchTab.css"; // Import your SearchTab styles

function SearchTab() {
  const [searchValue, setSearchValue] = useState("");
  const [foodTypes, setFoodTypes] = useState([]); // State to store the search input value
  const [recipes, setRecipes] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(null);

  const filterOptions = [
    { id: 1, label: "Breakfast" },
    { id: 2, label: "Main dish" },
    { id: 3, label: "Desert" },
    { id: 4, label: "Shake" },
    { id: 5, label: "Appetizer" },
    { id: 6, label: "Drink" },
  ];

  useEffect(() => {
    axios.get("http://localhost:1234/api/recipes").then((response) => {
      setRecipes(response.data);
    });
  }, []);

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };
  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchValue.toLowerCase())
  );
  const handleFilterClick = (filterId) => {
    const selectedFoodType = filterOptions[filterId].label;

    if (selectedFilter === filterId) {
      setFoodTypes([]);
      setSelectedFilter(null);
    } else {
      setSelectedFilter(filterId);
      const filteredByType = recipes.filter(
        (recipe) => recipe.typeOfFood === selectedFoodType
      );
      setFoodTypes(filteredByType);
      // setSearchValue("")
    }
    console.log("filter status", selectedFilter, foodTypes);
  };

  return (
    <div className="tab-content">
      <input
        type="text"
        className="search-input"
        placeholder="Search recipes..."
        value={searchValue}
        onChange={handleSearchChange}
      />
      <div className="filter-buttons">
        {filterOptions.map((option, i) => (
          <button
            key={option.id}
            className="filter-button-small"
            onClick={() => handleFilterClick(i)}
          >
            {option.label}
          </button>
        ))}
      </div>
      <div className="recipe-box">
        {
          /* {filteredRecipes.map((recipes) => (
          <RecipeCardBook key={recipes._id} recipe={recipes} />
        ))} */
          (selectedFilter !== null ? foodTypes : filteredRecipes).map(
            (recipes) => (
              <RecipeCardBook key={recipes._id} recipe={recipes} />
            )
          )
        }
      </div>
    </div>
  );
}

export default SearchTab;
