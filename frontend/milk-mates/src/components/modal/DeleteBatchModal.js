import React from "react";
import { useState } from "react";
import { useModalService } from "services/ModalService";
import { useBatchService } from "services/BatchService";
import { useAuth } from "services/AuthService";
import SuccessModal from "./SuccessModal";
import Loading from "components/global/Loading";
import { useListingService } from "services/ListingService";

export default function DeleteBatchModal({ batchId, isListed }) {
  const { closeModal, openModal } = useModalService();
  const { user } = useAuth();
  const { deleteBatch } = useBatchService();
  const { deleteListing, userListings } = useListingService();
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const deleteClicked = async () => {
    try {
      setLoading(true);
      setErrorMsg("");
      const deleted = await deleteBatch(batchId);
      if (!deleted) {
        throw new Error("Something went wrong on our end. Please try again.");
      }
      if (isListed) {
        const listing = userListings.find(
          (listing) => batchId === listing.batchId
        );
        const deletedListing = await deleteListing(
          listing.listingId,
          false,
          user.username,
          batchId
        );
        if (!deletedListing) {
          throw new Error("Something went wrong on our end. Please try again.");
        }
      }
      successModal();
    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  const successModal = () => {
    openModal(
      <SuccessModal
        message={`Batch ${batchId} ${isListed ? 'and its listing' : ''} has been deleted successfully.`}
        redirectPath="/log"
      />
    );
  };

  return (
    <div className="delete-batch">
      <h2>Delete Batch {batchId}?</h2>
      <div className="modal-content">
        <p>Are you sure you want to delete this batch?</p>
      </div>
      <div className="modal-error-loading">
        {isListed && (
          <p>
            WARNING: This batch is currently listed. Deleting this batch will
            also delete the listing.
          </p>
        )}
        <p>{errorMsg}</p>
        {loading && <Loading />}
      </div>
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
