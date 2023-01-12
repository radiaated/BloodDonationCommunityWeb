import React from "react";

import { Link } from "react-router-dom";

const HomeCover = () => {
  return (
    <div className="home-cover flex">
      <div className="container flex">
        <p>Donate Blood, Save Lives</p>
        <h2>Donate Blood and inspire others</h2>
        <Link to="/search" className="btn btn-out">
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default HomeCover;
