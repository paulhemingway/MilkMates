/* es-lint disable */
import React from "react";
import { useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";

export default function LoginForm() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [forgotShowing, setForgotShowing] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("submitted");
  };

  const togglePasswordVisible = () => {
    setPasswordVisible(!passwordVisible);
  };

  const forgotPasswordClicked = () => {
    setForgotShowing(true);
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
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
        <a className="forgot" onClick={forgotPasswordClicked} tabIndex="0">
          Forgot Password?
        </a>
      </div>

      <input type="submit" value="Login" className="submit-btn" />
    </form>
  );
}
