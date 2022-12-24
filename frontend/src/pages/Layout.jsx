import React from "react";
import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <header>
        <h1>Blood Donation Bank</h1>
        <nav>
          <ul>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/lookfor">Search For Blood</Link>
            </li>
          </ul>
        </nav>
      </header>
      <Outlet />
      <footer>Blood Donation Bank | All Rights Reserved</footer>
    </>
  );
};

export default Layout;
