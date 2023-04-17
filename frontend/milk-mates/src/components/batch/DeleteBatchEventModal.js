import React from "react";
import { useEffect } from "react";
import { useModalService } from "services/ModalService";
import moment from "moment";
import BatchEvent from "./BatchEvent";

export default function DeleteBatchModal({ confirmed, event }) {
  const { closeModal } = useModalService();

  const deleteClicked = () => {
    confirmed();
    closeModal();
  };

  return (
    <div className="delete-batch-event">
      <div className="modal-content">
        <p>Are you sure you want to delete this batch event?</p>
        <div className="event-card">
          <BatchEvent event={event} />
        </div>
      </div>

      <div className="buttons">
        <button className="button secondary-button-blue" onClick={closeModal}>
          Cancel
        </button>
        <button className="button primary-button-red" onClick={deleteClicked}>
          Delete
        </button>
      </div>
    </div>
  );
}
