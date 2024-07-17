import { useAppStore } from "../store/app";
import { useShallow } from "zustand/react/shallow";

import { BorderBeam } from "./ui/border-beam";
import GraphView from "./GraphView";

const PredictionResult = (): JSX.Element => {
  const [predictions, graph, setCurrentStep] = useAppStore(
    useShallow((state) => [
      state.predictions,
      state.graph,
      state.setCurrentStep,
    ]),
  );

  return (
    <div className="relative z-40 flex h-auto flex-col gap-10 rounded-md bg-white p-5 text-center shadow-xl">
      <GraphView htmlContent={graph} className="z-[99] h-full w-full" />

      <BorderBeam size={100} duration={12} delay={9} borderWidth={2} />
    </div>
  );
};

export default PredictionResult;
