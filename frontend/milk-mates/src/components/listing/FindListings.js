/* eslint-disable */
import React, { useState, useEffect, useRef } from "react";
import Loading from "components/global/Loading";
import { useListingService } from "services/ListingService";
import { useAuth } from "services/AuthService";
import ListingItem from "./ListingItem";
import Pagination from "components/global/Pagination";

export default function FindListings({ filters }) {
  const [allListings, setAllListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [displayedListings, setDisplayedListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showError, setShowError] = useState(false);
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
  }, [filteredListings]);

  useEffect(() => {
    getListings();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters]);

  const applyFilters = () => {
    const earliest = new Date(filters.earliest);
    const newListings = allListings.filter((listing) => {
      if (
        filters.earliest !== null &&
        earliest > new Date(listing.createdDateTime)
      ) {
        return false;
      }
      if (filters.freeOnly && listing.price > 0) {
        return false;
      }
      if (filters.noCaffeine && listing.caffeine === 1) {
        return false;
      }
      if (filters.volume > listing.volume) {
        return false;
      }
      if (filters.zipCode !== "" && listing.zipCode !== filters.zipCode) {
        return false;
      }
      if (filters.sickness.length > 0) {
        const sicknessArr = listing.sickness.split(",");
        if (sicknessArr.some((item) => filters.sickness.includes(item))) {
          return false;
        }
      }
      if (filters.medications.length > 0) {
        const medsArr = listing.medications.split(",");
        if (medsArr.some((item) => filters.medications.includes(item))) {
          return false;
        }
      }
      if (filters.vaccines.length > 0) {
        const vaccineArr = listing.vaccines.split(",");
        if (vaccineArr.some((item) => filters.vaccines.includes(item))) {
          return false;
        }
      }if (filters.diets.length > 0) {
        const dietsArr = listing.diet.split(",");
        if (dietsArr.some((item) => filters.diets.includes(item))) {
          return false;
        }
      }

      return true;
    });
    setFilteredListings(newListings);
  };

  const updatePage = (start, end) => {
    setDisplayedListings([...filteredListings].slice(start, end));
  };

  const getListings = async () => {
    let listings = await getAllListings();
    if (listings === null) {
      setLoading(false);
      setShowError(true);
    }
    listings = listings.filter((listing) => {
      return listing.isActive === 1 && listing.username !== user.username;
    });
    setAllListings(listings);
    setFilteredListings(listings);
    setLoading(false);
  };

  return (
    <div className="find-listings flex-column">
      {loading && <Loading />}
      {showError && (
        <p>
          Something went wrong when loading the listings. Please refresh the
          page.
        </p>
      )}
      <Pagination
        length={filteredListings.length}
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
