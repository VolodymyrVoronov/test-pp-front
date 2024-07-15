import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import toast from "react-hot-toast";

import { checkAuth } from "../services/authApi";
import { ICheckAuthErrorResponse } from "../types/types";

interface IAuthContext {
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUserAuth = async (): Promise<void> => {
      const response = await checkAuth();

      if (response.success) {
        setIsAuthenticated(true);
      }

      if (!response.success) {
        const { error } = response.error as ICheckAuthErrorResponse;

        toast.error(error);
      }

      setIsLoading(false);
    };

    checkUserAuth();
  }, []);

  const memoizedValue = useMemo(
    () => ({ isAuthenticated, isLoading }),
    [isAuthenticated, isLoading],
  );

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

export { AuthProvider, useAuth };
