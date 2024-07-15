import { useLocalStorage } from "@mantine/hooks";
import { ComponentProps } from "react";

import { cn } from "../lib/utils";

interface IProfileProps extends ComponentProps<"div"> {}

const Profile = ({ className, ...props }: IProfileProps): JSX.Element => {
  const [user] = useLocalStorage<string | null>({
    key: "pp-user",
    defaultValue: null,
  });

  const shortName = user?.slice(0, 2).toUpperCase();

  return (
    <div
      className={cn(
        "relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-2xl bg-[#77e3ff]",
        className,
      )}
      {...props}
    >
      <span className="font-semibold text-gray-700">{shortName}</span>
    </div>
  );
};

export default Profile;
