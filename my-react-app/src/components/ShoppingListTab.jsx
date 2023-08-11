// ShoppingListTab.jsx
import React from "react";

function ShoppingListTab() {
  // Placeholder data for shopping list items
  const shoppingListItems = [
    "Tomatoes",
    "Onions",
    "Bell peppers",
    "Chicken breasts",
    // ... add more items
  ];

  return (
    <div className="tab-content">
      <h2>Shopping List</h2>
      <ul>
        {shoppingListItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default ShoppingListTab;
