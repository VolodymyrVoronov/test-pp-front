import { useLocalStorage } from "@mantine/hooks";
import { ArrowLeft, Shield } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { TextField } from "react-aria-components";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { ROUTES } from "../constants/constants";
import { verify } from "../services/authApi";

import { Button } from "./ui/button";
import { Card } from "./ui/Card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const VerifyForm = (): JSX.Element => {
  const navigate = useNavigate();

  const [, setUser] = useLocalStorage<string | null>({
    key: "pp-user",
    defaultValue: null,
  });

  const [otp, setOtp] = useState("");

  const onInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;

    setOtp(value);
  };

  const onVerifyButtonClick = async (): Promise<void> => {
    const response = await verify(otp);

    if (response.success) {
      setOtp("");

      toast.success("OTP verified successfully");

      const timeoutId = setTimeout(() => {
        navigate(ROUTES.MAIN);
        setUser(response.data.username);

        clearTimeout(timeoutId);
      }, 2000);
    }

    if (!response.success) {
      if (typeof response.error === "string") {
        toast.error(response.error);
      } else {
        const { error } = response.error;

        toast.error(error);
      }
    }
  };

  const onBackButtonClick = (): void => {
    navigate(ROUTES.LOGIN);
  };

  return (
    <Card className="z-20 rounded-none bg-white p-5 text-gray-700 shadow-2xl md:p-10">
      <div className="flex w-auto flex-col gap-1 sm:w-[400px]">
        <h1 className="text-2xl font-semibold">
          Please enter your OTP to verify your account
        </h1>
      </div>

      <div className="mt-10 grid w-auto grid-cols-1 gap-5 sm:w-[400px]">
        <TextField className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="text-lg">OTP:</Label>
          <Input
            name="otp"
            type="text"
            autoFocus
            required
            className="text-lg"
            value={otp}
            onChange={onInputChange}
          />
        </TextField>
      </div>

      <div className="mt-10 flex w-full flex-row gap-5">
        <Button
          onPress={onBackButtonClick}
          type="button"
          variant="secondary"
          className="w-full"
          isDisabled={!!otp}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <Button
          onPress={onVerifyButtonClick}
          type="button"
          isDisabled={!otp}
          className="w-full"
        >
          Verify
          <Shield className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};

export default VerifyForm;
