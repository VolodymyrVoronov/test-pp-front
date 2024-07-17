import axios, { AxiosError } from "axios";

import { API_URL } from "../constants/constants";
import {
  IPredictErrorResponse,
  IPredictSuccessResponse,
  IStockData,
  PredictResult,
} from "../types/types";

export const authApi = axios.create({
  baseURL: API_URL,
});

export const predict = async (
  data: IStockData,
  days: number,
): Promise<PredictResult> => {
  try {
    const response = await authApi.post<IPredictSuccessResponse>(
      `/pp/predict?days=${days}`,
      data,
    );

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<IPredictErrorResponse>;
      if (axiosError.response?.data) {
        return { success: false, error: axiosError.response.data };
      } else {
        return { success: false, error: "An unknown error occurred" };
      }
    }

    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
};
