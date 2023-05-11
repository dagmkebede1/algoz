import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "./NavBar.css";
import { Outlet, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import Logo from "./Logo/Logo";
import DropdownMenu from "../UI/Dropdown/Dropdown";
const SignUpNavbar = () => {
  //   const [isOpen, setIsOpen] = useState(false);

  //   const { isAuth } = useSelector((state) => state.auth);

  //   console.log(isOpen, isAuth);
  //   const toggleNav = () => {
  //     setIsOpen(!isOpen);
  //   };

  return (
    <>
      <header>
        <nav
          className="navbar"
          style={{
            width: "200px",
          }}
        >
          <div
            className="navbar-container"
            style={{ justifyContent: "center" }}
          >
            <NavLink href="/" className="navbar-logo" to={"/"}>
              <Logo />
              {/* <img src={logo} alt="Logo" /> */}
              {/* Algoz */}
            </NavLink>
          </div>
        </nav>
      </header>
    </>
  );
};

export default SignUpNavbar;
