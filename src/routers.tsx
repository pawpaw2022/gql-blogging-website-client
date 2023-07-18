/** @format */

import { createBrowserRouter } from "react-router-dom";
import Signin from "./components/Auth/Signin";
import Signup from "./components/Auth/Signup";
import Home from "./components/Root/Home";
import Posts from "./components/Posts/Posts";
import Profile from "./components/User/Profile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
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
        path: "*",
        element: <div>Not Found</div>,
      },
    ],
  },
]);
