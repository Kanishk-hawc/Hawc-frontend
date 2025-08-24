import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AppFront from "./app/appfront";
import "./index.css";
import { I18nProvider } from "./app/view/i18n"; // adjust path if needed

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <I18nProvider>
        <AppFront />
      </I18nProvider>
    </BrowserRouter>
  </React.StrictMode>
);
