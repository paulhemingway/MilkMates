/* eslint-disable */
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import "assets/styles/variables.scss"
import "assets/styles/Landing.scss";

import MilkMatesLogo from "assets/images/logo/logo-pink.png";
import Mother from "assets/images/mother.png";
import LoginForm from "components/landingPage/loginForm/LoginForm";
import CreateAccountForm from "components/landingPage/createAccountForm/CreateAccountForm";

export default function Landing() {
  const [isLogin, setIsLogin] = useState(true);
  const icons = [
    {
      title: "Diary & Tracking"
    },
    {}
  ]

  function Form() {
    return isLogin ? <LoginForm /> : <CreateAccountForm />
  }

  return (
    <div className="landing-container">
      <div className="top-bar">
        <div className="logo">
          <div className="logo-circle"></div>
          <img src={MilkMatesLogo} alt="MilkMates logo" />
        </div>
        
        <h1>MilkMates</h1>
        <div className="help-container">
          <Link to="/help">Need Help?</Link>
        </div>
      </div>
      <div className="form-container">
        <Form />
      </div>
      <div className="icons-container">
        
      </div>
    </div>
  );
}
