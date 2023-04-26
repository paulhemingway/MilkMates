import React from "react";
import { Link } from "react-router-dom";
import { GoChevronRight } from "react-icons/go";

export default function DashWrapper(props) {
  return (
    <div className="dash-wrapper">
      <Link to={props.path} className="top-link">
        <h2>{props.header}</h2>
        <GoChevronRight />
      </Link>
      <div className="blue-line"></div>

      {props.children}
    </div>
  );
}
