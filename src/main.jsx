import React from "react";
import ReactDOM from "react-dom/client";
import WikiApp from "./wikiApp";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={theme}>
    <WikiApp />
  </ThemeProvider>
);