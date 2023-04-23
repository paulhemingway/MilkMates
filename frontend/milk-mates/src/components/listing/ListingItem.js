import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

export default function ListingItem({ listing, isOwn }) {
  return (
    <div className="listing-item flex-column" tabIndex="0">
      <div className="top">
        <h3>
          WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW
        </h3>
      </div>

      <div className="second-row">
        <div className="date">
          <h4>Date Created</h4>
          <p>{moment(listing.createdDateTime).format("LLLL")}</p>
        </div>
        <div className="author">
          <h4>Author</h4>
          <Link to={`/profile/${listing.username}`}>{listing.username}</Link>
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
      <div className="bottom">hi</div>
    </div>
  );
}
