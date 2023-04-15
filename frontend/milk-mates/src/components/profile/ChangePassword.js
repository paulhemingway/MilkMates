import Loading from "components/global/Loading";
import React, { useEffect, useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";
import { useAuth } from "services/AuthService";

import {
  AiOutlineCheckCircle,
  AiOutlineExclamationCircle,
} from "react-icons/ai";

export default function ChangePassword({ username }) {
  const [currPass, setCurrPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confPass, setConfPass] = useState("");

  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState([false, false, false]);
  const [errors, setErrors] = useState({
    curr: "",
    new: "",
    conf: "",
  });

  const [message, setMessage] = useState("");
  const { changePassword } = useAuth();

  const passRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

  const messages = {
    success: "Password successfully updated!",
    incorrect: "The old password is incorrect. Please try again.",
    backend: "Something went wrong on our end. Please try again.",
  };

  const visibleKeyDown = (index) => (event) => {
    if (event.key === " " || event.key === "Enter") {
      // Your code for handling the key press here
      togglePasswordVisible(index);
    }
  };

  const togglePasswordVisible = (index) => {
    const newVisible = [...visible];
    newVisible[index] = !newVisible[index];
    setVisible(newVisible);
  };

  const handleCurrPassChange = (e) => {
    setCurrPass(e.target.value);
  };

  const handleNewPassChange = (e) => {
    if (confPass.length > 0 && e.target.value !== confPass) {
      setErrors({ ...errors, conf: "Passwords do not match." });
    } else {
      setErrors({ ...errors, conf: "" });
    }
    setNewPass(e.target.value);
  };

  const handleConfPassChange = (e) => {
    if (e.target.value !== newPass) {
      setErrors({ ...errors, conf: "Passwords do not match." });
    } else {
      setErrors({ ...errors, conf: "" });
    }
    setConfPass(e.target.value);
  };

  const handleSubmit = async (e) => {
    setMessage("");

    e.preventDefault();

    if (!valid()) return;
    setLoading(true);

    const errorCode = await changePassword(username, currPass, newPass);

    setTimeout(() => {
      switch (errorCode) {
        case 0:
          setMessage(messages.success);
          break;
        case 3:
          setMessage(messages.incorrect);
          break;
        default:
          setMessage(messages.backend);
      }
      setLoading(false);
    }, 500);
  };

  const valid = () => {
    const newErrors = {
      curr: validateCurrPass(currPass),
      new: validateNewPass(newPass),
      conf: validateConfPass(confPass),
    };
    setErrors(newErrors);

    return !Object.values(newErrors).some((value) => value.length > 0);
  };

  const validateCurrPass = (value) => {
    let msg = "";
    if (value.length === 0) {
      msg = "Please enter your current password.";
    }
    return msg;
  };

  const validateNewPass = (value) => {
    let msg = "";
    if (value.length === 0) {
      msg = "Please enter your new password.";
    } else if (!passRegex.test(value)) {
      msg =
        "Password must be at least 8 characters with at least one uppercase, one lowercase, one number, and one special character.";
    }
    return msg;
  };

  const validateConfPass = (value) => {
    let msg = "";
    if (value !== newPass) {
      msg = "Passwords do not match.";
    }
    return msg;
  };

  return (
    <div className="change-password">
      <h2>Change Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="inputs">
          <div className="input-cont">
            <label>
              Old Password
              <div
                className={`field ${errors.curr.length > 0 && "error-field"}`}
              >
                <input
                  type={visible[0] ? "text" : "password"}
                  placeholder="Password"
                  onChange={handleCurrPassChange}
                ></input>
                <span
                  onKeyDown={visibleKeyDown(0)}
                  onClick={() => togglePasswordVisible(0)}
                  tabIndex="0"
                >
                  {visible[0] ? <BiShow /> : <BiHide />}
                </span>
              </div>
            </label>
            <p className="error">{errors.curr}</p>
          </div>
          <div className="input-cont">
            <label>
              New Password
              <div
                className={`field ${errors.new.length > 0 && "error-field"}`}
              >
                <input
                  type={visible[1] ? "text" : "password"}
                  placeholder="Password"
                  onChange={handleNewPassChange}
                ></input>
                <span
                  onKeyDown={visibleKeyDown(1)}
                  onClick={() => togglePasswordVisible(1)}
                  tabIndex="0"
                >
                  {visible[1] ? <BiShow /> : <BiHide />}
                </span>
              </div>
            </label>
            <p className="error">{errors.new}</p>
          </div>
          <div className="input-cont">
            <label>
              Confirm New Password
              <div
                className={`field ${errors.conf.length > 0 && "error-field"}`}
              >
                <input
                  type={visible[2] ? "text" : "password"}
                  placeholder="Password"
                  onChange={handleConfPassChange}
                ></input>
                <span
                  onKeyDown={visibleKeyDown(2)}
                  onClick={() => togglePasswordVisible(2)}
                  tabIndex="0"
                >
                  {visible[2] ? <BiShow /> : <BiHide />}
                </span>
              </div>
            </label>
            <p className="error">{errors.conf}</p>
          </div>
          <div className="buttons">
            <input type="submit" value="Update Password" className="save" />
          </div>
          <div
            className={`msg ${
              message === messages.success ? "msg-success" : "msg-error"
            }`}
          >
            {loading && <Loading />}
            {message !== "" && (
              <>
                {message === messages.success ? (
                  <AiOutlineCheckCircle />
                ) : (
                  <AiOutlineExclamationCircle />
                )}
                <p>{message}</p>
              </>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
