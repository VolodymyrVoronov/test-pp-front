import { TriangleAlert } from "lucide-react";
import { useShallow } from "zustand/react/shallow";

import { useAppStore } from "../store/app";

import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { BorderBeam } from "./ui/border-beam";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

const CSVViewer = (): JSX.Element => {
  const [parsedCSVFile, setCurrentStep] = useAppStore(
    useShallow((state) => [state.parsedCSVFile, state.setCurrentStep]),
  );

  const onPreviousStepButtonClick = (): void => {
    setCurrentStep(0);
  };

  const onNextStepButtonClick = (): void => {
    setCurrentStep(2);
  };

  return (
    <div className="relative z-40 flex h-auto flex-col gap-10 rounded-md bg-white p-5 text-center shadow-xl">
      <ScrollArea className="h-72">
        <Table>
          <TableHeader>
            <TableRow>
              {parsedCSVFile?.meta.fields!.map((field, index) => (
                <TableHead key={index} className="text-left">
                  {field}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {parsedCSVFile?.data
              .map((row, index) => (
                <TableRow key={index}>
                  {Object.values(row).map((value, index) => (
                    <TableCell key={index} className="text-left">
                      {value}
                    </TableCell>
                  ))}
                </TableRow>
              ))
              .reverse()}
          </TableBody>
        </Table>
      </ScrollArea>

      <Alert variant="destructive" className="text-left">
        <TriangleAlert className="h-4 w-4" />

        <AlertTitle>Please note</AlertTitle>

        <AlertDescription className="mt-3 flex flex-col gap-1">
          <span>
            For successful price prediction and chart visualization, we need at
            least 5 rows of data.
          </span>

          <span className="font-semibold">Date, open, high, low, close.</span>

          <i>Please keep exact this order of the columns.</i>
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
        >
          Next Step
        </Button>
      </div>

      <BorderBeam size={100} duration={12} delay={9} borderWidth={2} />
    </div>
  );
};

export default CSVViewer;
