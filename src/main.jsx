import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { UIContextProvider } from "./context/UIContext.jsx";
import AuthContextProvider from "./context/AuthContext.jsx";
import DataProvider from "./context/DataContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <UIContextProvider>
        <AuthContextProvider>
          <DataProvider>
            <App />
          </DataProvider>
        </AuthContextProvider>
      </UIContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
