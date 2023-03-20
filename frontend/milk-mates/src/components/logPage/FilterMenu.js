import React, { useState } from "react";
import Select from "react-select";

export default function FilterMenu() {
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

  const statusOptions = []

  const cancel = () => {
    console.log("cancel")
  }

  const apply = () => {
    console.log("apply")
  }

  return (
    <div className="filter-menu">
      <h3>Add Filters</h3>
      <div className="filter-menu__option">
        <label htmlFor="date-range">Date Range</label>
        <Select
          options={startDateOptions}
          className="start-date-select"
          id="date-range"
          components={{
            IndicatorSeparator: () => null,
          }}
          placeholder="Date"
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
      <div className="filter-menu__option">
        <label htmlFor="status-filter">Status</label>
        <Select
          options={startDateOptions}
          className="start-date-select"
          id="date-range"
          components={{
            IndicatorSeparator: () => null,
          }}
          placeholder="Status"
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
      <div className="filter-menu__buttons">
        <button onClick={cancel} className="button secondary-button">Cancel</button>
        <button onClick={apply} className="button primary-button">Apply</button>
      </div>
    </div>
  );
}
