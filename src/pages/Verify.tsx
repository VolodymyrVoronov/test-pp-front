import { BackgroundGradientAnimation } from "../components/ui/background-gradient-animation";
import VerifyForm from "../components/VerifyForm";

const Verify = (): JSX.Element => {
  return (
    <BackgroundGradientAnimation className="absolute inset-0 flex items-center justify-center overflow-auto p-2 md:p-0">
      <VerifyForm />
    </BackgroundGradientAnimation>
  );
};

export default Verify;
