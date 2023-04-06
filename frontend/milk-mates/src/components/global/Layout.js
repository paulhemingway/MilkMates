import { Outlet } from "react-router-dom";
import React from "react";
import Sidebar from "components/sidebar/Sidebar";
import { useState } from "react";
import { useAuth } from "contexts/AuthProvider";

import "assets/styles/Layout.scss";
import Header from "./Header";

export default function Layout() {
  const [collapsed, setCollapsed] = useState(true);
  const { logout } = useAuth();

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="layout">
      <Header collapsed={collapsed} toggleCollapse={toggleCollapse} />

      <div className="content">
        <nav className={`nav-container ${collapsed ? "collapsed" : ""}`}>
          <Sidebar
            clicked={toggleCollapse}
            collapsed={collapsed}
            logout={logout}
          />
        </nav>
        <main className="outlet-container">
          <div className="outlet">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
