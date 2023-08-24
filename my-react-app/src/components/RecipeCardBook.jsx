import React, { useState } from "react";
import RecipeCardPage1 from "./RecipeCardPage1"; // First page component
import RecipeCardPage2 from "./RecipeCardPage2"; // Second page component
import RecipeCardPage3 from "./RecipeCardPage3"; // Third page component
import "./styles/RecipeCardBook.css";

const RecipeCardBook = ({ recipe }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div className="recipe-card-book">
      {currentPage === 1 && (
        <RecipeCardPage1
          recipe={recipe}
          currentPage={currentPage}
          nextPage={nextPage}
          prevPage={prevPage}
        />
      )}
      {currentPage === 2 && (
        <RecipeCardPage2
          recipe={recipe}
          currentPage={currentPage}
          nextPage={nextPage}
          prevPage={prevPage}
        />
      )}
      {currentPage === 3 && (
        <RecipeCardPage3
          recipe={recipe}
          currentPage={currentPage}
          nextPage={nextPage}
          prevPage={prevPage}
        />
      )}
    </div>
  );
};

export default RecipeCardBook;
