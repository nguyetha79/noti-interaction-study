import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { SnackbarProvider } from "notistack";
import CustomNoti from "./components/CustomNoti.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SnackbarProvider
      Components={{
        reportComplete: CustomNoti,
      }}
    >
      <App />
    </SnackbarProvider>
  </React.StrictMode>
);
