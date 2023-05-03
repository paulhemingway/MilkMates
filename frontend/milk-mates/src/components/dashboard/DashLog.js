import React from "react";
import LogTableRow from "components/logPage/LogTableRow";
import { useBatchService } from "services/BatchService";

export default function DashLog() {
  const { batches } = useBatchService();

  return (
    <div className="dash-log">
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>
                <span className="disappear">Batch</span>ID
              </th>
              <th>
                Date <span className="disappear">Produced</span>
              </th>
              <th>Volume</th>
              <th>Status</th>
              <th>Listed</th>
            </tr>
          </thead>
          <tbody>
            {/* render a row for each batch */}
            {batches.length > 0 &&
              [...batches]
                .reverse()
                .slice(0, 5)
                .map((batch) => (
                  <LogTableRow batch={batch} key={batch.batchId} tabIndex="0" />
                ))}
            {batches.length === 0 && (
              <tr className="empty-row">
                <td colSpan="5">There are no batches to display.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
