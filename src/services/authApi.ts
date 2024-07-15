import axios, { AxiosError } from "axios";

import {
  ILoginErrorResponse,
  ILoginSuccessResponse,
  IRegisterErrorResponse,
  IRegisterSuccessResponse,
  IUserData,
  IVerifySuccessResponse,
  LoginResult,
  RegisterResult,
  VerifyResult,
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

export const verify = async (data: string): Promise<VerifyResult> => {
  try {
    const response = await authApi.get<IVerifySuccessResponse>(
      `/auth/verify?otp=${data}`,
      {
        withCredentials: true,
      },
    );

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
