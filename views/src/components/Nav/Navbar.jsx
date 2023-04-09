import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useSelector } from "react-redux";
import { Outlet, NavLink, Link } from "react-router-dom";
import { Menu } from "antd";

function NavScrollExample() {
  const { isAuth, user } = useSelector((state) => state.auth);

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
              {isAuth && (
                <Nav.Link>
                  <NavLink to="/dashboard">Dashboard</NavLink>
                </Nav.Link>
              )}
              {!isAuth && (
                <>
                  <Nav.Link>
                    <NavLink
                      to={"/login"}
                      style={({ isActive, isPending }) => {
                        return {
                          borderBottom: isActive ? "2px solid #1677ff" : "none",
                          paddingBottom: isActive ? "14px" : "0",
                          textDecoration: "none",
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
                          borderBottom: isActive ? "2px solid #1677ff" : "none",
                          paddingBottom: isActive ? "14px" : "0",
                          textDecoration: "none",
                        };
                      }}
                    >
                      SignUp
                    </NavLink>
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet></Outlet>
    </>
  );
}

export default NavScrollExample;
