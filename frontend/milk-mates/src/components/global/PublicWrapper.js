import React from "react";
import Header from "./Header";
import "assets/styles/PublicWrapper.scss";

export default function PublicWrapper(props) {
  return (
    <div className="public-wrapper">
      <Header showMenu={false} />
      <main>
        <h1>{props.header}</h1>
        {props.children}
      </main>
    </div>
  );
}
