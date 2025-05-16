import React from "react";
import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet-async";

const Root = () => {
  return (
    <div>
      <Helmet>
        <title>Home | Urban Dwell</title>
      </Helmet>
      <Nav></Nav>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default Root;
