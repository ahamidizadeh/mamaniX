import React, { useState, useEffect } from "react";
import RecipeCardBook from "./RecipeCardBook";
import "./styles/SearchTab.css";
import api from "../utils/api";
function SearchTab({ favRecipes, setFavRecipes }) {
  // const [favRecipes, setFavRecipes] = useState([]);
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
    const fetchFavoriteRecipes = async () => {
      try {
        await api
          .get("/user/favorite-recipes", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          })
          .then((response) => {
            const favorites = response.data.favoriteRecipes;
            console.log("response: ", favorites);
            setFavRecipes(favorites);
          });
      } catch (error) {
        console.log(error);
      }
    };
    fetchFavoriteRecipes();

    api
      .get("/recipes", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then((response) => {
        setRecipes(response.data);
        console.log("recipes included");
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          console.log("unauthorized request, cant refresh", error);
        } else {
          console.log("request error: ", error);
        }
      });
  }, []);
  console.log("favorites", favRecipes);
  const handleFavoriteClick = async (recipeId) => {
    // updateFavRecipes(recipeId);

    try {
      const isFavorite = favRecipes.some(
        (favRecipe) => favRecipe._id === recipeId
      );

      if (isFavorite) {
        // setFavRecipes((prevFavoriteRecipes) =>
        //   prevFavoriteRecipes.filter((favRecipe) => favRecipe._id !== recipeId)
        // );
        await api.post(`/recipes/remove-favorite/${recipeId}`, null, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
      } else {
        // setFavRecipes((prevFavoriteRecipes) => [
        //   ...prevFavoriteRecipes,
        //   recipes.find((recipe) => recipe._id === recipeId),
        // ]);
        await api.post(`/recipes/add-favorite/${recipeId}`, null, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
      }
      fetchData(true);
    } catch (error) {
      console.log("there was an error adding to favorties");
    }
  };
  const favIds = favRecipes.map((r) => r._id);
  console.log("ids", favIds);
  console.log("ine", favIds.includes("64f27a68f8a88d10585e4edd"));
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
        {(selectedFilter !== null ? foodTypes : filteredRecipes).map((r) => (
          <RecipeCardBook
            favorited={favIds.includes(r._id)}
            key={r._id}
            recipe={r}
            handleFavoriteClick={handleFavoriteClick}
          />
        ))}
      </div>
    </div>
  );
}

export default SearchTab;
