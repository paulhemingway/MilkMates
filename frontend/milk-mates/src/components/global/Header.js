import React from "react";
import MilkMatesLogo from "assets/images/logo/logo-pink.png";
import { Link } from "react-router-dom";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { useAuth } from "services/AuthService";

import "assets/styles/global/Header.scss";

export default function Header(props) {
  const isAtLanding = window.location.pathname === "/";
  const { loggedIn } = useAuth()

  function NavButton() {
    if (props.showMenu === false) {
      return <></>;
    }
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
    <header className="top-bar">
      <Link to={loggedIn ? '/dashboard' : '/'}>
        <div className="logo">
          <div className="logo-circle"></div>
          <img src={MilkMatesLogo} alt="MilkMates logo" />
        </div>
      </Link>

      <Link to={loggedIn ? '/dashboard' : '/'}>
        <span className="title">MilkMates</span>
      </Link>

      <div className="right">
        {isAtLanding ? (
          <Link to="/help" className="link">
            Need Help?
          </Link>
        ) : (
          <NavButton onClick={toggleCollapse} />
        )}
      </div>
    </header>
  );
}
