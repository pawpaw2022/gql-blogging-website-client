/** @format */

import { Outlet } from "react-router-dom";
import Navbar from "./components/Root/Navbar";
import Footer from "./components/Root/Footer";

function Home() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default Home;
