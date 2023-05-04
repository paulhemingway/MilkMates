import React, { useState, useEffect } from "react";
import useDocumentTitle from "services/DocumentTitle";
import PublicWrapper from "components/global/PublicWrapper";
import { useParams } from "react-router-dom";
import Loading from "components/global/Loading";
import { useAuth } from "services/AuthService";
import Wrapper from "components/global/Wrapper";
import { BiHide, BiShow } from "react-icons/bi";
import { Link } from "react-router-dom";
import {AiFillCheckCircle} from "react-icons/ai"

export default function Forgot(props) {
  useDocumentTitle(props.title);
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(true);
  const { token } = useParams();
  const { verifyForgotToken, forgotChangePassword } = useAuth();

  const [username, setUsername] = useState("");

  const [newPass, setNewPass] = useState("");
  const [confPass, setConfPass] = useState("");
  const [visible, setVisible] = useState([false, false]);
  const [formLoading, setFormLoading] = useState(false);
  const [errors, setErrors] = useState({
    new: "",
    conf: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const visibleKeyDown = (index) => (event) => {
    if (event.key === " " || event.key === "Enter") {
      // Your code for handling the key press here
      togglePasswordVisible(index);
    }
  };

  useEffect(() => {
    verify();
  }, []);

  const verify = async () => {
    const response = await verifyForgotToken(token);
    setIsVerified(response[0].success);
    setUsername(response[1]);
    setLoading(false);
  };

  const togglePasswordVisible = (index) => {
    const newVisible = [...visible];
    newVisible[index] = !newVisible[index];
    setVisible(newVisible);
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

  const valid = () => {
    const newErrors = {
      new: validateNewPass(newPass),
      conf: validateConfPass(confPass),
    };
    setErrors(newErrors);

    return !Object.values(newErrors).some((value) => value.length > 0);
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

  const handleSubmit = async (e) => {
    setErrorMsg("");

    e.preventDefault();

    if (!valid()) return;
    setFormLoading(true);

    const errorCode = await forgotChangePassword(username, newPass, token);
    if (errorCode[0].success) {
      setSuccess(true);
    } else {
      setErrorMsg(
        "Something went wrong. Please refresh the page and try again."
      );
    }
    setFormLoading(false);
  };

  const passRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

  return (
    <PublicWrapper header="Forgot Password">
      <div className="forgot">
        {loading && <Loading />}
        {!loading && (
          <>
            {isVerified && (
              <Wrapper header="Reset Password">
                {!success && (
                  <form onSubmit={handleSubmit}>
                    <div className="input-cont">
                      <label>
                        New Password
                        <div
                          className={`field ${
                            errors.new.length > 0 && "error-field"
                          }`}
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
                          className={`field ${
                            errors.conf.length > 0 && "error-field"
                          }`}
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
                    <div className="message">
                      {formLoading && <Loading />}
                      <p className="error">{errorMsg}</p>
                    </div>
                    <input
                      type="submit"
                      className="button primary-button-blue"
                    />
                  </form>
                )}
                {success && (
                  <div className="success">
                    <p>Your password was successfully changed! <AiFillCheckCircle /></p>
                    <Link to="/" className="back-button button primary-button-blue">Login</Link>
                  </div>
                )}
              </Wrapper>
            )}
            {!isVerified && (
              <div className="invalid">
                <p>
                  Sorry, the link to reset your password has expired or is
                  invalid. Please request a new link on the landing page
                  or contact support for assistance. Thank you!
                </p>
                <Link to="/" className="back-button button primary-button-blue">Back To Login</Link>
              </div>
            )}
          </>
        )}
      </div>
    </PublicWrapper>
  );
}
