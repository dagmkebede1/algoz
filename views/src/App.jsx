import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import Dashboard from "./components/Dashboard/Dashboard";
import LogInPage from "./components/LogInPage/LogInPage";
import Example from "./components/Dashboard/Dash";
import { QueryClientProvider, QueryClient } from "react-query";
import DashG from "./components/Dashboard/DashG";
import LogIn from "./components/Auth/Form";
import SignPage from "./components/SignUpPage/SignUpPage";
import AntNavBar from "./components/Nav/AntNavBar";
import Navbar from "./components/Nav/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "./components/Redux/Reducers/authSllice";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    children: [
      {
        path: "login",
        element: <LogInPage />,
      },
      {
        path: "signup",
        element: <SignPage />,
      },
    ],
  },
]);
function App() {
  const queryClient = new QueryClient();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <>
          <RouterProvider router={router}></RouterProvider>
        </>
        {/* <Dashboard /> */}
        {/* <Navbar /> */}
        {/* <Login />  */}
        {/* <Other /> */}
        {/* <Signup /> */}
        {/* <Example /> */}
        {/* <DashG /> */}
      </div>
    </QueryClientProvider>
  );
}

export default App;
