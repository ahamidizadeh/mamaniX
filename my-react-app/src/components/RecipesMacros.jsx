import react, { useState } from "react";

function RecipesMacros() {
  const [userProtein, setUserProtein] = useState(0);
  const [userFats, setUserFats] = useState(0);
  const [userCarbs, setUserCarbs] = useState(0);
  const [ingredients, setIngredients] = useState([]);

  return <h3>Recipe Macros</h3>;
}

export default RecipesMacros;
