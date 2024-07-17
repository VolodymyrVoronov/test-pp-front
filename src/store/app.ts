import Papa from "papaparse";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { IParsedCSVFile } from "../types/types";

export interface IAppStore {
  rawCSVFile: string | null;
  parsedCSVFile: IParsedCSVFile | null;
  fileName: string;
  currentStep: number;
  daysToPredict: number;
}

export interface IAppActions {
  setCSVFile: (file: string) => void;
  resetCSVFile: () => void;
  setFileName: (fileName: string) => void;
  setCurrentStep: (step: number) => void;
  setDaysToPredict: (day: number) => void;
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

        resetCSVFile: () => {
          set((state) => {
            state.rawCSVFile = null;
            state.parsedCSVFile = null;
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
      }),
      { name: "pp-app", storage: createJSONStorage(() => localStorage) },
    ),
  ),
);
