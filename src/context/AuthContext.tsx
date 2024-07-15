import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import toast from "react-hot-toast";
import { useLocalStorage } from "@mantine/hooks";

import { checkAuth } from "../services/authApi";

interface IAuthContext {
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [, setUser] = useLocalStorage<string | null>({
    key: "pp-user",
    defaultValue: null,
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUserAuth = async (): Promise<void> => {
      const response = await checkAuth();

      if (response.success) {
        setIsAuthenticated(true);

        setUser(response.data.username);
      }

      if (!response.success) {
        if (typeof response.error === "string") {
          toast.error(response.error);
        } else {
          const { error } = response.error;

          toast.error(error);
        }
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
