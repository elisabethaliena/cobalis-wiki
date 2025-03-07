import React from "react";
import ReactDOM from "react-dom/client";
import WikiApp from "./wikiApp";
//import "./index.css"; // Falls du eine globale CSS-Datei hast

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <WikiApp />
  </React.StrictMode>
);