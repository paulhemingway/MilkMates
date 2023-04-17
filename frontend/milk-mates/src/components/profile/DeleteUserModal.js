import React from "react";
import { useModalService } from "services/ModalService";

export default function DeleteUserModal() {
  const { closeModal } = useModalService();
  const deleteClicked = () => {};
  return (
    <div className="delete-user">
      <div className="modal-content">
        <label>
          If you fr tryna delete ur account, say ong
          <input type="text" placeholder="type 'ong' here" />
        </label>
      </div>
      <div className="buttons">
        <button className="button secondary-button-blue" onClick={closeModal}>
          Cancel
        </button>
        <button className="button primary-button-red" onClick={deleteClicked}>
          Delete Account
        </button>
      </div>
    </div>
  );
}
