import AuthForm from "../components/AuthForm";
import { BackgroundGradientAnimation } from "../components/ui/background-gradient-animation";

const Login = (): JSX.Element => {
  return (
    <BackgroundGradientAnimation className="absolute inset-0 flex items-center justify-center overflow-auto p-2 md:p-0">
      <AuthForm formType="login" />
    </BackgroundGradientAnimation>
  );
};

export default Login;
