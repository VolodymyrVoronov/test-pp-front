import { Info, Rocket } from "lucide-react";
import { useShallow } from "zustand/react/shallow";

import { useAppStore } from "../store/app";

import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { BorderBeam } from "./ui/border-beam";
import { Button } from "./ui/button";
import Particles from "./ui/particles";

const PredictionInput = (): JSX.Element => {
  const [parsedCSVFile, setCurrentStep] = useAppStore(
    useShallow((state) => [state.parsedCSVFile, state.setCurrentStep]),
  );

  console.log(parsedCSVFile);

  const onPreviousStepButtonClick = (): void => {
    setCurrentStep(1);
  };

  const onNextStepButtonClick = (): void => {
    setCurrentStep(3);
  };

  return (
    <div className="relative z-40 flex h-auto flex-col gap-10 rounded-md bg-white p-5 text-center shadow-xl">
      <div className="relative flex h-[320px] w-[320px] items-center justify-center lg:h-[350px] lg:w-[450px]">
        <Button
          className="relative z-40 flex size-56 flex-col gap-2 rounded-full text-2xl transition-all hover:scale-105"
          size="sm"
        >
          {/* <span className="absolute z-[-1] inline-flex size-40 animate-ping rounded-full bg-[#77e3ff] opacity-75"></span> */}
          <span>Start Prediction</span>

          <Rocket className="size-8" />
        </Button>

        <Particles
          className="absolute inset-0"
          quantity={150}
          ease={80}
          color={"#000000"}
          refresh
        />
      </div>

      <Alert
        variant="default"
        className="w-[320px] text-left text-blue-500 lg:w-[450px]"
      >
        <Info className="h-4 w-4 text-[#4d8bf9_!important]" />
        <AlertTitle>Please note</AlertTitle>

        <AlertDescription className="mt-3 flex flex-col gap-1">
          The process may take some time. The time depends on the size of your
          CSV file and Internet connection.
        </AlertDescription>
      </Alert>

      <div className="flex flex-row justify-center gap-5">
        <Button
          className="w-full"
          size="sm"
          variant="secondary"
          onPress={onPreviousStepButtonClick}
        >
          Previous Step
        </Button>

        <Button
          className="w-full"
          size="sm"
          variant="secondary"
          onPress={onNextStepButtonClick}
          isDisabled
        >
          Get Prediction
        </Button>
      </div>

      <BorderBeam size={100} duration={12} delay={9} borderWidth={2} />
    </div>
  );
};

export default PredictionInput;