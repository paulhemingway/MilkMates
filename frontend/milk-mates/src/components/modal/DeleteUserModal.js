import React, { useState } from "react";
import { useModalService } from "services/ModalService";
import { useAuth } from "services/AuthService";
import Loading from "components/global/Loading";

export default function DeleteUserModal() {
  const { closeModal } = useModalService();
  const { deleteAccount, user, logoutWithDelay } = useAuth();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    const deleteSuccess = await deleteAccount(user.username, password);
    if (deleteSuccess) {
      setSuccess(true);
      setLoading(false);
      await logoutWithDelay();
      closeModal();
    }
  };

  const passChanged = (e) => {
    setPassword(e.target.value);
    setErrorMsg("");
  };
  return (
    <div className="delete-user">
      <h2>Deactivate Account</h2>
      <form onSubmit={handleSubmit}>
        <div className="modal-content">
          <p>
            This will make your account unusable. You will not be able to
            register the same username.
          </p>
          <br />
          <p>To continue, enter your password.</p>
          <br />
          <label>
            Password
            <input
              type="password"
              placeholder="Password"
              onChange={passChanged}
              required
            />
          </label>
        </div>
        <div className="modal-error-loading">
          {errorMsg}
          {loading && <Loading />}
        </div>
        {success && (
          <p className="success">Successfully deactivated account!</p>
        )}
        <div className="buttons">
          <button
            type="button"
            className="button secondary-button-blue"
            onClick={closeModal}
          >
            Cancel
          </button>
          <input
            type="submit"
            className="button primary-button-red"
            value="Deactivate"
          />
        </div>
      </form>
    </div>
  );
}
