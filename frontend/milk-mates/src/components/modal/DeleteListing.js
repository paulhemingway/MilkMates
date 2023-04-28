import React, { useState } from "react";
import { useListingService } from "services/ListingService";
import { useModalService } from "services/ModalService";
import SuccessModal from "./SuccessModal";
import { useAuth } from "services/AuthService";
import Loading from "components/global/Loading";

export default function DeleteListing({ listing, isAdmin }) {
  const { closeModal, openModal } = useModalService();
  const { deleteListing } = useListingService();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("")

  const deleteClicked = async () => {
    setLoading(true);
    setErrorMsg("")

    const success = await deleteListing(
      listing.listingId,
      isAdmin,
      user.username,
      listing.batchId
    );

    setLoading(false);

    if (success) {
      openModal(
        <SuccessModal
          message={`Listing ${listing.listingId} has been deleted.`}
        />
      );
    } else {
      setErrorMsg("Something went wrong. Please refresh the page and try again.")
    }
  };

  return (
    <div className="delete-listing">
      <h2>Remove This Listing?</h2>
      <div className="modal-content">
        <p>Are you sure you want to remove this listing?</p>
        <br></br>
        <div className="listing-info">
          <p>
            <strong>Title: </strong>
            {listing.title}
          </p>
          <p>
            <strong>Listing ID: </strong>
            {listing.listingId}
          </p>
          {isAdmin === 1 && (
            <p>
              <strong>User: </strong>
              {listing.username}
            </p>
          )}
        </div>
        {loading && (
          <div className="loading-icon">
            <Loading />
          </div>
        )}
        {errorMsg !== "" && (
          <p className="error-msg">{errorMsg}</p>
        )}
      </div>
      <div className="buttons">
        <button className="button secondary-button-blue" onClick={closeModal}>
          Cancel
        </button>
        <button className="button primary-button-red" onClick={deleteClicked}>
          Remove Listing
        </button>
      </div>
    </div>
  );
}
