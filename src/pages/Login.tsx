import AuthForm from "../components/AuthForm";
import { BackgroundGradientAnimation } from "../components/ui/background-gradient-animation";

const Login = (): JSX.Element => {
  return (
    <BackgroundGradientAnimation className="absolute inset-0 flex items-center justify-center p-2 md:p-0">
      <div className="md:shadow-xl">
        <AuthForm formType="login" />
      </div>
    </BackgroundGradientAnimation>
  );
};

export default Login;
