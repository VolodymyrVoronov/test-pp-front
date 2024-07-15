import axios, { AxiosError } from "axios";

import {
  ILoginErrorResponse,
  ILoginSuccessResponse,
  IRegisterErrorResponse,
  IRegisterSuccessResponse,
  IUserData,
  LoginResult,
  RegisterResult,
} from "../types/types";

export const authApi = axios.create({
  baseURL: "http://localhost:8080",
});

export const register = async (data: IUserData): Promise<RegisterResult> => {
  try {
    const response = await authApi.post<IRegisterSuccessResponse>(
      "/auth/register",
      data,
    );

    return { success: true, data: response.data };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<IRegisterErrorResponse>;

      if (axiosError.response?.data) {
        return { success: false, error: axiosError.response.data };
      }
    }

    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
};

export const login = async (data: IUserData): Promise<LoginResult> => {
  try {
    const response = await authApi.post<ILoginSuccessResponse>(
      "/auth/login",
      data,
    );
    document.cookie = `token=${response.data.token}; path=/`;

    return { success: true, data: response.data };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ILoginErrorResponse>;

      if (axiosError.response?.data) {
        return { success: false, error: axiosError.response.data };
      }
    }

    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
};

export const verify = async (data: string) => {
  try {
    const response = await authApi.get(`/auth/verify?otp=${data}`, {
      withCredentials: true,
    });

    if (response.status === 200) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
};
