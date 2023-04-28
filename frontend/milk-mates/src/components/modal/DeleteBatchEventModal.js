import React from "react";
import { useState, useEffect } from "react";
import { useModalService } from "services/ModalService";
import moment from "moment";
import BatchEvent from "../batch/BatchEvent";
import { useBatchService } from "services/BatchService";
import Loading from "components/global/Loading";
import SuccessModal from "./SuccessModal";

export default function DeleteBatchEventModal({ event, removeEvent }) {
  const { closeModal, openModal } = useModalService();
  const { deleteBatchEvent } = useBatchService();
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const deleteClicked = async () => {
    try {
      setLoading(true);
      setErrorMsg('');
      const deleted = await deleteBatchEvent(event.batchId, event.batchEventId);
      console.log(deleted)
      if (!deleted) {
        throw new Error("Something went wrong deleting batch. Please try again.");
      }
      removeEvent(event.batchEventId);
      successModal();
    } catch (error) {
      setErrorMsg(error.message)
    } finally {
      setLoading(false)
    }
  };

  const successModal = () => {
    openModal(
      <SuccessModal message={`Batch event has been deleted successfully.`} />
    );
  };

  return (
    <div className="delete-batch-event">
      <h2>Delete Batch Event?</h2>
      <div className="modal-content">
        <p>Are you sure you want to delete this batch event?</p>
        <div className="event-card">
          <BatchEvent event={event} inModal={true} />
        </div>
      </div>
      <div className="modal-error-loading">
        {loading && <Loading />}
        {errorMsg && <p>{errorMsg}</p>}
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
