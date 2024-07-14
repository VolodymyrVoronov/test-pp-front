import { cn } from "../lib/utils";

import GridPattern from "../components/ui/grid-pattern";
import AuthForm from "../components/AuthForm";

const Register = (): JSX.Element => {
  return (
    <div className="bg-background relative flex h-screen w-screen items-center justify-center overflow-hidden p-20 md:shadow-xl">
      <AuthForm formType="register" />

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
