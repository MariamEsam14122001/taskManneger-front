// src/components/Layout.js

import React from "react";
import Header from "../Header/Header";
import Sidebar from "../sidebar/SideBar";

const Layout = ({ children }) => {
  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        <Header />
        {children}
      </main>
    </div>
  );
};

export default Layout;
