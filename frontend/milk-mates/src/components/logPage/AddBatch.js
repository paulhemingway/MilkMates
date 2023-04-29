/* eslint-disable */
import React, { useState, useRef, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";
import BatchForm from "components/batch/BatchForm";

export default function AddBatch({edit}) {
  const [collapsed, setCollapsed] = useState(true);
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
      {!collapsed && (
        <BatchForm collapsed={collapsed} />
      )}
    </div>
  );
}
