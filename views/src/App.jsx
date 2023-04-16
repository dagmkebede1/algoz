import { useState, useEffect } from "react";
import Dashboard from "./components/Dashboard/Dashboard";
import LogInPage from "./components/LogInPage/LogInPage";
import UserTable from "./components/UserTable/UserTable";
import { QueryClientProvider, QueryClient } from "react-query";
import LogIn from "./components/Auth/Form";
import SignPage from "./components/SignUpPage/SignUpPage";
import Navbar from "./components/Nav/Navbar";
import Hero from "./components/Hero/Hero";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "./components/Redux/Reducers/authSllice";
import ProtectedRoutes from "./components/Protect/ProtectedRoutes";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
function App() {
  const queryClient = new QueryClient();
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.auth);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Navbar />
          <Hero />
        </>
      ),
      children: [
        { path: "home" },
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
    {
      path: "/dashboard",
      element: (
        <ProtectedRoutes>
          <Dashboard />
        </ProtectedRoutes>
      ),
      children: [
        {
          path: "users",
          element: <UserTable />,
        },
        {
          path: "resourse",
          element: <SignPage />,
        },
        {
          path: "dashboard",
          element: <Dashboard />,
        },
      ],
    },
  ]);

  useEffect(() => {
    dispatch(getUser());
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <>
          <RouterProvider router={router}></RouterProvider>
        </>
      </div>
    </QueryClientProvider>
  );
}

export default App;
