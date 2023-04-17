import { Outlet } from "react-router-dom";
import React from "react";
import Sidebar from "components/sidebar/Sidebar";
import { useState } from "react";
import { useAuth } from "services/AuthService";
import { useModalService } from "services/ModalService";
import Modal from "./Modal";

import "assets/styles/global/Layout.scss";
import Header from "./Header";

export default function Layout() {
  const [collapsed, setCollapsed] = useState(true);
  const { logout } = useAuth();
  const { showModal } = useModalService();

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
          {showModal && <Modal />}
          <div className="outlet">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
