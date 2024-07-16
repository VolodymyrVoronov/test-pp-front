import axios, { AxiosError } from "axios";

export const authApi = axios.create({
  baseURL: "http://localhost:8080",
});

export const predict = async (data: any) => {
  try {
    const response = await authApi.post("/pp/predict", data);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<any>;
      return axiosError.response?.data;
    }
  }
};
