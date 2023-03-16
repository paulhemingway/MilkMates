import React from "react";
import moment from "moment";

export default function LogTableRow(props) {
  const date = new Date(props.batch.productionDate)
  const formattedDate = moment(date).format('MMMM D, YYYY')
  const formattedTime = moment(date).format('h:mm A')

  return (
    <tr>
      <td>{formattedDate}</td>
      <td>{formattedTime}</td>
      <td>{props.batch.volume} oz</td>
      <td>{props.batch.events[props.batch.events.length - 1].event}</td>
    </tr>
  );
}
