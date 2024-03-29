import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

function Router() {
  return (
      <BrowserRouter>
          <App />
      </BrowserRouter>
  )
}

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<Router />);