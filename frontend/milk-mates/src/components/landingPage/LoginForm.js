/* es-lint disable */
import React from "react";
import { useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";

export default function LoginForm({ forgotPassword, signUp }) {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("submitted");
  };

  const togglePasswordVisible = () => {
    setPasswordVisible(!passwordVisible);
  };

  const forgotPasswordClicked = () => {
    forgotPassword();
  };

  const signUpClicked = () => {
    signUp();
  };

  const signUpKeyPress = (e) => {
    if (e.keyCode === 13) {
      signUp();
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Welcome back!</h2>
        <h3>Login</h3>
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
            Password
            <div className="field">
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="Password"
              ></input>
              <span onClick={togglePasswordVisible} tabIndex="0">
                {passwordVisible ? <BiShow /> : <BiHide />}
              </span>
            </div>
          </label>
          <span
            className="forgot link"
            onClick={forgotPasswordClicked}
            tabIndex="0"
          >
            Forgot Password?
          </span>
        </div>

        <input type="submit" value="Login" className="submit-btn" />
        <p className="bottom-txt">
          Don't have an account?{" "}
          <span
            className="link"
            onClick={signUpClicked}
            onKeyDown={signUpKeyPress}
            tabIndex="0"
          >
            Sign up
          </span>
        </p>
      </form>
    </>
  );
}
