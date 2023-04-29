/* eslint-disable */
import React, { useState, useEffect, useRef } from "react";
import { useListingService } from "services/ListingService";
import ListingItem from "./ListingItem";
import Pagination from "components/global/Pagination";

export default function MyListings() {
  const { userListings } = useListingService();
  const perPage = 3;
  const paginationRef = useRef();

  const [displayedListings, setDisplayedListings] = useState([]);

  useEffect(() => {
    updatePage(0, perPage);
    if (paginationRef.current && paginationRef.current.resetPageNumber() !== undefined) {
      paginationRef.current.resetPageNumber();
    }
  }, [userListings]);

  const updatePage = (start, end) => {
    setDisplayedListings([...userListings].slice(start, end));
  };

  return (
    <div className="my-listings">
      {userListings.length > 0 && (
        <>
          <div className="listings">
            {displayedListings.map((listing, index) => {
              return <ListingItem key={index} listing={listing} isOwn={true} />;
            })}
          </div>
          <Pagination
            length={userListings.length}
            perPage={perPage}
            update={updatePage}
            ref={paginationRef}
          />
        </>
      )}
      {userListings.length === 0 && <p>You do not have any listings. Create a listing using the form above.</p>}
    </div>
  );
}
