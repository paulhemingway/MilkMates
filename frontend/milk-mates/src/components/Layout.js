import { Outlet } from "react-router-dom";
import React from "react";
import Sidebar from "components/sidebar/Sidebar";
import { useState } from "react";

import "../assets/styles/Layout.scss";
import Header from "./Header";

export default function Layout() {
  const [collapsed, setCollapsed] = useState(true)

  const toggleCollapse = () => {
    setCollapsed(!collapsed)
  }

  return (
    <div className="layout">
       
      <div className="content">
        <Header collapsed={collapsed} toggleCollapse={toggleCollapse} />
        <Outlet />
      </div>
      <div className={`nav-container ${collapsed ? 'collapsed' : ''}`}>
        <Sidebar />
      </div>
     
      
    </div>
  );
}
