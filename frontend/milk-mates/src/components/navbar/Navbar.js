import React, { PureComponent } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends PureComponent {
  render() {
    return (
      <>
        <nav>
          <ul>
            <li>
              <Link to="/">Login</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
          </ul>
        </nav>
      </>
    );
  }
}
