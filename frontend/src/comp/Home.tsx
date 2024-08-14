import React, { useEffect } from "react";
import Landing from "./Landing";
import Products from "./Products";
import Steps from "./Steps";
import Footer from "./Footer";
const Home = () => {
   useEffect(() => {
     window.scrollTo(0, 0);
   }, []);
  return (
    <>
      <Landing />
      <Products />
      <Steps />
      
    </>
  );
};
export default Home;
