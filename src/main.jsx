
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App"; // Import main App routing component
import "./index.css";

// Render the App component into the root DOM element with StrictMode enabled
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
