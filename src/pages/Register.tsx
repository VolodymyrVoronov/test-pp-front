import { useNavigateToMain } from "../hooks/useNavigateToMain";
import { cn } from "../lib/utils";

import AuthForm from "../components/AuthForm";
import GridPattern from "../components/ui/grid-pattern";

const Register = (): JSX.Element => {
  useNavigateToMain();

  return (
    <div className="relative flex h-screen w-screen items-center justify-center overflow-auto p-2 md:p-0">
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
