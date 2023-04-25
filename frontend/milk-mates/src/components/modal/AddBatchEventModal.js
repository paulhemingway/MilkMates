import React from "react";
import { useState, useEffect } from "react";
import { useModalService } from "services/ModalService";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import options from "data/options";
import Select from "react-select";
import Loading from "components/global/Loading";
import SuccessModal from "./SuccessModal";
import { useBatchService } from "services/BatchService";
import { useAuth } from "services/AuthService";
import { useListingService } from "services/ListingService";

export default function AddBatchEventModal({
  events,
  batchId,
  isListed,
  fetchBatch,
}) {
  const { closeModal, openModal } = useModalService();
  const [selectedDate, setSelectedDate] = useState(dayjs(Date.now()));
  const [eventType, setEventType] = useState("");
  const [eventOptions, setEventOptions] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState("");

  const { addBatchEvent } = useBatchService();
  const { user } = useAuth();
  const { userListings, deleteListing } = useListingService();

  const deleteListedTypes = ["consumed", "shared", "discarded"];

  useEffect(() => {
    const alreadyUsed = events.map((event) => event.event);
    const newOptions = options.statusSelect.filter((option) => {
      return !alreadyUsed.includes(option.value);
    });
    setEventOptions(newOptions);
  }, []);

  const addClicked = async () => {
    try {
      setLoading(true);
      setErrorMsg("");
      const added = await addBatchEvent(
        batchId,
        eventType,
        selectedDate,
        notes
      );
      if (!added) {
        throw new Error("Something went wrong on our end. Please try again.");
      }
      const deleteListing =
        isListed && eventType && deleteListedTypes.includes(eventType);
      if (deleteListing) {
        const listing = userListings.find(
          (listing) => batchId === listing.batchId
        );
        const deletedListing = await deleteListing(
          listing.listingId,
          false,
          user.username,
          batchId
        );
        if (!deletedListing) {
          throw new Error("Something went wrong on our end. Please try again.");
        }
        fetchBatch(batchId);
        successModal(deleteListing);
      }
    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  const successModal = (deleteListing) => {
    openModal(
      <SuccessModal
        message={`Batch event has been added ${
          deleteListing ? "and the listing for this batch has been removed" : ""
        } successfully.`}
      />
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const dateChanged = (date) => {
    setSelectedDate(dayjs(date));
  };

  const eventTypeChanged = (selected) => {
    setEventType(selected.value);
    console.log(selected.value);
  };

  const notesChanged = (e) => {
    setNotes(e.target.value);
  };

  return (
    <div className="add-batch-event">
      <h2>Add A Batch Event</h2>
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <div className="input-cont">
            <label>
              Event Date*
              <DateTimePicker
                onChange={dateChanged}
                value={selectedDate}
                maxDate={dayjs(Date.now())}
                minDate={dayjs(events[0].eventDate)}
              />
            </label>
          </div>
          <div className="input-cont">
            <label>
              Event Type*
              <Select
                options={eventOptions}
                defaultValue={eventOptions[0]}
                className="select"
                id="status-select"
                components={{
                  IndicatorSeparator: () => null,
                }}
                isSearchable={false}
                theme={(theme) => ({
                  ...theme,
                  colors: {
                    ...theme.colors,
                    text: "orangered",
                    primary25: "var(--light-pink)",
                    primary: "var(--blue)",
                  },
                })}
                onChange={eventTypeChanged}
              />
            </label>
          </div>
          <div className="input-cont">
            <label>
              Notes
              <textarea
                type="text"
                className="notes"
                placeholder="Notes"
                maxLength="64"
                onChange={notesChanged}
              />
            </label>
          </div>
        </form>
      </div>

      <div className="modal-error-loading">
        {loading && <Loading />}

        {isListed && eventType && deleteListedTypes.includes(eventType) && (
          <p>
            WARNING: This batch is currently listed. Marking it as{" "}
            <i>{eventType}</i> will remove the listing.
          </p>
        )}

        {errorMsg && <p>{errorMsg}</p>}
      </div>
      <div className="buttons">
        <button className="button secondary-button-blue" onClick={closeModal}>
          Cancel
        </button>
        <button className="button primary-button" onClick={addClicked}>
          Add Batch
        </button>
      </div>
    </div>
  );
}
