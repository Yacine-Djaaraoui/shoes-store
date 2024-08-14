import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";

import Home from "./comp/Home";
import Nav from "./comp/Nav";
import Admin from "./comp/Admin/Admin";
import Product from "./comp/Product";
import Addproduct from "./comp/Admin/Addproduct";
import Listproduct from "./comp/Admin/Listproduct";
import LoginAdmin from "./comp/Admin/AdminLogin";
import ProtectedRoute from "./comp/hooks/ProtectedRoute";
// import Sidebar from "./comp/Admin/Sidebar";
import FormComponent from "./comp/FormComponent";
import Footer from "./comp/Footer";

function App() {
  return (
    <>
      <div className=" min-w-[300px] overflow-cli">
        <Nav></Nav>
        <div className="mt-[70px] lg:mt-[90px] ">
          {" "}
          <Routes>
            {/* public routes */}
            <Route path="/" element={<Home />} />
            {/* <Route path="/admin" element={<Admin />} /> */}
            <Route path="/login" element={<LoginAdmin />} />
            <Route path="/cart" element={<FormComponent />} />
            <Route path="/formComponent" element={<FormComponent />} />
            <Route path="/product" element={<Product />}>
              <Route path=":productName" element={<Product />} />
            </Route>
            <Route path="/admin" element={<ProtectedRoute />}>
              <Route path="/admin" element={<Admin />}>
                <Route path="addproduct" element={<Addproduct />} />
                <Route path="listproduct" element={<Listproduct />} />
              </Route>
            </Route>
          </Routes>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
