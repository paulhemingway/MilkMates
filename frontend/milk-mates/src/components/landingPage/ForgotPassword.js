import Loading from "components/global/Loading";
import React, { useState } from "react";
import { useAuth } from "services/AuthService";

export default function ForgotPassword({ backToLogin }) {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");

  const { sendForgotToken } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (username.length === 0) {
      setError("Please enter a username.");
      setLoading(false);
      return;
    }

    if (await sendForgotToken(username)) {
      setSuccess(
        "Instructions to reset your password have been sent to the email associated with your account. If an account exists with the provided username or email, you'll receive an email shortly. Follow the instructions in the email to reset your password."
      );
    }

    setLoading(false);
  };

  return (
    <div className="forgot-landing">
      <h2>Forgot Password</h2>
      <p className="desc">
        Please enter your username and we will email you a link to reset your
        password.
      </p>

      <form onSubmit={handleSubmit}>
        <p className="error">{error}</p>
        <p className="success">{success}</p>
        {loading && <Loading />}
        <label>
          Username
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <input type="submit" className="button primary-button" />
      </form>
      <button className="back" onClick={backToLogin}>
        Back to Login
      </button>
    </div>
  );
}
