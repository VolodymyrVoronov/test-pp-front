import { cn } from "../lib/utils";

import LogoutButton from "../components/LogoutButton";
import Profile from "../components/Profile";
import Steps from "../components/Steps";
import GridPattern from "../components/ui/grid-pattern";
import { Tooltip, TooltipTrigger } from "../components/ui/tooltip";

const Main = (): JSX.Element => {
  return (
    <div className="relative grid h-screen w-screen grid-cols-[1fr_auto] gap-1 overflow-auto p-2 md:gap-5">
      <div className="overflow-auto">
        <Steps />
      </div>

      <div className="right-2 top-2 flex flex-col justify-between">
        <Profile className="shadow-xl" />

        <TooltipTrigger delay={0}>
          <LogoutButton
            className="rounded-2xl shadow-xl"
            variant="destructive"
          />
          <Tooltip>Logout</Tooltip>
        </TooltipTrigger>
      </div>

      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        strokeDasharray={"4 2"}
        className={cn("[mask-image:radial-gradient(white,white,transparent)]")}
      />
    </div>
  );
};

export default Main;
