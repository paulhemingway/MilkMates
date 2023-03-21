import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function Accordion(props) {

  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen(!open);
  };
  return (
    <div className={open ? "accordion open" : "accordion"} onClick={toggleOpen}>
      <div className="question">
        <h3>{props.question.question}</h3>
        <FiChevronDown />
      </div>
      <div className="answer">
        <p>{props.question.answer}</p>
        <div className="answer-links">
        {props.question.links.map((link) => {
          return <div className="answer-link">
            <Link to={link.url} target="_blank" className="button primary-button">{link.title}</Link>
          </div>
        })}
        </div>
      </div>
    </div>
  );
}
