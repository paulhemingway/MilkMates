import React from "react";
import Accordion from "components/helpPage/Accordion";
import Header from "components/global/Header";

import FAQ from "data/FAQ.json";
import "assets/styles/FAQ.scss";

export default function Help() {
  return (
    <div className="faq">
      <Header showMenu={false} />
      <main>
        <div className="accordions">
          {FAQ.map((q, index) => (
            <Accordion question={q} key={index} />
          ))}
        </div>
      </main>
    </div>
  );
}
