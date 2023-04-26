import React from "react";
import Wrapper from "components/global/Wrapper";
import BatchEvent from "./BatchEvent";
import { HiPlus } from "react-icons/hi";
import { useModalService } from "services/ModalService";
import AddBatchEventModal from "../modal/AddBatchEventModal";

export default function BatchEvents({ events, batch, fetchBatch }) {
  const finishedEvents = ["discarded", "consumed", "shared"];
  const disabled = events.some((item) => finishedEvents.includes(item.event));
  const { openModal } = useModalService();

  const addBatchClicked = () => {
    openModal(<AddBatchEventModal events={events} batchId={batch.batchId} isListed={batch.isListed === 1} fetchBatch={fetchBatch} />);
  };

  return (
    <Wrapper header="Batch Events">
      <div className="events">
        <div className="horizontal-scroll shadow">
          {events.map((item, index) => {
            return (
              <BatchEvent
                event={item}
                key={index}
                deletable={index === 0 && item.event !== "logged"}
                batch={batch}
                index={events.length - index}
              />
            );
          })}
        </div>
        <button
          disabled={disabled}
          className="add-btn button primary-button-blue"
          onClick={addBatchClicked}
        >
          <HiPlus />
          Add Event
        </button>
        {disabled && (
          <p className="note">
            Please note that events cannot be added to batches that have already
            been shared, consumed, or discarded.
          </p>
        )}
      </div>
    </Wrapper>
  );
}
