import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/global.scss";
import { AppProvider } from "./contexts/AppProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
);
