import { Info, LogOut } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { ROUTES } from "../constants/constants";
import { logout } from "../services/authApi";

import { Button, ButtonProps } from "./ui/button";

interface ILogoutButtonProps extends ButtonProps {}

const LogoutButton = ({
  className,

  ...props
}: ILogoutButtonProps): JSX.Element => {
  const navigate = useNavigate();

  const onLogoutButtonClick = (): void => {
    toast("Logged out successfully", {
      icon: <Info className="text-blue-500" />,
    });

    const timeoutId = setTimeout(() => {
      logout();
      navigate(ROUTES.LOGIN, { replace: true });

      clearTimeout(timeoutId);
    }, 2000);
  };

  return (
    <Button
      className={className}
      onPress={onLogoutButtonClick}
      type="button"
      size="icon"
      {...props}
    >
      <LogOut className="h-4 w-4" />
    </Button>
  );
};

export default LogoutButton;
