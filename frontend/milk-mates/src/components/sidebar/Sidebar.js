import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import "../../assets/styles/Sidebar.scss";

import { AiOutlineUser, AiOutlineHome } from "react-icons/ai"
import { BiBarChartAlt2, BiLogOut } from "react-icons/bi";
import { FaHandHoldingHeart, FaHome, FaUser } from "react-icons/fa";
import {
  TbBottle,
  TbStar,
  TbMessageCircle,
  TbClipboardCheck,
  TbSearch
} from "react-icons/tb";

// props will need the logout function and user info (name)
export default function Sidebar(props) {

  const clicked = () => {
    props.clicked();
  }

  return (
    <nav className="nav shadow">
      <div className="app-links">
        <ul>
          <li>
            <NavLink to="/dashboard" onClick={clicked}>
              <div className="nav-link">
                <AiOutlineHome />
                <span>Dashboard</span>
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink to="/log" onClick={clicked}>
              <div className="nav-link">
                <BiBarChartAlt2 />
                <span>Milk Log</span>
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink to="/share" onClick={clicked}>
              <div className="nav-link">
                <TbBottle />
                <span>Share Milk</span>
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink to="/find" onClick={clicked}>
              <div className="nav-link">
                <TbSearch />
                <span>Find Milk</span>
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink to="/messages" onClick={clicked}>
              <div className="nav-link">
                <TbMessageCircle />
                <span>Messages</span>
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink to="/resources" onClick={clicked}>
              <div className="nav-link">
                <TbClipboardCheck />
                <span>Resources</span>
              </div>
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="profile-links">
        <hr></hr>
        <ul>
          <li>
            <NavLink to="/profile/phemingway" onClick={clicked}>
              <div className="nav-link">
                <AiOutlineUser />
                <span>phemingway</span>
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink to="/" onClick={props.logout}>
              <div className="nav-link logout">
                <BiLogOut />
                <span>Log out</span>
              </div>
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
