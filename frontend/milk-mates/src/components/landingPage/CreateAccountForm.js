import React from "react";
import { useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";

export default function CreateAccountForm({ login }) {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("submitted");
  };

  const togglePasswordVisible = () => {
    setPasswordVisible(!passwordVisible);
  };

  const loginClicked = () => {
    login();
  };

  const loginKeyPress = (e) => {
    if (e.keyCode === 13) {
      login();
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="create-account-form shadow">
        <h2>Join MilkMates today</h2>

        <div className="two-col">
          <div className="input-container">
            <label>
              First name
              <div className="field">
                <input type="text" placeholder="First name"></input>
              </div>
            </label>
          </div>

          <div className="input-container">
            <label>
              Last name
              <div className="field">
                <input type="text" placeholder="Last name"></input>
              </div>
            </label>
          </div>
        </div>

        <div className="two-col">
          <div className="input-container">
            <label>
              Username
              <div className="field">
                <input type="text" placeholder="Username"></input>
              </div>
            </label>
          </div>

          <div className="input-container">
            <label>
              Email
              <div className="field">
                <input type="email" placeholder="Email"></input>
              </div>
            </label>
          </div>
        </div>

        <div className="two-col">
          <div className="input-container">
            <label>
              Password
              <div className="field">
                <input
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Password"
                ></input>
                <span onClick={togglePasswordVisible} tabIndex="0">
                  {passwordVisible ? (
                    <BiShow aria-label="Hide Password" />
                  ) : (
                    <BiHide aria-label="Show password" />
                  )}
                </span>
              </div>
            </label>
          </div>

          <div className="input-container">
            <label>
              Re-enter password
              <div className="field">
                <input type="password" placeholder="Re-enter password"></input>
              </div>
            </label>
          </div>
        </div>

        <input type="submit" value="Create Account" className="submit-btn" />
        <p className="bottom-txt">
          By signing up, you agree to the{" "}
          <a
            target="_blank"
            className="link"
            alt="Terms of service"
            href="/tos"
          >
            Terms of Service
          </a>
          .
        </p>
        <p className="bottom-txt">
          Already have an account?{" "}
          <span
            className="link"
            onClick={loginClicked}
            onKeyDown={loginKeyPress}
            tabIndex="0"
          >
            Login
          </span>
        </p>
      </form>
    </>
  );
}
