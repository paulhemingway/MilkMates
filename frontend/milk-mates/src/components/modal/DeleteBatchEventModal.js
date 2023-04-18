import React from "react";
import { useEffect } from "react";
import { useModalService } from "services/ModalService";
import moment from "moment";
import BatchEvent from "../batch/BatchEvent";
import { useBatchService } from "services/BatchService";

export default function DeleteBatchEventModal({  event }) {
  const { closeModal } = useModalService();

  const deleteClicked = () => {
    closeModal();
    // call delete batch event function
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
