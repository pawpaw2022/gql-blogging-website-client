/** @format */

import Navbar from "./Navbar";
import Footer from "./Footer";

type Props = {
  children: string | JSX.Element | JSX.Element[];
};

function RootTemplate({ children }: Props) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

export default RootTemplate;
