import React, { useState, useEffect } from "react";
import RecipeCardBook from "./RecipeCardBook";
import NavigationTabs from "./NavigationTabs";
import "./styles/SearchTab.css";
import api from "../utils/api";
function SearchTab({ favRecipes, setFavRecipes }) {
  const [searchValue, setSearchValue] = useState("");
  const [foodTypes, setFoodTypes] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(null);

  const filterOptions = [
    { id: 0, label: "All" },
    { id: 1, label: "Breakfast" },
    { id: 2, label: "Main dish" },
    { id: 3, label: "Desert" },
    { id: 4, label: "Shake" },
    { id: 5, label: "Appetizer" },
    { id: 6, label: "Drink" },
  ];

  useEffect(() => {
    api
      .get("http://localhost:1234/api/recipes", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then((response) => {
        setRecipes(response.data);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          console.log("unauthorized request, cant refresh", error);
        } else {
          console.log("request error: ", error);
        }
      });
  }, []);
  const handleFavoriteClick = async (recipeId) => {
    const isFavorite = favRecipes.some(
      (favRecipe) => favRecipe._id === recipeId
    );

    if (isFavorite) {
      setFavRecipes((prevFavoriteRecipes) =>
        prevFavoriteRecipes.filter((favRecipe) => favRecipe._id !== recipeId)
      );
      await api.post(`/recipes/remove-favorite/${recipeId}`, null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
    } else {
      setFavRecipes((prevFavoriteRecipes) => [
        ...prevFavoriteRecipes,
        recipes.find((recipe) => recipe._id === recipeId),
      ]);
      await api.post(`/recipes/add-favorite/${recipeId}`, null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
    }
  };
  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };
  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchValue.toLowerCase())
  );
  const handleFilterClick = (filterId) => {
    if (filterId === 0) {
      setSelectedFilter(null);
      setFoodTypes([]);
      return;
    }
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
            className={`filter-button-small ${
              selectedFilter === i ? "active" : ""
            }`}
            onClick={() => handleFilterClick(i)}
          >
            {option.label}
          </button>
        ))}
      </div>
      <div className="recipe-box">
        {(selectedFilter !== null ? foodTypes : filteredRecipes).map(
          (recipes) => (
            <RecipeCardBook
              key={recipes._id}
              recipe={recipes}
              handleFavoriteClick={handleFavoriteClick}
            />
          )
        )}
      </div>
    </div>
  );
}

export default SearchTab;
