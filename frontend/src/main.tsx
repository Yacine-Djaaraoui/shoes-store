import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import ShopContextProvider from "./comp/ShopContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ShopContextProvider>
        <App  />
      </ShopContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
