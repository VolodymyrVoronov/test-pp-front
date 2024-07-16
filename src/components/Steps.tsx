import { AnimatePresence, motion } from "framer-motion";
import { ComponentProps } from "react";
import { useShallow } from "zustand/react/shallow";

import { cn } from "../lib/utils";
import { useAppStore } from "../store/app";
import { IStep } from "../types/types";

import CSVUploader from "./CSVUploader";
import CSVViewer from "./CSVViewer";
import PredictionInput from "./PredictionInput";

interface IStepsProps extends ComponentProps<"div"> {}

const steps: IStep[] = [
  {
    stepName: "Upload your CSV",
    stepComponent: <CSVUploader />,
  },
  {
    stepName: "Check your data",
    stepComponent: <CSVViewer />,
  },
  {
    stepName: "Start price prediction",
    stepComponent: <PredictionInput />,
  },
  {
    stepName: "Result",
    stepComponent: <div className="bg-green-500">Step 4 Test</div>,
  },
];

const Steps = ({ className, ...props }: IStepsProps): JSX.Element => {
  const [currentStep] = useAppStore(useShallow((state) => [state.currentStep]));

  return (
    <div
      className={cn(
        "flex h-full w-full flex-col gap-10 overflow-hidden",
        className,
      )}
      {...props}
    >
      <div className="flex flex-row justify-center">
        <h2 className="flex flex-col gap-2 text-center text-xl lg:text-3xl">
          <span className="mt-0.5 text-nowrap">
            Step{" "}
            <AnimatePresence mode="wait">
              <motion.span
                key={currentStep}
                initial={{ opacity: 0, filter: "blur(15px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(15px)" }}
                transition={{ duration: 0.5 }}
                className="relative me-2 rounded-full bg-[#77e3ff] px-3 font-medium"
              >
                {currentStep + 1}
              </motion.span>
            </AnimatePresence>
          </span>

          <AnimatePresence mode="wait">
            <motion.span
              key={currentStep}
              initial={{ opacity: 0, filter: "blur(15px)", x: -50 }}
              animate={{ opacity: 1, filter: "blur(0px)", x: 0 }}
              exit={{ opacity: 0, filter: "blur(15px)", x: 50 }}
              transition={{ duration: 0.5 }}
              className="text-nowrap"
            >
              {steps[currentStep].stepName}
            </motion.span>
          </AnimatePresence>
        </h2>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5 }}
          className="flex h-full w-full items-start justify-center overflow-auto pb-10"
        >
          {steps[currentStep].stepComponent}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Steps;
