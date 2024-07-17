import { ArrowLeft, RotateCcw, TriangleAlert } from "lucide-react";
import { useShallow } from "zustand/react/shallow";
import { useAppStore } from "../store/app";

import GraphView from "./GraphView";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { BorderBeam } from "./ui/border-beam";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

const PredictionResult = (): JSX.Element => {
  const [predictions, graph, fileName, setCurrentStep] = useAppStore(
    useShallow((state) => [
      state.predictions,
      state.graph,
      state.fileName,
      state.setCurrentStep,
    ]),
  );

  const onPreviousStepButtonClick = (): void => {
    setCurrentStep(2);
  };

  const onStartOverButtonClick = (): void => {
    setCurrentStep(0);
  };

  return (
    <div className="relative z-40 flex h-auto flex-col gap-10 rounded-md bg-white p-5 text-center shadow-xl">
      <span className="text-xl">
        Price history chart for{" "}
        <span className="font-semibold">{fileName.split(".")[0]}</span>
      </span>

      <GraphView htmlContent={graph} className="h-[550px] w-[900px]" />

      <Alert variant="destructive" className="text-left">
        <TriangleAlert className="h-4 w-4" />

        <AlertTitle>Please note</AlertTitle>

        <AlertDescription className="mt-3 flex flex-col gap-1">
          <span>
            The predictions are based on the data you provided.
            <br />
            The predictions are not 100% accurate.
            <br />
            Use them as a guide only and do not take them as financial advice.
          </span>
        </AlertDescription>
      </Alert>

      <span className="text-xl">
        Predictions for{" "}
        <span className="font-semibold">{fileName.split(".")[0]}</span>
      </span>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-left">Date</TableHead>
            <TableHead className="text-left">Price</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {predictions.map((prediction, index) => (
            <TableRow key={index}>
              <TableCell className="text-left font-semibold">
                {prediction.date}
              </TableCell>
              <TableCell className="text-left font-semibold">
                {prediction.price.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex flex-row justify-center gap-5">
        <Button
          className="w-full"
          size="sm"
          variant="secondary"
          onPress={onPreviousStepButtonClick}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Previous Step
        </Button>

        <Button
          className="w-full"
          size="sm"
          variant="default"
          onPress={onStartOverButtonClick}
        >
          Start over
          <RotateCcw className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <BorderBeam size={100} duration={12} delay={9} borderWidth={2} />
    </div>
  );
};

export default PredictionResult;
