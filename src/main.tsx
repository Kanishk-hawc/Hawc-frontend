import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AppFront from "./app/appfront";
import "./index.css";
import { I18nProvider } from "./app/student/view/i18n";
// import { AuthProvider } from "./app/auth/services/Auth"; 
import { AuthProvider } from './app/auth/AuthContext.tsx';

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <I18nProvider>
          <AppFront />
        </I18nProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
