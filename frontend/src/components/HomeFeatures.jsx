import React from "react";

const HomeFeatures = () => {
  return (
    <div className="container home-features section">
      <h2>Features</h2>
      <div className="flex">
        <div className="flex box-shadow">
          <i class="fa-solid fa-magnifying-glass"></i>

          <p>Search for blood</p>
        </div>
        <div className="flex box-shadow">
          <i class="fa-solid fa-question"></i>

          <p>Request For Blood</p>
        </div>
        <div className="flex box-shadow">
          <i class="fa-solid fa-droplet"></i>

          <p>Be a donor</p>
        </div>
      </div>
    </div>
  );
};

export default HomeFeatures;
