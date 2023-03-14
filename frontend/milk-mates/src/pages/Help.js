import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Accordion from "../components/helpPage/Accordion"


import FAQ from "../data/FAQ.json"
import "assets/styles/global.scss"
import "assets/styles/Landing.scss";
import "assets/styles/HelpPage.scss"


import MilkMatesLogo from "assets/images/logo/logo-pink.png";

export default function Help() {


  return (
    <>
      <div className="landing">
        <div className="top-bar">
          <div className="logo">
            <div className="logo-circle"></div>
            <img src={MilkMatesLogo} alt="MilkMates logo" />
          </div>

          <h1>FAQ Page</h1>
          <div className="help-container">
            <Link to="/" className="link">
              Back to Home
          </Link>
          </div>
        </div>
        <div className="accordions">
          {FAQ.map((q, index) => (<Accordion question={q} key={index} />))}
        </div>
      </div>


    </>

  )
}
