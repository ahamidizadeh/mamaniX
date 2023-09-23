import react, { useState, useEffect } from "react";
import "./styles/RecipeMacros.css";
import { getRatingUtilityClass } from "@mui/material";

function RecipesMacros({ recipeIngredients }) {
  const [targetProtein, setTargetProtein] = useState(0);
  const [targetFats, setTargetFats] = useState(0);
  const [targetCarbs, setTargetCarbs] = useState(0);

  const [currentProtein, setCurrentProtein] = useState(0);
  const [currentFats, setCurrentFats] = useState(0);
  const [currentCarbs, setCurrentCarbs] = useState(0);

  const proteinPercentage =
    currentProtein / targetProtein
      ? ((currentProtein / targetProtein) * 100).toFixed(2)
      : 0;
  const fatsPercentage =
    currentFats / targetFats
      ? ((currentFats / targetFats) * 100).toFixed(2)
      : 0;
  const carbsPercentage =
    currentCarbs / targetCarbs
      ? ((currentCarbs / targetCarbs) * 100).toFixed(2)
      : 0;

  useEffect(() => {
    let totalProtein = 0;
    let totalFats = 0;
    let totalCarbs = 0;

    if (recipeIngredients) {
      for (const ingredient of recipeIngredients) {
        totalProtein += Number(ingredient.protein);
        totalFats += Number(ingredient.fats);
        totalCarbs += Number(ingredient.carbs);
      }
    }
    setCurrentProtein(totalProtein);
    setCurrentFats(totalFats);
    setCurrentCarbs(totalCarbs);
  }, [recipeIngredients]);

  return (
    <div className="recipe-macros">
      <div className="target-input">
        <h2>Recipe Macros</h2>
        <label>Protein</label>

        <div className="circle-inner">
          <input
            type="number"
            min="0"
            value={targetProtein}
            onChange={(e) => setTargetProtein(e.target.value)}
          />
          <p className="percentage">{proteinPercentage}%</p>
        </div>

        <label>Fats</label>

        <div className="circle-inner">
          <input
            type="number"
            min="0"
            value={targetFats}
            onChange={(e) => setTargetFats(e.target.value)}
          />
          <p className="percentage">{fatsPercentage}%</p>
        </div>
        <label>Carbs</label>

        <div className="circle-inner">
          <input
            type="number"
            min="0"
            value={targetCarbs}
            onChange={(e) => setTargetCarbs(e.target.value)}
          />
          <p className="percentage">{carbsPercentage}%</p>
        </div>
        <button
          className="button-macro"
          onClick={() => {
            console.log("setting macros");
          }}
        >
          Set Macros
        </button>
      </div>
    </div>
  );
}

export default RecipesMacros;
