import { useState, useEffect } from "react";
import Dashboard from "./components/Dashboard/Dashboard";
import LogInPage from "./components/LogInPage/LogInPage";
import UserTable from "./components/UserTable/UserTable";
import { QueryClientProvider, QueryClient } from "react-query";
import LogIn from "./components/Auth/Form";
import SignPage from "./components/SignUpPage/SignUpPage";
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
      {
        path: "dashboard",
        element: <Dashboard />,
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
