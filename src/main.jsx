import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { UIContextProvider } from "./context/UIContext.jsx";
import AuthContextProvider from "./context/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <UIContextProvider>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </UIContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
