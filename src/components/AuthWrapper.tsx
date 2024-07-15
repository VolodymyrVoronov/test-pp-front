import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { ROUTES } from "../constants/constants";
import { useAuth } from "../context/AuthContext";

const AuthWrapper = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} />;
  }

  return <>{children}</>;
};

export default AuthWrapper;
