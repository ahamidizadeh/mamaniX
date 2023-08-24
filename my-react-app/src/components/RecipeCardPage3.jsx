import react from "react";
import "./styles/recipeCardPage3.css";

const recipeCardPage3 = ({ currentPage, nextPage, prevPage }) => {
  return (
    <div className="recipe-card">
      <h2>Instructions</h2>
      <p className="instructions">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa,
        blanditiis consectetur. Cumque fugit quaerat ipsa veniam maxime
        molestias quos adipisci, impedit molestiae aliquid natus, illum eaque
        tenetur, obcaecati animi delectus! Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Culpa, blanditiis consectetur. Cumque
        fugit quaerat ipsa veniam maxime molestias quos adipisci, impedit
        molestiae aliquid natus, illum eaque tenetur, obcaecati animi delectus!
      </p>
      <div className="recipe-card-book-controls-page3">
        {currentPage > 1 && (
          <button className="page3-ingredients-button" onClick={prevPage}>
            back
          </button>
        )}
        {currentPage < 3 && (
          <button className="next-button" onClick={nextPage}>
            next
          </button>
        )}
      </div>
    </div>
  );
};

export default recipeCardPage3;
