import React from "react";
import { createRoot } from "react-dom/client";
import DecimoniLanding from "./DecimoniLanding";
import "./styles.css";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <DecimoniLanding />
  </React.StrictMode>
);