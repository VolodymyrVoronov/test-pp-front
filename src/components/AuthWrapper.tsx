import { motion } from "framer-motion";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { ROUTES } from "../constants/constants";
import { useAuth } from "../context/AuthContext";

import { cn } from "../lib/utils";

import Loader from "./ui/Loader";
import GridPattern from "./ui/grid-pattern";

const AuthWrapper = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 2 }}
      >
        <Loader />

        <GridPattern
          width={30}
          height={30}
          x={-1}
          y={-1}
          strokeDasharray={"4 2"}
          className={cn(
            "[mask-image:radial-gradient(white,white,transparent)]",
          )}
        />
      </motion.div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} />;
  }

  return <>{children}</>;
};

export default AuthWrapper;
