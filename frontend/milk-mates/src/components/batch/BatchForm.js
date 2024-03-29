/* eslint-disable */
import React, { useState, useRef, useEffect } from "react";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import Select from "react-select";

import { useBatchService } from "services/BatchService";
import { useAuth } from "services/AuthService";
import { useModalService } from "services/ModalService";

import options from "data/options.js";
import SuccessModal from "../modal/SuccessModal";

export default function BatchForm({ collapsed, edit, cancel, batch, fetch }) {
  const { user } = useAuth();
  const { addBatch, editBatch } = useBatchService();
  const { openModal } = useModalService();

  const [selectedDate, setSelectedDate] = useState(dayjs(Date.now()));
  const [volume, setVolume] = useState("");
  const [conditions, setConditions] = useState([]);
  const [medications, setMedications] = useState([]);
  const [vaccines, setVaccines] = useState([]);
  const [diets, setDiets] = useState([]);
  const [caffeine, setCaffeine] = useState(false);

  const [errorCode, setErrorCode] = useState(-1);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    switch (errorCode) {
      case -1:
        setErrorMsg("");
        break;
      case 0:
        setErrorMsg("");
        break;
      case 7:
        setErrorMsg("Server timed out. Please try again.");
        break;
      default:
        setErrorMsg("Something went wrong on our end. Please try again.");
        break;
    }
  }, [errorCode]);

  useEffect(() => {
    if (batch === undefined) return;
    populateFields();
  }, [batch]);

  const populateFields = () => {
    const conditionsArr = batch.sickness.split(",").map((x) => {
      const index = options.conditions.findIndex((cond) => cond.value == x);
      return options.conditions[index];
    });
    setConditions(conditionsArr);

    const medicationsArr = batch.medications.split(",").map((x) => {
      const index = options.medications.findIndex((med) => med.value == x);
      return options.medications[index];
    });
    setMedications(medicationsArr);

    const vaccinesArr = batch.vaccines.split(",").map((x) => {
      const index = options.vaccines.findIndex((vax) => vax.value == x);
      return options.vaccines[index];
    });
    setVaccines(vaccinesArr);

    const dietsArr = batch.diet.split(",").map((x) => {
      const index = options.diets.findIndex((diet) => diet.value == x);
      return options.diets[index];
    });
    setDiets(dietsArr);

    setCaffeine(batch.caffeine === 1);
    setSelectedDate(dayjs(new Date(batch.productionDate)));
    setVolume(batch.volume);
  };

  const openSuccessModal = () => {
    openModal(
      <SuccessModal
        message={
          edit
            ? "Your batch was successfully updated."
            : "Your new batch was successfully logged!"
        }
      />
    );
  };

  //ERROR CODES:
  // 0 - success
  // 1 - SQL get userId query error
  // 2 - No user with that username
  // 3 - SQL add batch query error
  // 4 - SQL select batchid error
  // 5 - no batches returned
  // 6 - SQL add batchEvent query error

  const volumeType = (e) => {
    if (e.keyCode === 69) {
      e.preventDefault();
    }
  };

  const volumePaste = (e) => {
    e.preventDefault();
  };

  const expandClickRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Space") {
        event.preventDefault();
        toggleCollapse();
      }
    };

    const ref = expandClickRef.current;
    if (ref) {
      ref.addEventListener("keypress", handleKeyDown);
      return () => {
        ref.removeEventListener("keypress", handleKeyDown);
      };
    }
  }, [collapsed]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!valid()) return;
    const conditionsCSV = conditions.map((item) => item.value).join(",");
    const medicationsCSV = medications.map((item) => item.value).join(",");
    const vaccinesCSV = vaccines.map((item) => item.value).join(",");
    const dietsCSV = diets.map((item) => item.value).join(",");

    const caffeineVal = caffeine ? 1 : 0;
    let response;
    if (edit) {
      response = await editBatch(
        batch.batchId,
        user.username,
        selectedDate,
        volume,
        conditionsCSV,
        medicationsCSV,
        vaccinesCSV,
        dietsCSV,
        caffeineVal
      );
    } else {
      response = await addBatch(
        user.username,
        selectedDate,
        volume,
        conditionsCSV,
        medicationsCSV,
        vaccinesCSV,
        dietsCSV,
        caffeineVal
      );
    }

    setErrorCode(response);

    if (response === 0) {
      clearClicked();
      openSuccessModal();
      if(edit) {
        fetch(batch.batchId)
        cancel()
      }
    }
  };

  const valid = () => {
    if (volume === "") {
      setErrorMsg("Please provide a volume.");
      return false;
    }
    return true;
  };

  const dateChanged = (date) => {
    setSelectedDate(dayjs(date));
  };

  const volumeChanged = (e) => {
    setVolume(e.target.value);
  };

  const caffeineChanged = (e) => {
    setCaffeine(e.target.checked);
  };

  const clearClicked = () => {
    setSelectedDate(dayjs(Date.now()));
    setVolume("");
    setConditions([]);
    setMedications([]);
    setVaccines([]);
    setDiets([]);
    setCaffeine(false);
    setErrorMsg("");
    setErrorCode(-1);
  };

  const cancelClicked = () => {
    cancel();
  };

  return (
    <div className="add-form">
      <form onSubmit={handleSubmit}>
        <div className="two-col">
          <div className="input-cont">
            <label>
              Production Date*
              <DateTimePicker
                disabled={collapsed ? true : false}
                onChange={dateChanged}
                value={selectedDate}
                maxDate={dayjs(Date.now())}
              />
            </label>
          </div>
          <div className="input-cont">
            <label>
              Volume (ounces)*
              <input
                type="number"
                step="0.1"
                min="0.5"
                max="25"
                tabIndex={collapsed ? "-1" : "0"}
                placeholder="Volume"
                onChange={volumeChanged}
                value={volume}
                onKeyDown={volumeType}
                onPaste={volumePaste}
              />
            </label>
          </div>
        </div>

        <div className="input-cont">
          <label>
            Conditions
            <Select
              options={options.conditions}
              isMulti
              className="conditions-select select"
              id="conditions"
              placeholder="Conditions"
              isSearchable={true}
              theme={(theme) => ({
                ...theme,
                colors: {
                  ...theme.colors,
                  text: "orangered",
                  primary25: "var(--light-pink)",
                  primary: "var(--blue)",
                },
              })}
              value={conditions}
              onChange={setConditions}
            />
          </label>
        </div>
        <div className="input-cont">
          <label>
            Medications
            <Select
              options={options.medications}
              isMulti
              className="medications-select select"
              id="medications"
              placeholder="Medications"
              isSearchable={true}
              theme={(theme) => ({
                ...theme,
                colors: {
                  ...theme.colors,
                  text: "orangered",
                  primary25: "var(--light-pink)",
                  primary: "var(--blue)",
                },
              })}
              value={medications}
              onChange={setMedications}
            />
          </label>
        </div>
        <div className="input-cont">
          <label>
            Vaccines
            <Select
              options={options.vaccines}
              isMulti
              className="vaccines-select select"
              id="vaccines"
              placeholder="Vaccines"
              isSearchable={true}
              theme={(theme) => ({
                ...theme,
                colors: {
                  ...theme.colors,
                  text: "orangered",
                  primary25: "var(--light-pink)",
                  primary: "var(--blue)",
                },
              })}
              value={vaccines}
              onChange={setVaccines}
            />
          </label>
        </div>
        <div className="input-cont">
          <label>
            Diets
            <Select
              options={options.diets}
              isMulti
              className="diets-select select"
              id="diets"
              placeholder="Diets"
              isSearchable={true}
              theme={(theme) => ({
                ...theme,
                colors: {
                  ...theme.colors,
                  text: "orangered",
                  primary25: "var(--light-pink)",
                  primary: "var(--blue)",
                },
              })}
              value={diets}
              onChange={setDiets}
            />
          </label>
        </div>

        <div className="input-cont">
          <div className="caffeine">
            <label>
              <input
                type="checkbox"
                checked={caffeine}
                onChange={caffeineChanged}
              />
              Did you consume caffeine less than 8 hours before producing this
              batch?
            </label>
          </div>
        </div>
        <div className="error-msg">{errorMsg}</div>
        <div className="buttons">
          {edit && (
            <button
              type="button"
              className="button secondary-button-red"
              tabIndex={collapsed ? "-1" : "0"}
              onClick={cancelClicked}
            >
              Cancel
            </button>
          )}
          <input
            type="submit"
            value={`${edit ? "Save Changes" : "Add Batch"}`}
            className="button primary-button-blue"
            tabIndex={collapsed ? "-1" : "0"}
          />
        </div>
      </form>
    </div>
  );
}
