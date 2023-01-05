import React from "react";
import { Link } from "react-router-dom";

const QuickBar = () => {
  return (
    <div className="qb container flex box-shadow section">
      <div className="qb-search flex">
        <div className="flex">
          <h3>Looking for blood?</h3>
          <p>
            You can search ad browser the people with speicific blood type who
            are willing to donate at any time.
          </p>
          <Link to="/search" className="btn btn-out">
            Search
          </Link>
        </div>
      </div>
      <div className="qb-donate flex">
        <div className="flex">
          <h3>Willing to donate?</h3>
          <p>
            Be a part of us and be ready to help others by donating blood when
            you are requested. Signup as donor.
          </p>
          <Link to="/signup" className="btn btn-out">
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
};

export default QuickBar;
