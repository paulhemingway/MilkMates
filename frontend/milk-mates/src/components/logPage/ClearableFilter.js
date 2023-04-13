import React from "react";
import { IoMdClose } from "react-icons/io";

export default function ClearableFilter({ type, value, clear }) {
  const handleClick = () => {
    clear(type, value)
  }
  return (
    <span className="clear-filter unselectable">
      <button onClick={handleClick}>
        <IoMdClose />
      </button>
      {type}: {value}
    </span>
  );
}
