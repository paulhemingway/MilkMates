/* eslint-disable */
import React, { useState, useEffect, useRef } from "react";
import Loading from "components/global/Loading";
import { useListingService } from "services/ListingService";
import { useAuth } from "services/AuthService";
import ListingItem from "./ListingItem";
import Pagination from "components/global/Pagination";

export default function FindListings() {
  const [allListings, setAllListings] = useState([]);
  const [displayedListings, setDisplayedListings] = useState([]);
  const [loading, setLoading] = useState(true)
  const [showError, setShowError] = useState(false)
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
    if(listings === null) {
      setLoading(false)
      setShowError(true)
    }
    listings = listings.filter((listing) => {
      return listing.isActive === 1 && listing.username !== user.username;
    });
    setAllListings(listings);
    setLoading(false)
  };
  return (
    <div className="find-listings flex-column">
      {loading && <Loading />}
      {showError && <p>Something went wrong when loading the listings. Please refresh the page.</p>}
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
