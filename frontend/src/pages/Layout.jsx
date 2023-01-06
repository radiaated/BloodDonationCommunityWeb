import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import logo from "./../assets/img/logo.png";

const Layout = () => {
  const navigate = useNavigate();
  const authCxt = useContext(AuthContext);
  const location = useLocation();
  console.log(location);
  const ref = useRef();

  const [showNavProfile, setShowNavProfile] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const navProfleClickHandler = (e) => {
    console.log(showNavProfile, ref.current);

    if (showNavProfile && ref.current && !ref.current.contains(e.target)) {
      setShowNavProfile(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", navProfleClickHandler);
    return () => {
      document.removeEventListener("mousedown", navProfleClickHandler);
    };
  }, [showNavProfile]);

  return (
    <>
      <header className="box-shadow">
        <div className="header-main flex container">
          <div className="header-logo">
            <img src={logo} alt="logo" />
          </div>

          <nav className="menu-icon">
            <div
              onClick={() => {
                setShowMenu(!showMenu);
              }}
            >
              <i class="fa-solid fa-bars"></i>
            </div>
          </nav>

          <nav className="menu-1">
            <ul className="flex">
              <li>
                <Link
                  className={location.pathname === "/" ? "nav-active" : ""}
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className={
                    location.pathname === "/search" ||
                    location.pathname === "/search/"
                      ? "nav-active"
                      : ""
                  }
                  to="/search"
                >
                  Search For Blood
                </Link>
              </li>
              <li>
                <Link
                  className={
                    location.pathname === "/about" ||
                    location.pathname === "/about/"
                      ? "nav-active"
                      : ""
                  }
                  to="/about"
                >
                  About
                </Link>
              </li>
            </ul>
          </nav>
          {showMenu && (
            <nav className="menu-1-ham">
              <nav className="menu-icon">
                <div
                  onClick={() => {
                    setShowMenu(!showMenu);
                  }}
                >
                  <i class="fa-solid fa-bars"></i>
                </div>
              </nav>
              <ul className="flex">
                <Link to="/">
                  <li>Home</li>
                </Link>
                <Link to="/search">
                  <li>Search For Blood</li>
                </Link>
                <Link to="/about">
                  <li>About</li>
                </Link>

                <hr />

                {!authCxt.auth ? (
                  <>
                    <Link to="/login">
                      <li>Login</li>
                    </Link>
                    <Link to="/signup">
                      <li>Signup</li>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/profile">
                      <li>Profile</li>
                    </Link>

                    <Link to="/requests">
                      <li>Your Requests</li>
                    </Link>

                    <Link
                      to="#"
                      onClick={(e) => {
                        e.preventDefault();
                        console.log("hi");
                        authCxt.logout();
                      }}
                    >
                      <li>Logout</li>
                    </Link>
                  </>
                )}
              </ul>
            </nav>
          )}

          <div className="menu-2">
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
                <div
                  ref={ref}
                  className="nav-profile"
                  onClick={(e) => {
                    setShowNavProfile(!showNavProfile);
                    navProfleClickHandler(e);
                  }}
                  onBlur={() => {}}
                >
                  <div
                    className={`nav-prof-button ${
                      showNavProfile ? "nav-prof-button-active" : ""
                    }`}
                  >
                    <i className="fa-solid fa-user"></i>
                    {JSON.parse(localStorage.getItem("bdbUser")).fullName}
                  </div>
                  {showNavProfile && (
                    <ul className="nav-dropdown">
                      <Link to="/profile">
                        <li>Profile</li>
                      </Link>

                      <hr />
                      <Link to="/requests">
                        <li>Your Requests</li>
                      </Link>

                      <hr />
                      <li>
                        <Link
                          to="#"
                          onClick={(e) => {
                            e.preventDefault();
                            console.log("hi");
                            authCxt.logout();
                          }}
                        >
                          Logout
                        </Link>
                      </li>
                    </ul>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </header>
      <Outlet />
      <footer className="">
        <div className="footer-desc">
          <div className="container flex">
            <div>
              <img src={logo} alt="logo" />
              <hr />
              <ul className="flex">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/search">Search</Link>
                </li>
                <li>
                  <Link to="/about">About</Link>
                </li>
              </ul>
            </div>

            <div>
              <h4>Social Links</h4>
              <div>
                <div className="soc-links flex">
                  <Link to="https://facebook.com">
                    <i className="fa-brands fa-facebook"></i>
                  </Link>
                  <Link to="https://facebook.com">
                    <i className="fa-brands fa-twitter"></i>
                  </Link>
                  <Link to="https://facebook.com">
                    <i className="fa-brands fa-instagram"></i>
                  </Link>
                </div>
              </div>
            </div>
            <div>
              <h4>Contacts</h4>
              <ul className="flex">
                <li>
                  <i className="fa-regular fa-envelope"></i> info@bloodreq.com
                </li>
                <li>
                  <i className="fa-solid fa-phone"></i> +977-014810888
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-title">
          Blood Request | All Rights Reserved 2023
        </div>
      </footer>
    </>
  );
};

export default Layout;
