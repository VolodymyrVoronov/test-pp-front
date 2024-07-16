import Papa from "papaparse";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { IParsedCSVFile } from "../types/types";

export interface IAppStore {
  rawCSVFile: string | null;
  parsedCSVFile: IParsedCSVFile | null;
  fileName: string;
  currentStep: number;
}

export interface IAppActions {
  setCSVFile: (file: string) => void;
  resetCSVFile: () => void;
  setFileName: (file: string) => void;
  setCurrentStep: (step: number) => void;
}

export const useAppStore = create(
  immer<IAppStore & IAppActions>((set, get) => ({
    rawCSVFile: null,
    parsedCSVFile: null,
    fileName: "",
    currentStep: 0,

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

    setFileName: (file: string) => {
      set((state) => {
        state.fileName = file;
      });
    },

    setCurrentStep: (step: number) => {
      set((state) => {
        state.currentStep = step;
      });
    },
  })),
);