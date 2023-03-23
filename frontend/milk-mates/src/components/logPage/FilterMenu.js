import React, { useState } from "react";
import Select from "react-select";
import FocusTrap from "focus-trap-react";

export default function FilterMenu(props) {
  const startDateOptions = [
    {
      value: "today",
      label: (
        <div className="option">
          <span>Today</span>
        </div>
      ),
    },
    {
      value: "yesterday",
      label: (
        <div className="option">
          <span>Yesterday</span>
        </div>
      ),
    },
    {
      value: "7days",
      label: (
        <div className="option">
          <span>Last 7 days</span>
        </div>
      ),
    },
    {
      value: "30days",
      label: (
        <div className="option">
          <span>Last 30 days</span>
        </div>
      ),
    },
    {
      value: "3months",
      label: (
        <div className="option">
          <span>Last 3 months</span>
        </div>
      ),
    },
    {
      value: "12months",
      label: (
        <div className="option">
          <span>Last 12 months</span>
        </div>
      ),
    },
  ];

  const statusOptions = [
    "Refrigerated",
    "Frozen",
    "Thawed",
    "Consumed",
    "Shared",
    "Discarded",
  ];

  const cancel = () => {
    props.close();
  };

  const apply = () => {
    console.log("apply");
  };

  const onStatusChange = () => {};

  return (
    <FocusTrap>
      <div className="filter-menu">
        <h3>Add Filters</h3>
        <div className="filter-menu__option date">
          <label htmlFor="date-range">Date Range</label>
          <Select
            options={startDateOptions}
            className="date-range-select"
            id="date-range"
            components={{
              IndicatorSeparator: () => null,
            }}
            placeholder="Date Range"
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
          />
        </div>
        <div className="filter-menu__option status">
          <h4 className="status-header">Status</h4>
          <div className="checkboxes">
            <div className="col">
              {statusOptions.slice(0, 3).map((status, index) => {
                return (
                  <div className="status-option" key={index}>
                    <input
                      type="checkbox"
                      name="status"
                      id={status}
                      value={status}
                      onChange={onStatusChange}
                    />
                    <label htmlFor={status}>{status}</label>
                  </div>
                );
              })}
            </div>
            <div className="col">
              {statusOptions.slice(3, 6).map((status, index) => {
                return (
                  <div className="status-option" key={index}>
                    <input
                      type="checkbox"
                      name="status"
                      id={status}
                      value={status}
                      onChange={onStatusChange}
                    />
                    <label htmlFor={status}>{status}</label>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="filter-menu__buttons">
          <button onClick={cancel} className="button secondary-button">
            Cancel
          </button>
          <button onClick={apply} className="button primary-button">
            Apply
          </button>
        </div>
      </div>
    </FocusTrap>
  );
}
