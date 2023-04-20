import React from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";

import { TbTrash } from "react-icons/tb";
import { CgSmartHomeRefrigerator } from "react-icons/cg";
import { FaRegSnowflake } from "react-icons/fa";
import {
  TbDroplet,
  TbBottle,
  TbCircleCheck,
  TbClipboardCheck,
} from "react-icons/tb";
import { HiOutlineCheckCircle, HiOutlineXCircle } from "react-icons/hi";

export default function LogTableRow(props) {
  const navigate = useNavigate();
  const date = new Date(props.batch.productionDate);
  const formattedDate = moment(date).format("MMM D");
  const formattedYear = moment(date).format(", YYYY");
  const formattedTime = moment(date).format("h:mm A");

  const status = props.batch.events[props.batch.events.length - 1].event;

  function StatusIcon() {
    switch (status.toLowerCase()) {
      case "logged":
        return <TbClipboardCheck />;
      case "refrigerated":
        return <CgSmartHomeRefrigerator />;
      case "frozen":
        return <FaRegSnowflake />;
      case "thawed":
        return <TbDroplet />;
      case "discarded":
        return <TbTrash />;
      case "consumed":
        return <TbBottle />;
      case "shared":
        return <TbCircleCheck />;
      default:
        return;
    }
  }

  const goToBatch = () => {
    navigate(`/log/batch/${props.batch.batchId}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === " " || e.key === "Enter") {
      goToBatch();
    }
  };

  return (
    <tr
      onClick={goToBatch}
      tabIndex="0"
      aria-label={`View batch ${props.batch.batchId} details`}
      className="log-table-row"
      onKeyDown={handleKeyDown}
    >
      <td>{props.batch.batchId}</td>
      <td className="date-cell">
        <span>
          {formattedDate}
          <span className="disappear">{formattedYear}</span>
        </span>

        <span className="time">&nbsp;{formattedTime}</span>
      </td>
      <td>{props.batch.volume} oz</td>
      <td className="status-cell">
        <span className="tooltip">
          <span className="tooltip-text">{status}</span>
          <span>
            <StatusIcon />
          </span>
        </span>
      </td>
      <td
        className="listed-cell"
        aria-label={props.batch.isListed ? "Listed" : "Not Listed"}
      >
        <span className="tooltip">
          <span className="tooltip-text">
            {props.batch.isListed ? "Listed" : "Not Listed"}
          </span>
          {props.batch.isListed ? (
            <HiOutlineCheckCircle />
          ) : (
            <HiOutlineXCircle />
          )}
        </span>
      </td>
    </tr>
  );
}
