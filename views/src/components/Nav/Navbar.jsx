import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "./NavBar.css";
import { Outlet } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <a href="/" className="navbar-logo">
            {/* <img src={logo} alt="Logo" /> */}
            Algoz
          </a>
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
              <a href="/" className="navbar-link">
                Home
              </a>
            </li>
            <li className="navbar-item">
              <a href="/about" className="navbar-link">
                About Us
              </a>
            </li>
            <li className="navbar-item">
              <a href="/services" className="navbar-link">
                Services
              </a>
            </li>
            <li className="navbar-item">
              <a href="/contact" className="navbar-link">
                Contact Us
              </a>
            </li>
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
