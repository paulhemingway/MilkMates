import React from "react";
import Accordion from "components/helpPage/Accordion";
import FAQ from "data/FAQ.json";
import "assets/styles/pages/FAQ.scss";
import PublicWrapper from "components/global/PublicWrapper";
import useDocumentTitle from "services/DocumentTitle";

export default function Help(props) {
  useDocumentTitle(props.title)
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
