import { cn } from "../lib/utils";

import LogoutButton from "../components/LogoutButton";
import Profile from "../components/Profile";
import GridPattern from "../components/ui/grid-pattern";
import { Tooltip, TooltipTrigger } from "../components/ui/tooltip";

const Main = (): JSX.Element => {
  return (
    <div className="relative flex h-screen w-screen items-center justify-center overflow-auto p-2 md:p-0">
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        strokeDasharray={"4 2"}
        className={cn("[mask-image:radial-gradient(white,white,transparent)]")}
      />

      <Profile className="absolute right-2 top-2 shadow-xl" />

      <TooltipTrigger delay={0}>
        <LogoutButton
          className="absolute bottom-2 right-2 rounded-2xl shadow-xl"
          variant="destructive"
        />
        <Tooltip>Logout</Tooltip>
      </TooltipTrigger>
    </div>
  );
};

export default Main;
