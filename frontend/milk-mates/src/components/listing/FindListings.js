import React, { useState, useEffect, useRef } from "react";
import Loading from "components/global/Loading";
import { useListingService } from "services/ListingService";
import { useAuth } from "services/AuthService";
import ListingItem from "./ListingItem";
import Pagination from "components/global/Pagination";

export default function FindListings() {
  const [allListings, setAllListings] = useState([]);
  const [displayedListings, setDisplayedListings] = useState([]);
  const { getAllListings } = useListingService();
  const { user } = useAuth();
  const paginationRef = useRef();
  const perPage = 5;

  useEffect(() => {
    updatePage(0, 5);
    if (
      paginationRef.current &&
      paginationRef.current.resetPageNumber() !== undefined
    ) {
      paginationRef.current.resetPageNumber();
    }
  }, [allListings]);

  useEffect(() => {
    getListings();
  }, []);

  const updatePage = (start, end) => {
    setDisplayedListings([...allListings].slice(start, end));
  };

  const getListings = async () => {
    let listings = await getAllListings();
    listings = listings.filter((listing) => {
      return listing.isActive === 1;
    });
    setAllListings(listings);
  };
  return (
    <div className="find-listings flex-column">
      <Pagination
        length={allListings.length}
        perPage={perPage}
        update={updatePage}
        ref={paginationRef}
      />
      {displayedListings.length > 0 &&
        displayedListings.map((listing, index) => {
          return <ListingItem listing={listing} isOwn={false} key={index} />;
        })}
    </div>
  );
}
