import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/all.scss";
import App from "./App.jsx";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import { Provider } from "react-redux";
import { store } from "../store.js";

createRoot(document.getElementById("root")).render(
  //<StrictMode>
  <Provider store={store}>
    <App />
  </Provider>,
  //</StrictMode>,
);
