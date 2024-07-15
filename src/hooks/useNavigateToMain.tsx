import { useLocalStorage } from "@mantine/hooks";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { ROUTES } from "../constants/constants";
import { isAuthenticated } from "../services/authApi";

export function useNavigateToMain(): void {
  const navigate = useNavigate();

  const [user] = useLocalStorage<string | null>({
    key: "pp-user",
    defaultValue: null,
  });

  useEffect(() => {
    const checkUserAndNavigate = (): void => {
      if (user && isAuthenticated()) {
        navigate(ROUTES.MAIN, { replace: true });
      }
    };

    checkUserAndNavigate();

    document.addEventListener("visibilitychange", checkUserAndNavigate);

    return () => {
      document.removeEventListener("visibilitychange", checkUserAndNavigate);
    };
  }, [navigate, user]);
}
