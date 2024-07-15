import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import {
  createHashRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";

import { ROUTES } from "./constants/constants.ts";

import Login from "./pages/Login.tsx";
import Main from "./pages/Main.tsx";
import Register from "./pages/Register.tsx";
import Verify from "./pages/Verify.tsx";

import { AuthProvider } from "./context/AuthContext.tsx";

import AuthWrapper from "./components/AuthWrapper.tsx";
import PageTransition from "./components/PageTransition.tsx";

import "./index.css";

import "@fontsource-variable/montserrat";

const router = createHashRouter([
  {
    path: ROUTES.ROOT,
    element: (
      <PageTransition>
        <Navigate to={ROUTES.REGISTER} replace={true} />
      </PageTransition>
    ),
  },
  {
    element: (
      <PageTransition>
        <Register />
      </PageTransition>
    ),
    path: ROUTES.REGISTER,
  },
  {
    element: (
      <PageTransition>
        <Login />
      </PageTransition>
    ),
    path: ROUTES.LOGIN,
  },
  {
    path: ROUTES.ROOT,
    element: (
      <AuthProvider>
        <AuthWrapper>
          <PageTransition>
            <Outlet />
          </PageTransition>
        </AuthWrapper>
      </AuthProvider>
    ),
    children: [
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
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Toaster />

    <RouterProvider router={router} />
  </React.StrictMode>,
);
