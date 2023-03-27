import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Outlet, NavLink, Link } from "react-router-dom";
import { Menu } from "antd";

function NavScrollExample() {
  return (
    <>
      <Navbar sticky="top" bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand>
            <NavLink to={"/"} className="ms-50">
              Algoz
            </NavLink>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="ms-auto my-2 my-lg-0 "
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link className="nav">
                <NavLink
                  to={"/"}
                  style={({ isActive, isPending }) => {
                    return {
                      // fontWeight: isActive ? "bold" : "",
                      // color: isPending ? "red" : "black",
                      borderBottom: isActive ? "2px solid #1677ff" : "none",
                      paddingBottom: isActive ? "14px" : "0",
                      textDecoration: "none",
                    };
                  }}
                >
                  Home
                </NavLink>
              </Nav.Link>
              <Nav.Link>
                <NavLink
                  to={"/s"}
                  style={({ isActive, isPending }) => {
                    return {
                      // fontWeight: isActive ? "bold" : "",
                      // color: isPending ? "red" : "black",
                      borderBottom: isActive ? "2px solid #1677ff" : "none",
                      paddingBottom: isActive ? "14px" : "0",
                      textDecoration: "none",
                    };
                  }}
                >
                  Services
                </NavLink>
              </Nav.Link>
              <Nav.Link>
                <NavLink
                  to={"/a"}
                  style={({ isActive, isPending }) => {
                    return {
                      // fontWeight: isActive ? "bold" : "",
                      // color: isPending ? "red" : "black",
                      borderBottom: isActive ? "2px solid #1677ff" : "none",
                      paddingBottom: isActive ? "14px" : "0",
                      textDecoration: "none",
                    };
                  }}
                >
                  About
                </NavLink>
              </Nav.Link>
              <Nav.Link>
                <NavLink
                  to={"/login"}
                  style={({ isActive, isPending }) => {
                    return {
                      // border: "2px solid #1677ff",
                      // border: isPending ? "2px solid #1677ff" : "none",
                      // borderRadius: "16px",
                      // padding: "8px 16px",
                      borderBottom: isActive ? "2px solid #1677ff" : "none",
                      paddingBottom: isActive ? "14px" : "0",
                      textDecoration: "none",
                      // transition: "all .4s ease-in-out",
                      // backgroundColor: isActive ? "#1677ff" : "#f8f9fa",
                      // color: isActive ? "white" : "#1677ff",
                      // textDecoration: "none",
                    };
                  }}
                >
                  Login
                </NavLink>
              </Nav.Link>
              <Nav.Link>
                <NavLink
                  className={"signup-link"}
                  to={"/signup"}
                  style={({ isActive, isPending }) => {
                    return {
                      // fontWeight: isActive ? "bold" : "",
                      // color: isPending ? "red" : "black",
                      // border: "2px solid #1677ff",
                      // borderRadius: "16px",
                      // padding: "8px 16px",
                      // backgroundColor: isActive ? "#1677ff" : "#f8f9fa",
                      // color: isActive ? "white" : "#1677ff",
                      // textDecoration: "none",
                      borderBottom: isActive ? "2px solid #1677ff" : "none",
                      paddingBottom: isActive ? "14px" : "0",
                      textDecoration: "none",
                    };
                  }}
                >
                  SignUp
                </NavLink>
              </Nav.Link>
              {/* <Nav.Link style={{ color: "#1677ff" }}>
                <NavLink to={"/signup"}>SignUp</NavLink>
              </Nav.Link>

              <Nav.Link style={{ color: "#1677ff" }}>About</Nav.Link>
              <Nav.Link style={{ color: "#1677ff" }}>Contact</Nav.Link>
              <Nav.Link>
                <a href="">SignIn</a>
              </Nav.Link>
              <Nav.Link>
                <a href="">SignUp</a>
              </Nav.Link> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet></Outlet>
    </>
  );
}

export default NavScrollExample;
