import React from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRoutes({ children }) {
  let { isAuth } = useSelector((state) => state.auth);
  let navigate = useNavigate();

  if (isAuth) {
    return <>{children}</>;
  } else {
    navigate("/login");
    return null;
  }
}

export default ProtectedRoutes;
