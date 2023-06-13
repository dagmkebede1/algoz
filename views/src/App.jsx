import { useState, useEffect } from "react";
import Dashboard from "./components/Dashboard/Dashboard";
import LogInPage from "./components/LogInPage/LogInPage";
import UserTable from "./components/UserTable/UserTable";
import { QueryClientProvider, QueryClient } from "react-query";
import LogIn from "./components/Auth/Login";
import SignPage from "./components/SignUpPage/SignUpPage";
import Navbar from "./components/Nav/Navbar";
import Hero from "./components/Hero/Hero";
import SignUP from "./components/Auth/Signup";
import CourseView from "../src/components/CourseView/CourseView";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "./components/Redux/Reducers/authSllice";
import ProtectedRoutes from "./components/Protect/ProtectedRoutes";
import VideoComp from "./components/VideoComp/VideoComp";
import NoteComp from "./components/NoteComp/NoteComp";
import TaskComp from "./components/TaskComp/TaskComp";
import ModuleComp from "./components/ModuleComp/ModuleComp";
// import CourseCard from "./components/CourseCard/CourseCard";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import CourseForms from "./components/CourseForm/CourseForms";
import Signup from "./components/Auth/Signup";
import SignUpPage from "./components/SignUpPage/SignUpPage";
import CourseWrapper from "./components/Courses/CourseWrapper";
import MyInput from "./components/UI/MyInput/MyInput";
import ResourceBar from "./components/ResourceBar/ResourceBar";

function App() {
  const queryClient = new QueryClient();
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.auth);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Hero />
          {/* <MyInput /> */}
        </>
      ),
    },
    {
      path: "login",
      element: <LogInPage />,
    },
    {
      path: "signup",
      element: <SignUpPage />,
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
          path: "resources",
          element: <ResourceBar />,
          children: [
            {
              path: "modules",
              element: <ModuleComp />,
            },
            {
              path: "videos",
              element: <VideoComp />,
            },
            {
              path: "notes",
              element: <NoteComp />,
            },
            {
              path: "tasks",
              element: <TaskComp />,
            },
          ],
        },
        {
          path: "courses",
          element: <CourseWrapper />,
        },
        {
          path: "courses/:title",
          element: <CourseView />,
        },
        // {
        //   path: "courses/:courseId",
        //   element: <CourseForms />,
        // },
        // {
        //   path: "courses/add",
        //   element: <CourseForms />,
        // },
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
