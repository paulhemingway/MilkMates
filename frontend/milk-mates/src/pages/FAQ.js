import React from "react";
import Accordion from "components/helpPage/Accordion";
import FAQ from "data/FAQ.json";
import "assets/styles/FAQ.scss";
import PublicWrapper from "components/global/PublicWrapper";

export default function Help() {
  return (
    <PublicWrapper header="Frequently Asked Questions">
      <div className="faq">
        <div className="accordions">
          {FAQ.map((q, index) => (
            <Accordion question={q} key={index} />
          ))}
        </div>
      </div>
    </PublicWrapper>
  );
}
