import { useShallow } from "zustand/react/shallow";

import { useAppStore } from "../store/app";

const CSVViewer = (): JSX.Element => {
  const [parsedCSVFile, setCurrentStep] = useAppStore(
    useShallow((state) => [state.parsedCSVFile, state.setCurrentStep]),
  );

  return <div>CSVViewer</div>;
};

export default CSVViewer;
