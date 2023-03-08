import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import "../../assets/styles/Sidebar.scss";

import { BiBarChartAlt2, BiLogOut } from "react-icons/bi";
import { FaHandHoldingHeart, FaHome, FaUser } from "react-icons/fa";
import {
  TbBottle,
  TbStar,
  TbMessageCircle,
  TbClipboardCheck,
} from "react-icons/tb";

// props will need the logout function and user info (name)
export default function Sidebar(props) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <nav className="nav shadow">
      <div className="app-links">
        <ul>
          <li>
            <NavLink to="/dashboard">
              <div className="nav-link">
                <FaHome />
                <span>Dashboard</span>
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink to="/log">
              <div className="nav-link">
                <BiBarChartAlt2 />
                <span>Milk Log</span>
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink to="/share">
              <div className="nav-link">
                <FaHandHoldingHeart />
                <span>Share Milk</span>
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink to="/find">
              <div className="nav-link">
                <TbBottle />
                <span>Find Milk</span>
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink to="/messages">
              <div className="nav-link">
                <TbMessageCircle />
                <span>Messages</span>
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink to="/resources">
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
            <NavLink to="/profile/phemingway">
              <div className="nav-link">
                <FaUser />
                <span>phemingway</span>
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink to="/" onClick={props.logout}>
              <div className="nav-link">
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
