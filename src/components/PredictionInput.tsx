import { ArrowLeft, ArrowRight, Info, Rocket } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useShallow } from "zustand/react/shallow";

import fireConfetti from "../lib/fireConfetti";
import { predict } from "../services/stockApi";
import { useAppStore } from "../store/app";

import DaysToPredictInput from "./DaysToPredictInput";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { BorderBeam } from "./ui/border-beam";
import { Button } from "./ui/button";
import Particles from "./ui/particles";

const PredictionInput = (): JSX.Element => {
  const [parsedCSVFile, setCurrentStep] = useAppStore(
    useShallow((state) => [state.parsedCSVFile, state.setCurrentStep]),
  );

  const [isPredicting, setIsPredicting] = useState(false);

  const onStartPredictionButtonClick = async (): Promise<void> => {
    setIsPredicting(true);

    const processedData = parsedCSVFile?.data.map((row) => {
      const processedRow: Record<string, string | number> = {};

      Object.keys(row).forEach((key) => {
        switch (key) {
          case "Date":
          case "date":
            processedRow["date"] = row[key];
            break;
          case "Open":
          case "open":
            processedRow["open"] = row[key];
            break;
          case "High":
          case "high":
            processedRow["high"] = row[key];
            break;
          case "Low":
          case "low":
            processedRow["low"] = row[key];
            break;

          case "Close":
          case "close":
            processedRow["close"] = row[key];
            break;
          default:
            break;
        }
      });

      return processedRow;
    });

    if (processedData) {
      const response = await predict(processedData);

      if (response.success) {
        fireConfetti();
        setIsPredicting(false);
        toast.success("Predictions are ready!");
      }

      if (!response.success) {
        setIsPredicting(false);

        if (typeof response.error === "string") {
          toast.error(response.error);
        } else {
          const { error } = response.error;

          toast.error(error);
        }
      }
    }
  };

  const onPreviousStepButtonClick = (): void => {
    setCurrentStep(1);
  };

  const onNextStepButtonClick = (): void => {
    setCurrentStep(3);
  };

  return (
    <div className="relative z-40 flex h-auto flex-col gap-10 rounded-md bg-white p-5 text-center shadow-xl">
      <DaysToPredictInput isInputDisabled={isPredicting} />

      <div className="relative flex h-[320px] w-[320px] items-center justify-center lg:h-[350px] lg:w-[450px]">
        <Button
          className="text-md relative z-40 flex size-44 flex-col gap-2 rounded-full transition-all hover:scale-105 active:scale-100"
          size="sm"
          onPress={onStartPredictionButtonClick}
          isDisabled={isPredicting}
        >
          <span className="absolute z-[-1] inline-flex size-36 animate-ping rounded-full bg-[#77e3ff] opacity-75"></span>

          <Rocket className="size-7" />

          <span>Start Prediction</span>
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
        className="w-[320px] border-blue-500 text-left text-blue-500 lg:w-[450px]"
      >
        <Info className="h-4 w-4 text-[#4d8bf9_!important]" />
        <AlertTitle>Please note</AlertTitle>

        <AlertDescription className="mt-3 flex flex-col gap-1">
          The process may take some time. The time depends on the size of your
          CSV file, Internet connection and number of days to predict.
        </AlertDescription>
      </Alert>

      <div className="flex flex-row justify-center gap-5">
        <Button
          className="w-full"
          size="sm"
          variant="secondary"
          onPress={onPreviousStepButtonClick}
          isDisabled={isPredicting}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
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
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <BorderBeam size={100} duration={12} delay={9} borderWidth={2} />
    </div>
  );
};

export default PredictionInput;
