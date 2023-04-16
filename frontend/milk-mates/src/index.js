import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { AuthProvider } from "services/AuthService";
import { BatchProvider } from "services/BatchService";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BatchProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BatchProvider>
  </React.StrictMode>
);
