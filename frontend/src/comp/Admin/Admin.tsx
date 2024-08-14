import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import { Routes, Route } from "react-router-dom";
import Addproduct from "./Addproduct";
import Listproduct from "./Listproduct";
import { Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Admin = () => {
   useEffect(() => {
     window.scrollTo(0, 0);
   }, []);
  useAuth();
  return (
    <div className="flex h-full ">
      <Sidebar />
      {/* <Routes>
        <Route path="/addproduct" element={<Addproduct />}></Route>
        <Route path="/listproduct" element={<Listproduct />}></Route>
      </Routes> */}
      <Outlet />
    </div>
  );
};

export default Admin;
