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

export default function AddBatchEventModal({ events, batchId }) {
  const { closeModal, openModal } = useModalService();
  const [selectedDate, setSelectedDate] = useState(dayjs(Date.now()));
  const [eventType, setEventType] = useState("");
  const [eventOptions, setEventOptions] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState("");

  const {addBatchEvent} = useBatchService();

  useEffect(() => {
    const alreadyUsed = events.map((event) => event.event);
    const newOptions = options.statusSelect.filter((option) => {
      return !alreadyUsed.includes(option.value);
    });
    setEventOptions(newOptions);
  }, []);

  const addClicked = async () => {
    await setLoading(true);
    await setErrorMsg("");
    // call delete batch function
    if (!(await addBatchEvent(batchId, eventType, selectedDate, notes))) {
      setErrorMsg("Something went wrong on our end. Please try again.");
    } else {
      openModal(
        <SuccessModal
          message={`Batch event has been added successfully.`}
        />
      );
    }
    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const dateChanged = (date) => {
    setSelectedDate(dayjs(date));
  };

  const eventTypeChanged = (selected) => {
    setEventType(selected.value);
  };

  const notesChanged = (e) => {
    setNotes(e.target.value)
  }

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
      <p className="modal-error-loading">
        {loading && <Loading />}
        {errorMsg}
      </p>
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
