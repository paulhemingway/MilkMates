/* eslint-disable */
import React from "react";
import { useState, useEffect } from "react";
import { BiHide, BiShow } from "react-icons/bi";
import { Link } from "react-router-dom";
import Loading from "components/global/Loading";

import { useAuth } from "services/AuthService";

import { InputMask } from "primereact/inputmask";

export default function CreateAccountForm({ switchToLogin }) {
  const { register, registerErrorCode } = useAuth();

  const [passVisible, setPassVisible] = useState(false);
  const [confPassVisible, setConfPassVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [zip, setZip] = useState("");
  const [pass, setPass] = useState("");
  const [confPass, setConfPass] = useState("");

  const [errors, setErrors] = useState({
    fName: "",
    lName: "",
    user: "",
    email: "",
    phone: "",
    zip: "",
    pass: "",
    confPass: "",
  });

  const nameRegex = /^[a-zA-Z]+(['-][a-zA-Z]+)*$/;
  const userRegex = /^[a-zA-Z][a-zA-Z0-9]*$/;
  const passRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

  useEffect(() => {
    errorCodeChanged(registerErrorCode);
  }, [registerErrorCode]);

  const errorCodeChanged = (code) => {
    switch (code) {
      case -1:
        //default code. nothing happened yet.
        break;
      case 0:
        // success. replace form with success message and link back to login.
        setSuccess(true);
        break;
      case 1:
        // blank field received (this won't happen but just in case)
        setErrorMsg("Please make sure all fields are filled out.");
        break;
      case 2:
        // username already exists
        setErrors({
          ...errors,
          user: "Username already exists. Please enter a different one.",
        });
        break;
      case 3:
        // email already exists
        setErrors({
          ...errors,
          user: "Email already exists. Please enter a different one or try logging in.",
        });
        break;
      default:
        // something with the backend
        setErrorMsg(
          "We're sorry, something went wrong on our end. Please try again later."
        );
        break;
    }
  };

  const togglePassVisible = () => {
    setPassVisible(!passVisible);
  };

  const toggleConfPassVisible = () => {
    setConfPassVisible(!confPassVisible);
  };

  const loginClicked = () => {
    switchToLogin();
  };

  const loginKeyPress = (e) => {
    if (e.keyCode === 13) {
      switchToLogin();
    }
  };

  const handlePhoneChange = (e) => {
    let newPhone = e.value.replace(/[\s()_-]/g, "").replace("+1", "");
    setPhone(newPhone);
  };

  const handleZipChange = (e) => {
    let newZip = e.value.replace("_", "");
    setZip(newZip);
  };

  const handlePassChange = (e) => {
    let newErrors = { ...errors };
    if (confPass.length > 0) {
      if (e.target.value !== confPass) {
        newErrors.confPass = "Passwords do not match.";
      } else {
        newErrors.confPass = "";
      }
    }
    newErrors.pass = "";

    setErrors(newErrors);
    setPass(e.target.value);
  };

  const handleConfPassChange = (e) => {
    if (e.target.value !== pass) {
      setErrors({ ...errors, confPass: "Passwords do not match." });
    } else {
      setErrors({ ...errors, confPass: "" });
    }
    setConfPass(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrorMsg("");
    setLoading(true);
    clearErrors();
    if (!valid()) {
      setLoading(false);
      return;
    }

    setTimeout(async () => {
      try {
        await register(fName, lName, user, email, phone, zip, pass);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }, 1000);
  };

  const clearErrors = () => {
    const newErrors = {
      fName: "",
      lName: "",
      user: "",
      email: "",
      phone: "",
      zip: "",
      pass: "",
      confPass: "",
    };
    setErrors(newErrors);
  };

  const valid = () => {
    const newErrors = {
      fName: validateName(fName, true),
      lName: validateName(lName, false),
      user: validateUser(user),
      email: validateEmail(email),
      phone: validatePhone(phone),
      zip: validateZip(zip),
      pass: validatePass(pass),
      confPass: validateConfPass(confPass),
    };
    setErrors(newErrors);

    const firstError = Object.keys(newErrors).find(
      (error) => newErrors[error].length > 0
    );
    console.log(firstError);
    return !Object.values(newErrors).some((value) => value.length > 0);
  };

  const validateName = (value, isFirst) => {
    let msg = "";
    if (value === "") {
      msg = `Please enter a ${isFirst ? "first" : "last"} name.`;
    } else if (!nameRegex.test(value)) {
      msg = `Names can only contain letters, hyphens (-), apostrophes ('), and spaces.`;
    }
    return msg;
  };

  const validateUser = (value) => {
    let msg = "";
    if (value === "") {
      msg = "Please enter a username.";
    } else if (!userRegex.test(value)) {
      msg =
        "Username can only contain alphanumeric characters and must start with a letter.";
    }
    return msg;
  };

  const validateEmail = (value) => {
    let msg = "";
    if (value === "") {
      msg = "Please enter an email address.";
    }
    return msg;
  };

  const validatePhone = (value) => {
    let msg = "";
    if (value.length < 10) {
      msg = "Please enter a 10-digit phone number.";
    }
    return msg;
  };

  const validateZip = (value) => {
    let msg = "";
    if (value.length < 5) {
      msg = "Please enter a 5-digit zip code.";
    }
    return msg;
  };

  const validatePass = (value) => {
    let msg = "";
    if (value.length === 0) {
      msg = "Please enter a password.";
    } else if (!passRegex.test(value)) {
      msg =
        "Password must be at least 8 characters with at least one uppercase, one lowercase, one number, and one special character.";
    }
    return msg;
  };

  const validateConfPass = (value) => {
    let msg = "";
    if (value.length === 0 && pass.length > 0) {
      msg = "Passwords do not match.";
    }
    return msg;
  };

  return (
    <div className="create-account-form shadow">
      {!success && (
        <form onSubmit={handleSubmit}>
          <h2>Join MilkMates Today</h2>

          <div className="two-col">
            <div className="input-container">
              <label>
                First Name*
                <div
                  className={
                    errors.fName.length > 0 ? "field error-field" : "field"
                  }
                >
                  <input
                    type="text"
                    onChange={(e) => setFName(e.target.value)}
                    placeholder="First Name"
                    maxLength="50"
                  ></input>
                </div>
              </label>
              <p className="error">{errors.fName}</p>
            </div>

            <div className="input-container">
              <label>
                Last Name*
                <div
                  className={
                    errors.lName.length > 0 ? "field error-field" : "field"
                  }
                >
                  <input
                    type="text"
                    onChange={(e) => setLName(e.target.value)}
                    placeholder="Last Name"
                    maxLength="50"
                  ></input>
                </div>
              </label>
              <p className="error">{errors.lName}</p>
            </div>
          </div>

          <div className="two-col">
            <div className="input-container">
              <label>
                Username*
                <div
                  className={
                    errors.user.length > 0 ? "field error-field" : "field"
                  }
                >
                  <input
                    type="text"
                    onChange={(e) => setUser(e.target.value)}
                    placeholder="Username"
                    maxLength="16"
                  ></input>
                </div>
              </label>
              <p className="error">{errors.user}</p>
            </div>

            <div className="input-container">
              <label>
                Email*
                <div
                  className={
                    errors.email.length > 0 ? "field error-field" : "field"
                  }
                >
                  <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    maxLength="100"
                  ></input>
                </div>
              </label>
              <p className="error">{errors.email}</p>
            </div>
          </div>

          <div className="two-col">
            <div className="input-container">
              <label>
                Phone Number*
                <div
                  className={
                    errors.phone.length > 0 ? "field error-field" : "field"
                  }
                >
                  <InputMask
                    placeholder="Phone Number"
                    onChange={handlePhoneChange}
                    mask="+1 (999) 999-9999"
                  />
                </div>
              </label>
              <p className="error">{errors.phone}</p>
            </div>

            <div className="input-container">
              <label>
                Zip Code*
                <div
                  className={
                    errors.zip.length > 0 ? "field error-field" : "field"
                  }
                >
                  <InputMask
                    placeholder="Zip Code"
                    onChange={handleZipChange}
                    mask="99999"
                  />
                </div>
              </label>
              <p className="error">{errors.zip}</p>
            </div>
          </div>

          <div className="two-col">
            <div className="input-container">
              <label>
                Password*
                <div
                  className={
                    errors.pass.length > 0 ? "field error-field" : "field"
                  }
                >
                  <input
                    type={passVisible ? "text" : "password"}
                    placeholder="Password"
                    onChange={handlePassChange}
                  ></input>
                  <span onClick={togglePassVisible} tabIndex="0">
                    {passVisible ? (
                      <BiShow aria-label="Hide Password" />
                    ) : (
                      <BiHide aria-label="Show password" />
                    )}
                  </span>
                </div>
              </label>
              <p className="error">{errors.pass}</p>
            </div>

            <div className="input-container">
              <label>
                Re-enter Password*
                <div
                  className={
                    errors.confPass.length > 0 ? "field error-field" : "field"
                  }
                >
                  <input
                    type={confPassVisible ? "text" : "password"}
                    onChange={handleConfPassChange}
                    placeholder="Re-enter Password"
                  ></input>
                  <span onClick={toggleConfPassVisible} tabIndex="0">
                    {confPassVisible ? (
                      <BiShow aria-label="Hide Password" />
                    ) : (
                      <BiHide aria-label="Show password" />
                    )}
                  </span>
                </div>
              </label>
              <p className="error">{errors.confPass}</p>
            </div>
          </div>

          <div className="error-loading">
            {errorMsg != "" && <p>{errorMsg}</p>}
            {loading && <Loading />}
          </div>

          <input type="submit" value="Create Account" className="submit-btn" />
          <p className="bottom-txt">
            By signing up, you agree to the{" "}
            <Link
              target="_blank"
              className="link"
              alt="Terms of service"
              to="/tos"
            >
              Terms of Service
            </Link>
            <> and </>
            <Link
              target="_blank"
              className="link"
              alt="Privacy Policy"
              to="/privacy"
            >
              Privacy Policy
            </Link>
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
      )}
      {success && (
        <div className="success-msg">
          <h2>Welcome to MilkMates!</h2>
          <p>
            Congratulations! You're now part of the MilkMates community. Start
            tracking your breastmilk production and connect with other moms to
            share or receive breastmilk. If you have any questions, don't
            hesitate to reach out to us. Happy MilkMating!
          </p>
          <span
            className="success-login link button primary-button"
            onClick={loginClicked}
            onKeyDown={loginKeyPress}
            tabIndex="0"
          >
            Login
          </span>
        </div>
      )}
    </div>
  );
}
