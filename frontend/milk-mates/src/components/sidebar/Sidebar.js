import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "contexts/AuthProvider";
import "assets/styles/Sidebar.scss";

import { AiOutlineUser, AiOutlineHome } from "react-icons/ai";
import { BiBarChartAlt2, BiLogOut } from "react-icons/bi";
import {
  TbBottle,
  TbMessageCircle,
  TbClipboardCheck,
  TbSearch,
} from "react-icons/tb";

// props will need the logout function and user info (name)
export default function Sidebar(props) {
  const { user } = useAuth();

  const clicked = () => {
    props.clicked();
  };

  // useEffect(() => {
  //   console.log(user);
  // }, [user]);

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
          {user &&
            <li>
              <NavLink to={`/profile/${user.username}`} onClick={clicked}>
                <div className="nav-link">
                  <AiOutlineUser />
                  <span>{user.username}</span>
                </div>
              </NavLink>
            </li>
}
          <li>
            <div onClick={props.logout} className="logout-cont">
              <div className="nav-link logout">
                <BiLogOut />
                <span>Log out</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}
