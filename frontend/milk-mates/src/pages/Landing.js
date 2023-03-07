/* eslint-disable */
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "assets/styles/Landing.scss";

import MilkMatesLogo from "assets/images/logo/logo-pink.png";
import LoginForm from "components/landingPage/LoginForm";
import CreateAccountForm from "components/landingPage/CreateAccountForm";
import ForgotPassword from "components/landingPage/ForgotPassword";

import { BiBarChartAlt2 } from "react-icons/bi";
import { FaHandHoldingHeart } from "react-icons/fa";
import { TbBottle, TbStar, TbMessageCircle } from "react-icons/tb";

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
    <div className="landing">
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
      <div className="info-container">
        <h2>Giving Breastmilk a Second Life!</h2>
        <div className="icons shadow">
          <div className="icon">
            <BiBarChartAlt2 />
            <h3>Tracking</h3>
            <p>
              Keep track of your daily milk production and monitor your
              breastfeeding journey.
            </p>
          </div>
          <div className="icon">
            <FaHandHoldingHeart />
            <h3>Give Milk</h3>
            <p>
              Donate or sell your excess breastmilk to help other parents and
              babies in need.
            </p>
          </div>
          <div className="icon">
            <TbBottle />
            <h3>Request Milk</h3>
            <p>
              Find and request breastmilk from other parents in the MilkMates
              community.
            </p>
          </div>
          <div className="icon">
            <TbMessageCircle />
            <h3>Messages</h3>
            <p>
              Connect and chat with other MilkMates users instantly to
              coordinate milk sharing.
            </p>
          </div>
          <div className="icon">
            <TbStar />
            <h3>Seller Reviews</h3>
            <p>
              Read reviews from other users to ensure a safe and reliable milk
              sharing experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
