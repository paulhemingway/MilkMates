import React from "react";
import MilkMatesLogo from "assets/images/logo/logo-pink.png";
import { Link } from "react-router-dom";
import { IoMdMenu, IoMdClose } from "react-icons/io";

import "../../assets/styles/Header.scss";

export default function Header(props) {
  const isAtLanding = window.location.pathname === "/";

  function NavButton() {
    const Icon = props.collapsed ? IoMdMenu : IoMdClose;

    return (
      <Icon
        onClick={toggleCollapse}
        onKeyDown={(e) => {
          if (e.keyCode === 32) {
            toggleCollapse();
          }
        }}
        tabIndex="0"
      />
    );
  }

  const toggleCollapse = () => {
    props.toggleCollapse();
  };

  return (
    <div className="top-bar">
      <Link to="/dashboard">
        <div className="logo">
          <div className="logo-circle"></div>
          <img src={MilkMatesLogo} alt="MilkMates logo" />
        </div>
      </Link>

      <h1>MilkMates</h1>
      <div className="right">
        {isAtLanding ? (
          <Link to="/help" className="link">
            Need Help?
          </Link>
        ) : (
          <NavButton onClick={toggleCollapse} />
        )}
      </div>
    </div>
  );
}
