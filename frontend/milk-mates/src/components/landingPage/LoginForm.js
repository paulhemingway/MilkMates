/* eslint-disable */
import React, { useEffect } from "react";
import { useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";
import { useAuth } from "contexts/AuthProvider";
import Loading from "components/global/Loading";

export default function LoginForm({ forgotPassword, signUp }) {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const { login, errorCode, loggedIn } = useAuth();

  const errorMessages = [
    "",
    "The username you entered does not exist. Please try again.",
    "The password you entered was incorrect. Please try again.",
    "Please enter a username.",
    "Please enter a password.",
    "Your account is inactive. Please contact support to reactivate your account.",
    "Error communicating with the server. Please contact support.",
  ];

  useEffect(() => {
    setErrorMsg(errorMessages[errorCode]);
  }, [errorCode]);

  useEffect(() => {
    if (loggedIn) {
      // redirect
    }
  }, [loggedIn]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setErrorMsg("");

    setTimeout(async () => {
      try {
        await login(username, password);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
        
      }
    }, 1000);
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

  const usernameChanged = (event) => {
    setUsername(event.target.value);
  };

  const passwordChanged = (event) => {
    setPassword(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="login-form shadow">
      <h2>Welcome Back!</h2>
      <div className="input-container">
        <label>
          Username
          <div className="field">
            <input
              type="text"
              placeholder="Username"
              onChange={usernameChanged}
              required
            ></input>
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
              onChange={passwordChanged}
              required
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

      <div className="error-loading">
        {errorMsg != "" && <p>{errorMsg}</p>}
        {loading && <Loading />}
      </div>

      <input type="submit" value="Login" className="submit-btn" />
      <p className="bottom-txt">
        New to MilkMates?{" "}
        <span
          className="link"
          onClick={signUpClicked}
          onKeyDown={signUpKeyPress}
          tabIndex="0"
        >
          Create an account
        </span>
      </p>
    </form>
  );
}
