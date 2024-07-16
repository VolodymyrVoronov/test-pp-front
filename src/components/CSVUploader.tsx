import { AnimatePresence, motion } from "framer-motion";
import { FileTrigger, Text } from "react-aria-components";
import toast from "react-hot-toast";
import { useShallow } from "zustand/react/shallow";

import { checkFileFormat } from "../lib/checkFileFormat";
import { useAppStore } from "../store/app";

import { BorderBeam } from "./ui/border-beam";
import { Button } from "./ui/button";
import { DropZone } from "./ui/dropzone";

const errorUploadFileMessage =
  "Invalid file format. Only CSV files are allowed";

const CSVUploader = (): JSX.Element => {
  const [fileName, setCurrentStep, setCSVFile, resetCSVFile, setFileName] =
    useAppStore(
      useShallow((state) => [
        state.fileName,
        state.setCurrentStep,
        state.setCSVFile,
        state.resetCSVFile,
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

  const onResetButtonClick = (): void => {
    resetCSVFile();
    setFileName("");
  };

  return (
    <div className="flex flex-col gap-10">
      <DropZone
        className="relative z-40 h-[200px] w-[300px] rounded-md bg-white p-5 shadow-xl md:w-[400px]"
        onDrop={async (e) => {
          try {
            const files = e.items.filter((item) => item.kind === "file");

            if (files) {
              const file = await files[0].getFile();

              if (!checkFileFormat(file, "csv")) {
                toast.error(errorUploadFileMessage);

                return;
              }

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

                if (!checkFileFormat(file, "csv")) {
                  toast.error(errorUploadFileMessage);

                  return;
                }

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
          <Button variant="default" size="lg" className="lg:text-xl">
            Select file
          </Button>
        </FileTrigger>

        <Text slot="label" className="text-center lg:text-xl">
          Drop file
        </Text>

        <BorderBeam size={100} duration={12} delay={9} borderWidth={2} />
      </DropZone>

      {fileName ? (
        <div className="relative z-40 h-auto w-[300px] rounded-md bg-white p-5 text-center shadow-xl md:w-[400px]">
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-5"
            >
              <div className="flex flex-col gap-2">
                <h3>File you have uploaded:</h3>
                <p className="text-center font-semibold lg:text-xl">
                  {fileName}
                </p>
              </div>

              <div className="flex flex-row justify-center gap-5">
                <Button
                  className="w-full"
                  size="sm"
                  variant="destructive"
                  onPress={onResetButtonClick}
                >
                  Reset
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
            </motion.div>
          </AnimatePresence>

          <BorderBeam size={100} duration={12} delay={9} borderWidth={2} />
        </div>
      ) : null}
    </div>
  );
};

export default CSVUploader;
