import Papa from "papaparse";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { IParsedCSVFile, IPredictSuccessResponse } from "../types/types";

export interface IAppStore {
  rawCSVFile: string | null;
  parsedCSVFile: IParsedCSVFile | null;
  fileName: string;
  currentStep: number;
  daysToPredict: number;
  predictions: IPredictSuccessResponse["predictions"];
  graph: string;
}

export interface IAppActions {
  setCSVFile: (file: string) => void;
  resetProcess: () => void;
  setFileName: (fileName: string) => void;
  setCurrentStep: (step: number) => void;
  setDaysToPredict: (day: number) => void;
  setPredictions: (predictions: IPredictSuccessResponse["predictions"]) => void;
  setGraph: (graph: string) => void;
}

type StoreWithActions = IAppStore & IAppActions;

export const useAppStore = create<StoreWithActions>()(
  immer(
    persist(
      (set) => ({
        rawCSVFile: null,
        parsedCSVFile: null,
        fileName: "",
        currentStep: 0,
        daysToPredict: 7,
        predictions: [],
        graph: "",

        setCSVFile: (file: string) => {
          const parsedNewCSVFiles = Papa.parse(file, {
            header: true,
            dynamicTyping: true,
            skipEmptyLines: true,
          }) as IParsedCSVFile;

          set((state) => {
            state.rawCSVFile = file;
            state.parsedCSVFile = parsedNewCSVFiles;
          });
        },

        resetProcess: () => {
          set((state) => {
            state.rawCSVFile = null;
            state.parsedCSVFile = null;
            state.fileName = "";
            state.currentStep = 0;
            state.daysToPredict = 7;
            state.predictions = [];
            state.graph = "";
          });
        },

        setFileName: (fileName: string) => {
          set((state) => {
            state.fileName = fileName;
          });
        },

        setCurrentStep: (step: number) => {
          set((state) => {
            state.currentStep = step;
          });
        },

        setDaysToPredict: (day: number) => {
          set((state) => {
            state.daysToPredict = day;
          });
        },

        setPredictions: (
          predictions: IPredictSuccessResponse["predictions"],
        ) => {
          set((state) => {
            state.predictions = predictions;
          });
        },

        setGraph: (graph: string) => {
          set((state) => {
            state.graph = graph;
          });
        },
      }),
      { name: "pp-app", storage: createJSONStorage(() => localStorage) },
    ),
  ),
);
