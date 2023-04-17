import React from "react";
import Wrapper from "components/global/Wrapper";
import moment from "moment";

import { TbTrash } from "react-icons/tb";
import { CgSmartHomeRefrigerator } from "react-icons/cg";
import { FaRegSnowflake } from "react-icons/fa";
import {
  TbDroplet,
  TbBottle,
  TbCircleCheck,
  TbClipboardCheck,
} from "react-icons/tb";

export default function BatchInfo({ batch }) {
  const status = batch.events[0].event;

  function StatusIcon({}) {
    switch (status) {
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

  return (
    <Wrapper header="Batch Info">
      <div className="info">
        <div className="three-col">
          <div className="batch-prop">
            <p className="prop-title">Production Date</p>
            <div className="prop-value">
              <p>{moment(batch.productionDate).format("MMMM D, YYYY")}</p>
              <p>{moment(batch.productionDate).format("h:mm A")}</p>
            </div>
          </div>
          <div className="batch-prop">
            <p className="prop-title">Volume</p>
            <div className="prop-value">{batch.volume.toFixed(2)} oz</div>
          </div>
          <div className="batch-prop">
            <p className="prop-title">Status</p>
            <div className="prop-value status">
              {status} <StatusIcon style={{ color: `var(--${status})` }} />
            </div>
          </div>
        </div>
        <div className="two-col">
          <div className="batch-prop">
            <p className="prop-title">Conditions</p>
            <div className="prop-value">
              <ul>
                {batch.sickness && batch.sickness.split(",").map(sickness => {
                  return <li key={sickness}>{sickness}</li>
                })}
              </ul>
            </div>
          </div>
          <div className="batch-prop">
            <p className="prop-title">Diets</p>
            <div className="prop-value">
              <ul>
                {batch.diet && batch.diet.split(",").map(diet => {
                  return <li key={diet}>{diet}</li>
                })}
              </ul>
            </div>
          </div>
        </div>
        <div className="two-col">
          <div className="batch-prop">
            <p className="prop-title">Medications</p>
            <div className="prop-value">
              <ul>
                {batch.medications && batch.medications.split(",").map(med => {
                  return <li key={med}>{med}</li>
                })}
              </ul>
            </div>
          </div>
          <div className="batch-prop">
            <p className="prop-title">Vacciness</p>
            <div className="prop-value">
              <ul>
                {batch.vaccines && batch.vaccines.split(",").map(vax => {
                  return <li key={vax}>{vax}</li>
                })}
              </ul>
            </div>
          </div>
        </div>
        <div className="batch-prop">
          <p className="prop-title">Caffeine</p>
          <div className="prop-value">
            <p>{batch.caffeine === 1 ? 'Yes' : 'No'}</p>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
