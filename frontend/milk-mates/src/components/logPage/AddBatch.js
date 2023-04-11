import React, { useState, useRef, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Select from "react-select";

import options from "data/options.js";

export default function AddBatch() {
  const [collapsed, setCollapsed] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
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

  const handleChange = (date) => {
    console.log(date);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const conditionsChanged = () => {};
  const medicationsChanged = () => {};
  const vaccinesChanged = () => {};
  const dietsChanged = () => {};

  const clearClicked = () => {};
  const submitClicked = () => {};

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
            <div className="input-cont">
              <label>
                Batch Title
                <input
                  type="text"
                  maxLength="32"
                  tabIndex={collapsed ? "-1" : "0"}
                  placeholder="Batch Title"
                />
              </label>
            </div>
            <div className="two-col">
              <div className="input-cont">
                <label>
                  Production Date
                  <DateTimePicker disabled={collapsed ? true : false} />
                </label>
              </div>
              <div className="input-cont">
                <label>
                  Volume
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="12"
                    tabIndex={collapsed ? "-1" : "0"}
                    placeholder="Volume"
                  />
                </label>
              </div>
            </div>
            <div className="two-col">
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
                    onChange={conditionsChanged}
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
                    onChange={medicationsChanged}
                  />
                </label>
              </div>
            </div>
            <div className="two-col">
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
                    onChange={vaccinesChanged}
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
                    onChange={dietsChanged}
                  />
                </label>
              </div>
            </div>
            <div className="buttons">
              <button
                value="Clear"
                className="button secondary-button"
                tabIndex={collapsed ? "-1" : "0"}
                onClick={clearClicked}
              >
                Clear
              </button>
              <button
                value="Clear"
                className="button primary-button"
                tabIndex={collapsed ? "-1" : "0"}
                onClick={submitClicked}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
