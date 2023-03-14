import { Outlet } from "react-router-dom";
import React from "react";
import Sidebar from "components/sidebar/Sidebar";

import "../assets/styles/Layout.scss";
import Header from "./Header";

export default function Layout() {
  return (
    <div className="layout">
      <div className="content">
        <Header />
        <Outlet />
      </div>
      <div className="nav-container">
        <Sidebar />
      </div>
      
    </div>
  );
}
