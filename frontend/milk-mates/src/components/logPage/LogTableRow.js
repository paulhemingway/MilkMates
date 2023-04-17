import React from "react";
import moment from "moment";

import { BiChevronRightCircle } from "react-icons/bi";
import { TbTrash } from "react-icons/tb";
import { CgSmartHomeRefrigerator } from "react-icons/cg";
import { FaRegSnowflake } from "react-icons/fa";
import { TbDroplet, TbBottle, TbCircleCheck, TbClipboardCheck } from "react-icons/tb";
import { HiOutlineCheckCircle, HiOutlineXCircle } from "react-icons/hi";

import { Link } from "react-router-dom";

export default function LogTableRow(props) {
  const date = new Date(props.batch.productionDate);
  const formattedDate = moment(date).format("MMM D, YYYY");
  const formattedTime = moment(date).format("h:mm A");

  const status = props.batch.events[props.batch.events.length - 1].event;

  function StatusIcon() {
    switch (status.toLowerCase()) {
      case "logged":
        return <TbClipboardCheck />
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

  return (
    <tr>
      <td>
        {formattedDate} <span className="time">{formattedTime}</span>
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
          <span className="tooltip-text">{props.batch.isListed ? "Listed" : "Not Listed"}</span>
        {props.batch.isListed ? <HiOutlineCheckCircle /> : <HiOutlineXCircle/>}
        </span>
        
      </td>
      <td className="link-cell">
        <Link
          to={`/log/batch/${props.batch.batchId}`}
          alt={`Go to batch ${props.batch.batchId}`}
        >
          <BiChevronRightCircle />
        </Link>
      </td>
    </tr>
  );
}
