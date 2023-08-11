// ProfileSection.jsx
import React from "react";

function ProfileSection() {
  // Replace with actual user data
  const user = {
    name: "John Doe",
    rating: 4.7,
    // Other user data
  };

  return (
    <div className="profile-section">
      <img alt="Profile" />
      <div className="user-info">
        <h2>{user.name}</h2>
        <p>Rating: {user.rating}</p>
      </div>
    </div>
  );
}

export default ProfileSection;
