/* eslint-disable */
import useDocumentTitle from "services/DocumentTitle";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useBatchService } from "services/BatchService";
import { TiArrowBack } from "react-icons/ti";
import Loading from "components/global/Loading";

import "assets/styles/pages/Batch.scss";
import BatchEvents from "components/batch/BatchEvents";
import BatchInfo from "components/batch/BatchInfo";
import BatchForm from "components/batch/BatchForm";
import { useModalService } from "services/ModalService";
import DeleteBatchModal from "components/modal/DeleteBatchModal";
import Wrapper from "components/global/Wrapper";

export default function Batch() {
  const [batch, setBatch] = useState(null);
  const [editing, setEditing] = useState(false);

  const { batchId } = useParams();
  const { getBatch, batches } = useBatchService();
  const { openModal } = useModalService();
  const [disabled, setDisabled] = useState(false);

  const notListableStatuses = ["discarded", "shared", "consumed"];

  const deleteBatchClicked = () => {
    openModal(
      <DeleteBatchModal
        batchId={batch.batchId}
        isListed={batch.isListed === 1}
      />
    );
  };

  const editBatchClicked = () => {
    setEditing(true);
  };

  useEffect(() => {
    fetchBatch(batchId);
  }, [batches]);

  useEffect(() => {
    if (batch) {
      const isDisabled =
        batch.isListed === 1 ||
        notListableStatuses.includes(
          batch.events[batch.events.length - 1].event
        );
      setDisabled(isDisabled);
    }
  }, [batch]);

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
        <h1>Batch #{batchId} Details</h1>
      </div>

      <div className="buttons">
        <Link to="/log" className="back button secondary-button-blue">
          <TiArrowBack />
          <span>Milk Log</span>
        </Link>
        <Link
          to={`/share/${batchId}`}
          className={`back button primary-button ${disabled && "disabled"}`}
        >
          <span>List This Batch</span>
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
          {editing && (
            <Wrapper header="Edit Batch">
              <BatchForm
                edit={true}
                batch={batch}
                cancel={() => setEditing(false)}
                fetch={fetchBatch}
              />
            </Wrapper>
          )}
          {!editing && (
            <BatchInfo
              batch={batch}
              status={
                batch.events.reduce((prev, curr) =>
                  new Date(curr.eventDate) > new Date(prev.eventDate)
                    ? curr
                    : prev
                ).event
              }
            />
          )}
          <BatchEvents
            events={batch.events}
            batch={batch}
            fetchBatch={fetchBatch}
          />
        </div>
      )}
    </div>
  );
}
