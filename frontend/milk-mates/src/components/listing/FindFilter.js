import React, { useState, useEffect } from "react";
import { BiChevronUp, BiChevronDown } from "react-icons/bi";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { InputMask } from "primereact/inputmask";
import options from "data/options";

export default function FindFilter({ setFilters }) {
  const [expanded, setExpanded] = useState(false);
  const [earliest, setEarliest] = useState(null);
  const [volume, setVolume] = useState(0);
  const [freeOnly, setFreeOnly] = useState(false);
  const [zipCode, setZipCode] = useState("");

  const [conditions, setConditions] = useState([]);
  const [meds, setMeds] = useState([]);
  const [vaccs, setVaccs] = useState([]);
  const [diets, setDiets] = useState([]);
  const [noCaffeine, setNoCaffeine] = useState(false);

  const advancedChecked = (e, type) => {
    let newArray = [];
    switch (type) {
      case "condition":
        newArray = [...conditions];
        newArray = modifyArray(e.target.checked, e.target.value, newArray);
        setConditions(newArray);
        break;
      case "medication":
        newArray = [...meds];
        newArray = modifyArray(e.target.checked, e.target.value, newArray);
        setMeds(newArray);
        break;
      case "vaccine":
        newArray = [...vaccs];
        newArray = modifyArray(e.target.checked, e.target.value, newArray);
        setVaccs(newArray);
        break;
      case "diet":
        newArray = [...diets];
        newArray = modifyArray(e.target.checked, e.target.value, newArray);
        setDiets(newArray);
        break;
      default:
        return;
    }
  };

  const modifyArray = (checked, value, newArray) => {
    if (checked) {
      newArray.push(value);
    } else {
      newArray = newArray.filter((x) => x != value);
    }
    return newArray;
  };

  const allChecked = (e, className) => {
    let newArray = [];
    const checkboxes = document.querySelectorAll(
      `.${className} input[type='checkbox']`
    );
    checkboxes.forEach((box) => {
      box.checked = e.target.checked;
    });

    switch (className) {
      case "condition":
        if (e.target.checked) {
          newArray = options.conditions.map((x) => x.value);
        }
        setConditions(newArray);
        break;
      case "medication":
        if (e.target.checked) {
          newArray = options.medications.map((x) => x.value);
        }
        setMeds(newArray);
        break;
      case "vaccine":
        if (e.target.checked) {
          newArray = options.vaccines.map((x) => x.value);
        }
        setVaccs(newArray);
        break;
      case "diet":
        if (e.target.checked) {
          newArray = options.diets.map((x) => x.value);
        }
        setDiets(newArray);
        break;
      default:
        return;
    }
  };

  const handleZipChange = (e) => {
    setZipCode(e.value);
  };

  const handleDateChange = (date) => {
    setEarliest(new Date(date));
  };

  const clearClicked = () => {
    setEarliest(null);
    setVolume(0);
    setFreeOnly(false);
    setZipCode("");
    setConditions([]);
    setMeds([]);
    setVaccs([]);
    setDiets([]);
    setNoCaffeine(false);

    setFilters({
      earliest: null,
      freeOnly: false,
      noCaffeine: false,
      volume: 0,
      zipCode: "",
      sickness: [],
      medications: [],
      vaccines: [],
      diets: [],
    })
  };

  const applyClicked = () => {
    const newFilters = {
      earliest: earliest,
      freeOnly: freeOnly,
      noCaffeine: noCaffeine,
      volume: volume,
      zipCode: zipCode,
      sickness: conditions,
      medications: meds,
      vaccines: vaccs,
      diets: diets
    }
    setFilters(newFilters)
  };

  return (
    <div className="find-filter">
      <h2>Filters</h2>
      <div className="filter-content">
        <div className="basic-filters">
          <div className="filter-cont earliest">
            <p className="filter-label">Earliest Posted</p>
            <DatePicker
              maxDate={dayjs(Date.now())}
              value={dayjs(earliest)}
              onChange={handleDateChange}
            />
          </div>
          <div className="filter-cont batch-info">
            <p className="filter-label">Batch Info</p>
            <div>
              <label>
                <input
                  type="checkbox"
                  onChange={(e) => allChecked(e, "condition")}
                  checked={conditions.length === options.conditions.length}
                />
                No conditions
              </label>

              <label>
                <input
                  type="checkbox"
                  onChange={(e) => allChecked(e, "diet")}
                  checked={diets.length === options.diets.length}
                />
                No diets
              </label>

              <label>
                <input
                  type="checkbox"
                  onChange={(e) => allChecked(e, "vaccine")}
                  checked={vaccs.length === options.vaccines.length}
                />
                No vaccines
              </label>
              <label>
                <input
                  type="checkbox"
                  onChange={(e) => allChecked(e, "medication")}
                  checked={meds.length === options.medications.length}
                />
                No medications
              </label>

              <label>
                <input
                  type="checkbox"
                  value={noCaffeine}
                  checked={noCaffeine}
                  onChange={(e) => setNoCaffeine(e.target.checked)}
                />
                No caffeine
              </label>
            </div>
          </div>
          

          <div className="filter-cont zip">
            <p className="filter-label">Zip Code</p>
            <InputMask
              className="zip-input"
              placeholder="Zip Code"
              mask="99999"
              onChange={handleZipChange}
              value={zipCode}
            />
          </div>
          <div className="filter-cont">
            <p className="filter-label">Price</p>
            <label>
              <input
                type="checkbox"
                value={freeOnly}
                onChange={(e) => setFreeOnly(e.target.checked)}
              />
              Free only
            </label>
          </div>
          <div className="filter-cont volume">
            <p className="filter-label">Min. Volume (oz)</p>
            <input
              type="number"
              min="0"
              step="0.1"
              value={volume}
              onChange={(e) => setVolume(e.target.value)}
            />
          </div>
          
        </div>
        <div className="show-more">
          <button onClick={() => setExpanded(!expanded)}>
            {expanded ? "Hide" : ""} Advanced Filters
          </button>
          {expanded ? <BiChevronUp /> : <BiChevronDown />}
        </div>
        {expanded && (
          <div className="advanced flex-column">
            <p className="note">
              <i>
                NOTE: Select which values to <strong>exclude</strong> from your
                results.
              </i>
            </p>
            <div className="two-col">
              <div className="filter-cont checkboxes condition">
                <p className="filter-label">Conditions</p>
                {options.conditions.map((x, index) => {
                  return (
                    <label key={index}>
                      <input
                        type="checkbox"
                        value={x.value}
                        onChange={(e) => {
                          advancedChecked(e, "condition");
                        }}
                        checked={conditions.includes(x.value)}
                      />
                      {x.value}
                    </label>
                  );
                })}
              </div>
              <div className="filter-cont checkboxes diet">
                <p className="filter-label">Diets</p>
                {options.diets.map((x, index) => {
                  return (
                    <label key={index}>
                      <input
                        type="checkbox"
                        value={x.value}
                        onChange={(e) => advancedChecked(e, "diet")}
                        checked={diets.includes(x.value)}
                      />
                      {x.value}
                    </label>
                  );
                })}
              </div>
            </div>
            <div className="two-col">
              <div className="filter-cont checkboxes vaccine">
                <p className="filter-label">Vaccines</p>
                {options.vaccines.map((x, index) => {
                  return (
                    <label key={index}>
                      <input
                        type="checkbox"
                        value={x.value}
                        onChange={(e) => advancedChecked(e, "vaccine")}
                        checked={vaccs.includes(x.value)}
                      />
                      {x.value}
                    </label>
                  );
                })}
              </div>
              <div className="filter-cont checkboxes medication">
                <p className="filter-label">Medications</p>
                {options.medications.map((x, index) => {
                  return (
                    <label key={index}>
                      <input
                        type="checkbox"
                        value={x.value}
                        onChange={(e) => advancedChecked(e, "medication")}
                        checked={meds.includes(x.value)}
                      />
                      {x.value}
                    </label>
                  );
                })}
              </div>
            </div>
          </div>
        )}
        <div className="bottom">
          <div className="buttons">
            <button
              className="button secondary-button-blue"
              onClick={clearClicked}
            >
              Clear
            </button>
            <button className="button primary-button" onClick={applyClicked}>
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
