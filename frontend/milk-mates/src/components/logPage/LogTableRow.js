import React from "react";
import moment from "moment";

import { BiChevronRightCircle } from "react-icons/bi";
import { Link } from "react-router-dom";

export default function LogTableRow(props) {
  const date = new Date(props.batch.productionDate);
  const formattedDate = moment(date).format("MMMM D, YYYY");
  const formattedTime = moment(date).format("h:mm A");

  return (
    <tr>
      <td>{formattedDate}</td>
      <td>{formattedTime}</td>
      <td>{props.batch.volume} oz</td>
      <td className="status-cell">
        {props.batch.events[props.batch.events.length - 1].event}
      </td>
      <td className="link-cell">
        <Link to={`/batch/${props.batch.batchId}`}><BiChevronRightCircle /></Link>
      </td>
    </tr>
  );
}
