import React, { useState, useEffect } from "react";
import Loading from "components/global/Loading";
import { useListingService } from "services/ListingService";
import { useAuth } from "services/AuthService";
import ListingItem from "./ListingItem";

export default function FindListings() {
  const [allListings, setAllListings] = useState([]);
  const { getAllListings } = useListingService();
  const { user } = useAuth();

  useEffect(() => {
    getListings();
  }, []);

  const getListings = async () => {
    let listings = await getAllListings();
    listings = listings.filter((listing) => {
      return listing.isActive === 1;
    });
    setAllListings(listings)
  };
  return (
    <div className="find-listings">
      <div className="listings">
        {allListings.length > 0 && allListings.map(listing => {
          return <ListingItem listing={listing} isOwn={false} />
        })}
      </div>
    </div>
  );
}
