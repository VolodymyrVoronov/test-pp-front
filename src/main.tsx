import React from "react";
import ReactDOM from "react-dom/client";
import { createHashRouter, Navigate, RouterProvider } from "react-router-dom";

import { ROUTES } from "./constants/constants.ts";

import Login from "./pages/Login.tsx";
import Main from "./pages/Main.tsx";
import Register from "./pages/Register.tsx";
import Verify from "./pages/Verify.tsx";

import "./index.css";

import "@fontsource-variable/montserrat";

const router = createHashRouter([
  {
    path: ROUTES.ROOT,
    element: <Navigate to={ROUTES.REGISTER} replace={true} />,
  },
  {
    element: <Register />,
    path: ROUTES.REGISTER,
  },
  {
    element: <Login />,
    path: ROUTES.LOGIN,
  },
  {
    element: <Verify />,
    path: ROUTES.VERIFY,
  },

  {
    element: <Main />,
    path: ROUTES.MAIN,
  },
  {
    path: "*",
    element: <div>404</div>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
