import { AnimatePresence, motion } from "framer-motion";
import { FileTrigger, Text } from "react-aria-components";
import { useShallow } from "zustand/react/shallow";

import { useAppStore } from "../store/app";

import { BorderBeam } from "./ui/border-beam";
import { Button } from "./ui/button";
import { DropZone } from "./ui/dropzone";

const CSVUploader = (): JSX.Element => {
  const [fileName, setCurrentStep, setCSVFile, setFileName] = useAppStore(
    useShallow((state) => [
      state.fileName,
      state.setCurrentStep,
      state.setCSVFile,
      state.setFileName,
    ]),
  );

  const onCSVUploadChange = (file: string, fileName: string): void => {
    setCSVFile(file);
    setFileName(fileName);
  };

  const onNextStepButtonClick = (): void => {
    setCurrentStep(1);
  };

  return (
    <div className="flex flex-col gap-10">
      <DropZone
        className="relative z-40 h-[200px] w-[300px] rounded-md bg-white p-5 shadow-2xl md:w-[400px]"
        onDrop={async (e) => {
          try {
            const files = e.items.filter((item) => item.kind === "file");

            if (files) {
              const file = await files[0].getFile();

              const reader = new FileReader();
              reader.onload = async (event) => {
                const csv = event.target?.result as string;
                if (csv) {
                  onCSVUploadChange(csv, file.name);
                }
              };

              reader.readAsText(file);
            }
          } catch (error) {
            console.error(error);
          }
        }}
      >
        <FileTrigger
          allowsMultiple
          onSelect={async (files) => {
            try {
              if (files) {
                const file = files[0];
                const reader = new FileReader();
                reader.onload = async (event) => {
                  const csv = event.target?.result as string;
                  if (csv) {
                    onCSVUploadChange(csv, file.name);
                  }
                };

                reader.readAsText(file);
              }
            } catch (error) {
              console.error(error);
            }
          }}
          acceptedFileTypes={["text/csv"]}
        >
          <Button variant="default" size="lg" className="text-xl">
            Select file
          </Button>
        </FileTrigger>

        <Text slot="label" className="text-center text-xl">
          Drop file
        </Text>

        <BorderBeam size={100} duration={12} delay={9} borderWidth={2} />
      </DropZone>

      {fileName ? (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="z-40 h-auto w-[300px] space-y-3 rounded-md bg-white p-5 text-center shadow-2xl md:w-[400px]"
          >
            <h3>File you have uploaded:</h3>
            <p className="text-center text-xl font-semibold">{fileName}</p>

            <Button variant="default" onPress={onNextStepButtonClick}>
              Next Step
            </Button>
          </motion.div>
        </AnimatePresence>
      ) : null}
    </div>
  );
};

export default CSVUploader;
