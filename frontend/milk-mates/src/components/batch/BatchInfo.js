import React from "react";
import Wrapper from "components/global/Wrapper";
import moment from "moment";

export default function BatchInfo({ batch }) {
  const status = batch.events[0].event;
  

  return (
    <Wrapper header="Batch Info">
      <div className="info">
        <table className="info-table">
          <tbody>
          <tr>
              <th>Batch ID</th>
              <td>
                {batch.batchId}
              </td>
            </tr>
            <tr>
              <th>Production Date</th>
              <td>
                {moment(batch.productionDate).format("MMMM D, YYYY h:mm A")}
              </td>
            </tr>
            <tr>
              <th>Volume</th>
              <td>{batch.volume.toFixed(2)} oz</td>
            </tr>
            <tr>
              <th>Status</th>
              <td className="status">{status}</td>
            </tr>
            <tr>
              <th>Caffeine</th>
              <td>{batch.caffeine === 1 ? "Yes" : "No"}</td>
            </tr>
            <tr>
              <th>Conditions</th>
              <td>
                {batch.sicness !== "undefined" &&
                  batch.sickness.replace(",", ", ")}
              </td>
            </tr>
            <tr>
              <th>Medications</th>
              <td>
                {batch.medications !== "undefined" &&
                  batch.medications.replace(",", ", ")}
              </td>
            </tr>
            <tr>
              <th>Vaccines</th>
              <td>
                {batch.vaccines !== "undefined" &&
                  batch.vaccines.replace(",", ", ")}
              </td>
            </tr>
            <tr>
              <th>Diets</th>
              <td>
                {batch.diet !== "undefined" && batch.diet.replace(",", ", ")}
              </td>
            </tr>
          </tbody>
        </table>
        
      </div>
    </Wrapper>
  );
}
