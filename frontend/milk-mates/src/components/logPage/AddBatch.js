import React, { useState, useRef, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";

export default function AddBatch() {
  const [collapsed, setCollapsed] = useState(true);
  const expandClickRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Space") {
        event.preventDefault();
        toggleCollapse();
      }
    };

    expandClickRef.current.addEventListener("keypress", handleKeyDown);

    return () => {
      expandClickRef.current.removeEventListener("keypress", handleKeyDown);
    };
  }, [collapsed]);

  const handleSubmit = () => {};

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
        <form>
          <input type="submit" tabIndex={collapsed ? "-1" : "0"} />
        </form>
      </div>
    </div>
  );
}
