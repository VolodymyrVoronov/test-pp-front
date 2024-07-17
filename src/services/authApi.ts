import axios, { AxiosError } from "axios";

import { API_URL } from "../constants/constants";
import {
  CheckAuthResult,
  ICheckAuthErrorResponse,
  ICheckAuthSuccessResponse,
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
  baseURL: API_URL,
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

export const checkAuth = async (): Promise<CheckAuthResult> => {
  try {
    const response = await authApi.get<ICheckAuthSuccessResponse>(
      "/auth/check-auth",
      {
        withCredentials: true,
      },
    );

    return { success: true, data: response.data };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ICheckAuthErrorResponse>;

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

export const logout = async (): Promise<void> => {
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  localStorage.removeItem("pp-user");
};

export const isAuthenticated = (): boolean => {
  const token = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith("token="))
    ?.split("=")[1];

  return !!token;
};
