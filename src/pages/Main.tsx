import { cn } from "../lib/utils";

import LogoutButton from "../components/LogoutButton";
import Profile from "../components/Profile";
import GridPattern from "../components/ui/grid-pattern";

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

      <Profile className="absolute right-2 top-2" />
      <LogoutButton className="absolute bottom-2 right-2" />
    </div>
  );
};

export default Main;
