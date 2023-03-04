/* eslint-disable */
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "assets/styles/Landing.scss";

import MilkMatesLogo from "assets/images/logo/logo-pink.png";
import LoginForm from "components/landingPage/LoginForm";
import CreateAccountForm from "components/landingPage/CreateAccountForm";
import ForgotPassword from "components/landingPage/ForgotPassword";

export default function Landing() {
  const [isLogin, setIsLogin] = useState(true);
  const [forgotPasswordShowing, setForgotPasswordShowing] = useState(false);

  const icons = [
    {
      title: "Diary & Tracking",
    },
    {},
  ];

  const forgotPasswordClicked = () => {
    setForgotPasswordShowing(true);
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  function Form() {
    if (forgotPasswordShowing) {
      return <ForgotPassword />;
    }
    return isLogin ? (
      <LoginForm forgotPassword={forgotPasswordClicked} signUp={toggleForm} />
    ) : (
      <CreateAccountForm login={toggleForm} />
    );
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
          <Link to="/help" className="link">
            Need Help?
          </Link>
        </div>
      </div>
      <div className="form-container">
        <Form />
      </div>
      <div className="icons-container"></div>
    </div>
  );
}
