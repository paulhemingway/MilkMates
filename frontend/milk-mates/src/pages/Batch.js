import useDocumentTitle from "services/DocumentTitle";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useBatchService } from "services/BatchService";
import { TiArrowBack } from "react-icons/ti";
import Loading from "components/global/Loading";

import "assets/styles/pages/Batch.scss";
import BatchEvents from "components/batch/BatchEvents";
import BatchInfo from "components/batch/BatchInfo";
import { useModalService } from "services/ModalService";
import DeleteBatchModal from "components/modal/DeleteBatchModal";

export default function Batch() {
  const [batch, setBatch] = useState(null);
  const [editing, setEditing] = useState(false);

  const { batchId } = useParams();
  const { getBatch } = useBatchService();
  const { openModal } = useModalService();

  const deleteBatchClicked = () => {
    openModal(<DeleteBatchModal batchId={batch.batchId} />);
  };

  const editBatchClicked = () => {};

  useEffect(() => {
    fetchBatch(batchId);
  }, []);

  const fetchBatch = async (batchId) => {
    const fetchedBatch = await getBatch(batchId);

    fetchedBatch.events = fetchedBatch.events.sort(
      (a, b) => new Date(b.eventDate) - new Date(a.eventDate)
    );

    setBatch(fetchedBatch);
  };

  useDocumentTitle("Batch Details");
  return (
    <div className="batch">
      <div className="top">
        <h1>Batch Details</h1>
      </div>

      <div className="buttons">
        <Link to="/log" className="back button primary-button-blue">
          <TiArrowBack />
          <span>Milk Log</span>
        </Link>
        <button
          onClick={editBatchClicked}
          className="button primary-button-blue"
        >
          Edit Batch
        </button>
        <button
          onClick={deleteBatchClicked}
          className="button primary-button-red"
        >
          Delete Batch
        </button>
      </div>

      {batch === null && <Loading />}
      {batch === undefined && <p>Batch {batchId} not found.</p>}
      {batch && (
        <div className="batch-content">
          <BatchInfo batch={batch} />
          <BatchEvents events={batch.events} batchId={batch.batchId} />
        </div>
      )}
    </div>
  );
}
