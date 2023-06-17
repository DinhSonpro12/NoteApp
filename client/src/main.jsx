import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import createBrowserRouter from "./router";
import "./firebase/config";
import "../src/index.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={createBrowserRouter}>
    <React.StrictMode></React.StrictMode>
  </RouterProvider>
);
