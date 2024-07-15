import { useKeyPress } from "ahooks";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Eye, EyeOff, LogIn, UserRound } from "lucide-react";
import { ChangeEvent, ComponentProps, useState } from "react";
import { TextField } from "react-aria-components";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { ROUTES } from "../constants/constants";
import { login, register } from "../services/authApi";
import {
  FormType,
  ILoginErrorResponse,
  IRegisterErrorResponse,
  IUserData,
} from "../types/types";

import { Button } from "./ui/button";
import { Card } from "./ui/Card";
import CopyButton from "./ui/CopyButton";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const initialUserData: IUserData = {
  username: "",
  password: "",
};

interface IAuthFormProps extends ComponentProps<"div"> {
  formType: FormType;
}

const AuthForm = ({ formType = "register" }: IAuthFormProps): JSX.Element => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState<IUserData>(initialUserData);
  const [showPassword, setShowPassword] = useState(false);

  useKeyPress("Esc", () => {
    if (userData.username || userData.password) {
      setUserData(initialUserData);
    }
  });

  const onInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const name = e.target.name;
    const value = e.target.value;

    setUserData({ ...userData, [name]: value });
  };

  const onPasswordVisibilityClick = (): void => {
    setShowPassword((prev) => !prev);
  };

  const onRegisterButtonClick = async (): Promise<void> => {
    const response = await register(userData);

    if (response.success) {
      setUserData(initialUserData);

      toast.success("Account created successfully");

      const timeoutId = setTimeout(() => {
        navigate(ROUTES.LOGIN);

        clearTimeout(timeoutId);
      }, 2000);
    }

    if (!response.success) {
      const { error } = response.error as IRegisterErrorResponse;

      toast.error(error);
    }
  };

  const onLoginButtonClick = async (): Promise<void> => {
    if (formType === "register") {
      navigate(ROUTES.LOGIN);

      return;
    }

    const response = await login(userData);

    if (response.success) {
      setUserData(initialUserData);

      toast.success("Login successful");

      toast(
        (t) => (
          <div className="flex flex-col gap-2">
            <p className="text-md text-center">
              Your secret key (use this to generate OTPs): {response.data.otp}.
            </p>

            <CopyButton
              stringToCopy={response.data.otp}
              onClick={() => {
                const timeoutId = setTimeout(() => {
                  toast.dismiss(t.id);

                  navigate(ROUTES.VERIFY);

                  clearTimeout(timeoutId);
                }, 2000);
              }}
            />
          </div>
        ),
        {
          duration: Infinity,
        },
      );
    }

    if (!response.success) {
      const { error } = response.error as ILoginErrorResponse;

      toast.error(error);
    }
  };

  const onBackButtonClick = (): void => {
    navigate(ROUTES.ROOT);
  };

  return (
    <Card className="z-20 rounded-none bg-white p-5 text-gray-700 shadow-2xl md:p-10">
      {formType === "register" ? (
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold">Welcome to PP App</h1>
          <span>Create an account or login if you already have one</span>
        </div>
      ) : (
        <h1 className="text-2xl font-semibold">
          Please enter your credentials
        </h1>
      )}

      <div className="mt-10 grid w-auto grid-cols-1 gap-5 sm:w-[400px]">
        <TextField className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="text-lg">Username:</Label>
          <Input
            onChange={onInputChange}
            value={userData.username}
            name="username"
            type="text"
            autoFocus
            required
            className="text-lg"
          />
        </TextField>

        <TextField className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="text-lg">Password:</Label>

          <div className="grid w-full grid-cols-[1fr_auto] gap-4">
            <Input
              onChange={onInputChange}
              value={userData.password}
              name="password"
              type={showPassword ? "text" : "password"}
              required
              className="text-lg"
            />

            <Button
              onPress={onPasswordVisibilityClick}
              type="button"
              size="icon"
              isDisabled={!userData.password}
            >
              <AnimatePresence mode="wait">
                {showPassword ? (
                  <motion.span
                    key="eye-closed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <EyeOff className="size-5" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="eye-open"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Eye className="size-5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </Button>
          </div>
        </TextField>
      </div>

      <div className="mt-10 flex w-full flex-row gap-5">
        {formType === "register" ? (
          <Button
            onPress={onRegisterButtonClick}
            type="button"
            isDisabled={!userData.username || !userData.password}
            className="w-full"
          >
            Register
            <UserRound className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button
            onPress={onBackButtonClick}
            type="button"
            variant="secondary"
            className="w-full"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        )}

        <Button
          onPress={onLoginButtonClick}
          type="button"
          variant="outline"
          className="w-full"
          isDisabled={
            formType === "login" && (!userData.username || !userData.password)
          }
        >
          Login
          <LogIn className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};

export default AuthForm;
