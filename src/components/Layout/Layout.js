// src/components/Layout.js

import React from "react";
import Header from "../Header/Header";
import Sidebar from "../sidebar/SideBar"; 

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <Sidebar />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
