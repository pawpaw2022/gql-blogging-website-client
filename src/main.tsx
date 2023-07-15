/** @format */

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { RouterProvider } from "react-router-dom";
import { router } from "./routers.tsx";
import Navbar from "./components/Navbar.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider>
      <Navbar />
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
