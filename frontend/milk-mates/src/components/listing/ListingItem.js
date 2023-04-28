import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "services/AuthService";
import moment from "moment";
import { useModalService } from "services/ModalService";
import DeleteListing from "components/modal/DeleteListing";

export default function ListingItem({ listing, isOwn }) {
  const { user } = useAuth();
  const { openModal } = useModalService();

  const navigate = useNavigate();

  const goToListing = () => {
    navigate(`/${isOwn ? 'share' : 'find' }/listing/${listing.listingId}`);
  };

  const removeClicked = (e) => {
    e.stopPropagation();
    openModal(<DeleteListing listing={listing} isAdmin={user.isAdmin} />)
  };

  const interestedClicked = (e) => {
    
  }

  return (
    <div
      className="listing-item flex-column"
      onClick={goToListing}
      tabIndex="0"
    >
      <div className="top">
        <h3>{listing.title}</h3>
      </div>

      <div className="second-row">
        <div className="date">
          <h4>Posted</h4>
          <p>{moment(listing.createdDateTime).fromNow()}</p>
        </div>
        <div className="author">
          <h4>Author</h4>
          <Link
            className="profile-link"
            to={`/profile/${listing.username}`}
            onClick={(e) => e.stopPropagation()}
          >
            {listing.username}
          </Link>
        </div>
      </div>

      <div className="description">
        <h4>Description</h4>
        <p>
          {listing.description.length <= 150
            ? listing.description
            : listing.description.slice(0, 150) + "..."}
        </p>
      </div>
      <div className="bottom">
        {(isOwn || user.isAdmin === 1) && (
          <button className="button primary-button-red" onClick={removeClicked}>
            Remove Listing
          </button>
        )}
        {(!isOwn) && (
          <button className="button primary-button-blue" onClick={interestedClicked}>
            I'm Interested
          </button>
        )}
      </div>
    </div>
  );
}
