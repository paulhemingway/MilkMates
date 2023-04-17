import React from "react";
import Wrapper from "components/global/Wrapper";
import BatchEvent from "./BatchEvent";
import { HiPlus } from "react-icons/hi";

export default function BatchEvents({ events }) {
  const finishedEvents = ["discarded", "consumed", "shared"];
  const disabled = events.some((item) => finishedEvents.includes(item.event));
  return (
    <Wrapper header="Batch Events">
      <div className="events">
        <button
          disabled={disabled}
          className="add-btn button primary-button-blue"
        >
          <HiPlus />
          Add Event
        </button>

        <div className="horizontal-scroll shadow">
          {events.map((item, index) => {
            return <BatchEvent event={item} key={index} deletable={index === 0 && item.event !== 'logged'} />;
          })}
        </div>
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
