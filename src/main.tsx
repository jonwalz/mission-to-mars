import React from "react";
import ReactDOM from "react-dom/client";
import "./globals.css";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { store } from "./store";
import { router } from "./router";
import { GlobalErrorBoundary } from "./components/GlobalErrorBoundary";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GlobalErrorBoundary>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </GlobalErrorBoundary>
  </React.StrictMode>
);
