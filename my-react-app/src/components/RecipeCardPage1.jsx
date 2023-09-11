import React, { useState, useEffect } from "react";
import "./styles/RecipeCardPage1.css"; // Import your CSS file for styling
import FavoriteIcon from "@mui/icons-material/Favorite";
import styled from "@emotion/styled";
const RecipeCardPage1 = ({
  recipe,
  currentPage,
  favorited,
  nextPage,
  prevPage,
  handleFavoriteClick,
}) => {
  const [isFavorited, setIsFavorited] = useState(favorited);
  const imageSrc = `http://localhost:1234/${recipe.image}`;
  console.log("page1 status", favorited);
  const StyledHeartIcon = styled(FavoriteIcon)`
    color: ${isFavorited ? "red" : "white"};
    cursor: pointer;

    &:hover {
      color: red;
    }
  `;
  const handleToggle = (recipeId) => {
    setIsFavorited((prevIsFavorite) => !prevIsFavorite);
    handleFavoriteClick(recipeId);
  };

  return (
    <div className="recipe-card-page1">
      <img src={imageSrc} alt={recipe.title} className="recipe-image" />
      <h3 className="recipe-title">{recipe.title}</h3>
      <StyledHeartIcon
        clicked={isFavorited ? "true" : undefined}
        onClick={() => handleToggle(recipe._id)}
      />
      <h4 className="recipe-contributor">{`${recipe.contributor.username}`}</h4>
      <h4 className="recipe-cookingTime">{`${recipe.cookingTime}`}</h4>
      <h4> {`serves: ${recipe.servingSize}`}</h4>

      <h4 className="recipe-typeOfFood">{`${recipe.typeOfFood}`}</h4>
      <h4 className="recipe-rating">Rating: {recipe.rating}</h4>
      <div className="recipe-card-book-controls">
        {currentPage > 1 && (
          <button className="prev-button" onClick={prevPage}>
            prev
          </button>
        )}
        {currentPage < 3 && (
          <button className="ingredients-button" onClick={nextPage}>
            Ingredients
          </button>
        )}
      </div>
    </div>
  );
};

export default RecipeCardPage1;
