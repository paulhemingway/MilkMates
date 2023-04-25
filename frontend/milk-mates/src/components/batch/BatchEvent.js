import React from "react";
import moment from "moment";
import { HiOutlineTrash } from "react-icons/hi";
import { useBatchService } from "services/BatchService";
import { useModalService } from "services/ModalService";
import DeleteBatchEventModal from "../modal/DeleteBatchEventModal";

export default function BatchEvent({ event, deletable, batch }) {
  const { deleteBatchEvent } = useBatchService();
  const { openModal } = useModalService();

  const deleteConfirmed = () => {
    deleteBatchEvent(event.batchEventId)
  }

  const deleteEvent = () => {
    openModal(<DeleteBatchEventModal confirmed={deleteConfirmed} event={event} batchId={batch.batchId} />);
  };
  const trashKeyDown = (e) => {
    if (e.key === " " || e.key === "Enter") {
      deleteEvent();
    }
  };
  return (
    <div className={`event shadow ${event.event}`}>
      <p className="event-title">{event.event}</p>
      <div className="event-info">
        <div className="date">
          <p>
            <strong>Event Date</strong>
          </p>
          <p>{moment(event.eventDate).format("MMMM D, YYYY")}</p>
          <p>{moment(event.eventDate).format("h:mm A")}</p>
        </div>
        <div className="notes">
          <p>
            <strong>Event Notes</strong>
          </p>
          <p>{event.notes}</p>
        </div>
        <div className="trash">
          {deletable && (
            <HiOutlineTrash
              tabIndex="0"
              onClick={deleteEvent}
              onKeyDown={trashKeyDown}
            />
          )}
        </div>
      </div>
    </div>
  );
}
