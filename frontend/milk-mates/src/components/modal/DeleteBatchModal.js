import React from "react";
import { useState } from "react";
import { useModalService } from "services/ModalService";
import { useBatchService } from "services/BatchService";
import SuccessModal from "./SuccessModal";
import Loading from "components/global/Loading";

export default function DeleteBatchModal({ batchId }) {
  const { closeModal, openModal } = useModalService();
  const { deleteBatch } = useBatchService();
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false)

  const deleteClicked = async () => {
    await setLoading(true)
    await setErrorMsg("")
    // call delete batch function
    if(!await deleteBatch(batchId)) {
      setErrorMsg("Something went wrong on our end. Please try again.")
    } else {
      openModal(
        <SuccessModal
          message={`Batch ${batchId} has been deleted successfully.`}
          redirectPath="/log"
        />
      );
    }
    setLoading(false)
  };

  return (
    <div className="delete-batch">
      <h2>Delete Batch {batchId}?</h2>
      <div className="modal-content">
        <p>Are you sure you want to delete this batch?</p>
      </div>
      <p className="modal-error-loading">
        {loading && <Loading />}
        {errorMsg}
      </p>
      <div className="buttons">
        <button className="button secondary-button-blue" onClick={closeModal}>
          Cancel
        </button>
        <button className="button primary-button-red" onClick={deleteClicked}>
          Delete Batch
        </button>
      </div>
    </div>
  );
}
