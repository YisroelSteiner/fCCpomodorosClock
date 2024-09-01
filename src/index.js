import React from "react";
import { createRoot } from "react-dom/client";
import Clock from "./Clock.jsx";
import "./styles/main.scss";


const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Clock />
  </React.StrictMode>
);

//finish the styling ASAP and upload to GH, move on to the calculator