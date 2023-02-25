import { Outlet, Link } from "react-router-dom";
import React, { PureComponent } from "react";
import Navbar from "components/navbar/Navbar";

export default class Layout extends PureComponent {
  render() {
    return (
      <>
        <Navbar />
        <Outlet />
      </>
    );
  }
}
