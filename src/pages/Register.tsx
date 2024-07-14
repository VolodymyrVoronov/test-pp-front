import { cn } from "../lib/utils";

import { Card } from "../components/ui/Card";
import GridPattern from "../components/ui/grid-pattern";

const Register = (): JSX.Element => {
  return (
    <div className="bg-background relative flex h-screen w-screen items-center justify-center overflow-hidden p-20 md:shadow-xl">
      <Card className="z-20 bg-white p-5 shadow-2xl">
        <p className="z-10 whitespace-pre-wrap text-center text-5xl font-medium tracking-tighter text-black dark:text-white">
          Grid Pattern
        </p>
      </Card>

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

export default Register;
