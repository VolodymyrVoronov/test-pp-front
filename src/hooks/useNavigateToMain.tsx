import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { ROUTES } from "../constants/constants";
import { isAuthenticated, isOpt } from "../services/authApi";

export function useNavigateToMain(type: "token" | "otp" = "token"): void {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthAndNavigate = (): void => {
      const token = isAuthenticated();
      const isOtp = isOpt();

      if (token && type === "token") {
        navigate(ROUTES.MAIN, { replace: true });
      }

      if (isOtp && type === "otp") {
        navigate(ROUTES.MAIN, { replace: true });
      }
    };

    checkAuthAndNavigate();

    document.addEventListener("visibilitychange", checkAuthAndNavigate);

    return () => {
      document.removeEventListener("visibilitychange", checkAuthAndNavigate);
    };
  }, [navigate, type]);
}
