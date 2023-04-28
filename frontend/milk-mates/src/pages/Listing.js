import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useListingService } from "services/ListingService";
import BatchInfo from "components/batch/BatchInfo";
import { useAuth } from "services/AuthService";
import Loading from "components/global/Loading";
import ListingInfo from "components/listing/ListingInfo";

export default function Listing() {
  const { listingId } = useParams();
  const { user } = useAuth();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [batch, setBatch] = useState(null);
  const {getListing} = useListingService()

  useEffect(() => {
    retrieveListing();
  }, []);

  const retrieveListing = async () => {
    // this will turn into pulling from the API
    const newListing = await getListing(listingId);

    await setListing(newListing);

    const newBatch = {
      batchId: newListing.batchId,
      productionDate: newListing.productionDate,
      volume: newListing.volume,
      caffeine: newListing.caffeine,
      sickness: newListing.sickness,
      medications: newListing.medications,
      vaccines: newListing.vaccines,
      diet: newListing.diet,
    };

    setBatch(newBatch);
    setLoading(false);
  };


  return (
    <div className="listing">
      <h1>Listing #{listingId}</h1>
      {loading && <Loading />}
      {listing !== null && (
        <>
          <ListingInfo listing={listing} />
          <BatchInfo batch={batch} status={listing.status} />
        </>
      )}
      {listing === null && !loading && <p>Error retrieving listing #{listingId}. Please refresh the page.</p>}
    </div>
  );
}
