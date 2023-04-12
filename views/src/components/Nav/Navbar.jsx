import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "./NavBar.css";
import { Outlet, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { isAuth } = useSelector((state) => state.auth);

  console.log(isOpen, isAuth)
  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <NavLink href="/" className="navbar-logo" to={"/"}>
            {/* <img src={logo} alt="Logo" /> */}
            Algoz
          </NavLink>
          <div
            id="toggle"
            className={isOpen ? "menu open" : "menu"}
            onClick={toggleNav}
          >
            <span className="menu-top"></span>
            <span className="menu-middle"></span>
            <span className="menu-botton"></span>
          </div>
          <ul className={`navbar-menu ${isOpen && "active"}`}>
            <li className="navbar-item">
              <NavLink to={"/"} className="navbar-link">
                Home
              </NavLink>
            </li>
            <li className="navbar-item">
              <NavLink to="/about" className="navbar-link">
                About Us
              </NavLink>
            </li>
            <li className="navbar-item">
              <NavLink to="/services" className="navbar-link">
                Services
              </NavLink>
            </li>
            <li className="navbar-item">
              <NavLink to="/contact" className="navbar-link">
                Contact Us
              </NavLink>
            </li>
            {isAuth ? (
              <li className="navbar-item">
                <NavLink to="/dashboard" className="navbar-link">
                  Dashboard
                </NavLink>
              </li>
            ) : (
              <>
                <li className="navbar-item">
                  <NavLink to="/login" className="navbar-link">
                    Sign In
                  </NavLink>
                </li>
                <li className="navbar-item">
                  <NavLink to="/signup" className="navbar-link">
                    Sign Up
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default Navbar;
