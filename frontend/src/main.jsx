import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import App from "./App";

try {
  const pid = import.meta.env.VITE_APPWRITE_PROJECT_ID;
  const pname = import.meta.env.VITE_APPWRITE_PROJECT_NAME;
  const endpoint = import.meta.env.VITE_APPWRITE_ENDPOINT;
  // eslint-disable-next-line no-console
  console.log("Appwrite env", { VITE_APPWRITE_PROJECT_ID: pid, VITE_APPWRITE_PROJECT_NAME: pname, VITE_APPWRITE_ENDPOINT: endpoint });
} catch { /* noop */ }

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
