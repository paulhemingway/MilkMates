import useDocumentTitle from "services/DocumentTitle";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useBatchService } from "services/BatchService";
import { TiArrowBack } from "react-icons/ti";
import Loading from "components/global/Loading";

import "assets/styles/pages/Batch.scss";
import BatchEvents from "components/batch/BatchEvents";
import BatchInfo from "components/batch/BatchInfo";

export default function Batch() {
  const [batch, setBatch] = useState(null);
  const [editing, setEditing] = useState(false);

  const { batchId } = useParams();
  const { getBatch } = useBatchService();

  useEffect(() => {
    fetchBatch(batchId);
  }, []);

  const fetchBatch = async (batchId) => {
    const fetchedBatch = await getBatch(batchId);
    
    fetchedBatch.events = fetchedBatch.events.sort((a, b) => new Date(b.eventDate) - new Date(a.eventDate));

    setBatch(fetchedBatch);
  };

  useDocumentTitle("Batch Details");
  return (
    <div className="batch">
      <div className="top">
        <Link to="/log" className="back button primary-button-blue">
          <TiArrowBack />
          <span>Milk Log</span>
        </Link>

        <h1>Batch Details</h1>
      </div>

      {batch === null && <Loading />}
      {batch === undefined && <p>Batch {batchId} not found.</p>}
      {batch && (
        <div className="batch-content">
          <BatchInfo batch={batch} />
          <BatchEvents events={batch.events} />
        </div>
      )}
    </div>
  );
}
