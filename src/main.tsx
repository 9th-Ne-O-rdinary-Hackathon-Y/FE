import "./index.css";

import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.tsx";
import RootProdiver from "./components/provider/root-prodiver.tsx";

createRoot(document.getElementById("root")!).render(
  <RootProdiver>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </RootProdiver>
);
