/** @format */

import { createBrowserRouter } from "react-router-dom";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Home from "./Home";
import Posts from "./components/Posts";

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
    ],
  },
]);
