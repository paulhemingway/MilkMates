import React, { useState, useRef, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

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
      <div className="add-form">
        <form onSubmit={handleSubmit}>
        <DateTimePicker label="Basic date time picker" />
          <input type="submit" tabIndex={collapsed ? "-1" : "0"} />
        </form>
      </div>
    </div>
  );
}
