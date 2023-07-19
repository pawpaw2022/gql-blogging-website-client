/** @format */

import { createBrowserRouter } from "react-router-dom";
import Signin from "./components/Auth/Signin";
import Signup from "./components/Auth/Signup";
import Home from "./components/Root/Home";
import Posts from "./components/Posts/Posts";
import Profile from "./components/User/Profile";
import Hero from "./components/Hero/Hero";
import Setting from "./components/Setting/Setting";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "home",
        element: <Hero />,
      },
      {
        path: "signin",
        element: <Signin />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "posts",
        element: <Posts />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "settings",
        element: <Setting />,
      },
      {
        path: "*",
        element: <div>Not Found</div>,
      },
    ],
  },
]);
