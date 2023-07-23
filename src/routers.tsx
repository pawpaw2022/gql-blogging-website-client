/** @format */

import { Navigate, createBrowserRouter } from "react-router-dom";
import Signin from "./components/Auth/Signin";
import Signup from "./components/Auth/Signup";
import Posts from "./components/Posts/Posts";
import Profile from "./components/User/Profile";
import Hero from "./components/Hero/Hero";
import Setting from "./components/Setting/Setting";
import RootTemplate from "./components/Root/RootTemplate";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/home" />,
  },
  {
    path: "/home",
    element: (
      <RootTemplate>
        <Hero />
      </RootTemplate>
    ),
  },
  {
    path: "/signin",
    element: (
      <RootTemplate>
        <Signin />
      </RootTemplate>
    ),
  },
  {
    path: "/signup",
    element: (
      <RootTemplate>
        <Signup />
      </RootTemplate>
    ),
  },
  {
    path: "/posts",
    element: (
      <RootTemplate>
        <Posts />
      </RootTemplate>
    ),
  },
  {
    path: "/profile",
    element: (
      <RootTemplate>
        <Profile />
      </RootTemplate>
    ),
  },
  {
    path: "/settings",
    element: (
      <RootTemplate>
        <Setting />
      </RootTemplate>
    ),
  },
  {
    path: "/*",
    element: <div>Not Found</div>,
  },
]);
