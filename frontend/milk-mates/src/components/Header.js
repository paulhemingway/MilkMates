import React from 'react'
import MilkMatesLogo from "assets/images/logo/logo-pink.png";
import { Link } from "react-router-dom";

import "../assets/styles/Header.scss"

export default function Header() {
  return (
    <div className="top-bar">
        <div className="logo">
          <div className="logo-circle"></div>
          <img src={MilkMatesLogo} alt="MilkMates logo" />
        </div>

        <h1>MilkMates</h1>
        <div className="help-container">
          <Link to="/help" className="link">
            Need Help?
          </Link>
        </div>
      </div>
  )
}
