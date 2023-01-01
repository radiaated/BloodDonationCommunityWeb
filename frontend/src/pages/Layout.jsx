import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Layout = () => {
  const authCxt = useContext(AuthContext);

  return (
    <>
      <header className="box-shadow">
        <div className="header-main flex container">
          <div className="header-logo">
            <h1>Blood</h1>
          </div>

          <nav>
            <ul className="flex">
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/lookfor">Search For Blood</Link>
              </li>
            </ul>
          </nav>
          <div>
            {!authCxt.auth ? (
              <>
                <Link className="btn btn-fill" to="/login">
                  Login
                </Link>
                <Link className="btn btn-out" to="/signup">
                  Signup
                </Link>
              </>
            ) : (
              <>
                <Link>Logout</Link>
              </>
            )}
          </div>
        </div>
      </header>
      <Outlet />
      <footer className="">Blood Donation Bank | All Rights Reserved</footer>
    </>
  );
};

export default Layout;
