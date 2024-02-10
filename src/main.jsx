import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
  {/* wrapping our whole component inside the browser-router*/}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </>
);
