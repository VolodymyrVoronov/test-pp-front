import { useShallow } from "zustand/react/shallow";

import { useAppStore } from "../store/app";

const CSVViewer = (): JSX.Element => {
  const [setCurrentStep] = useAppStore(
    useShallow((state) => [state.setCurrentStep]),
  );

  return <div>CSVViewer</div>;
};

export default CSVViewer;
