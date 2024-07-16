import { useShallow } from "zustand/react/shallow";

import { useAppStore } from "../store/app";

import { BorderBeam } from "./ui/border-beam";
import { Button } from "./ui/button";
import Particles from "./ui/particles";
import { Sparkles } from "lucide-react";

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
      <div className="relative flex h-[320px] w-[320px] items-center justify-center lg:h-[350px] lg:w-[350px]">
        <Button
          className="relative z-40 flex size-56 flex-col gap-2 rounded-full text-2xl"
          size="sm"
        >
          {/* <span className="absolute z-[-1] inline-flex size-40 animate-ping rounded-full bg-[#77e3ff] opacity-75"></span> */}
          <span>Start Prediction</span>
          <Sparkles className="size-8" />
        </Button>

        <Particles
          className="absolute inset-0"
          quantity={150}
          ease={80}
          color={"#000000"}
          refresh
        />
      </div>

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
