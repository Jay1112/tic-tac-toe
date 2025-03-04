import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "primeicons/primeicons.css";

import { BrowserRouter as Router } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <Router>
    <App />
  </Router>
);
