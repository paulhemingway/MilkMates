import { Outlet } from "react-router-dom";
import React from "react";
import Navbar from "components/navbar/Navbar";

export default function Layout() {
  return (
    <div>
      <Outlet />
      <Navbar />
    </div>
  );
}
