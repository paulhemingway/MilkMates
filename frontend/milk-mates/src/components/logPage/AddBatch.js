import React, { useState, useRef, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Select from "react-select";
import dayjs from "dayjs";

import { batchService } from "services/BatchService";
import { useAuth } from "services/AuthService";

import options from "data/options.js";

export default function AddBatch() {
  const [collapsed, setCollapsed] = useState(true);
  const { user } = useAuth();
  const { addBatch } = batchService();

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
        //modal?
        break;
      case 7:
        setErrorMsg("Server timed out. Please try again.");
        break;
      default:
        setErrorMsg("Something went wrong on our end. Please try again.");
        break;
    }
  }, [errorCode]);

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

    const response = await addBatch(
      user.username,
      selectedDate,
      volume,
      conditionsCSV,
      medicationsCSV,
      vaccinesCSV,
      dietsCSV,
      caffeine
    );

    setErrorCode(response);

    if (response === 0) {
      clearClicked();
    }
  };

  const valid = () => {
    return true;
  };

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
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

  return (
    <div className={collapsed ? "add-batch" : "expanded add-batch"}>
      <div
        className={collapsed ? "expand-click" : "expand-click expanded"}
        onClick={toggleCollapse}
        tabIndex="0"
        ref={expandClickRef}
      >
        <h2>Add Milk Batch</h2>
        <FiChevronDown className={collapsed ? "" : "flipped"} />
      </div>
      {!collapsed && (
        <div className="add-form">
          <form onSubmit={handleSubmit}>
            <div className="two-col">
              <div className="input-cont">
                <label>
                  Production Date
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
                  Volume (ounces)
                  <input
                    type="number"
                    step="0.1"
                    min="0.5"
                    max="12"
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
            </div>
            <div className="input-cont">
              <div className="caffeine">
                <label>
                  <input
                    type="checkbox"
                    checked={caffeine}
                    onChange={caffeineChanged}
                  />
                  Did you consume caffeine less than 8 hours before producing this batch?
                </label>
              </div>
            </div>
            <div className="error-msg">{errorMsg}</div>
            <div className="buttons">
              <button
                type="button"
                className="button secondary-button"
                tabIndex={collapsed ? "-1" : "0"}
                onClick={clearClicked}
              >
                Clear
              </button>
              <input
                type="submit"
                value="Add Batch"
                className="button primary-button"
                tabIndex={collapsed ? "-1" : "0"}
              />
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
