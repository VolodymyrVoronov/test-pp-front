import { ParseError, ParseMeta } from "papaparse";

export interface IUserData {
  username: string;
  password: string;
}

export interface IStockData {}

export type FormType = "register" | "login";

export type SuccessOrErrorResponse<S, E> =
  | { success: true; data: S }
  | { success: false; error: E | string };

export interface IRegisterSuccessResponse {
  secret: string;
}

export interface IRegisterErrorResponse {
  error: string;
}

export type RegisterResult = SuccessOrErrorResponse<
  IRegisterSuccessResponse,
  IRegisterErrorResponse
>;

export interface ILoginSuccessResponse {
  token: string;
  otp: string;
}

export interface ILoginErrorResponse {
  error: string;
}

export type LoginResult = SuccessOrErrorResponse<
  ILoginSuccessResponse,
  ILoginErrorResponse
>;

export interface IVerifySuccessResponse {
  message: string;
  username: string;
}

export interface IVerifyErrorResponse {
  error: string;
}

export type VerifyResult = SuccessOrErrorResponse<
  IVerifySuccessResponse,
  IVerifyErrorResponse
>;

export interface ICheckAuthSuccessResponse {
  message: string;
}

export interface ICheckAuthErrorResponse {
  error: string;
}

export type CheckAuthResult = SuccessOrErrorResponse<
  ICheckAuthSuccessResponse,
  ICheckAuthErrorResponse
>;

export interface IPredictSuccessResponse {
  data: any;
}

export interface IPredictErrorResponse {
  error: string;
}

export type PredictResult = SuccessOrErrorResponse<
  IPredictSuccessResponse,
  IPredictErrorResponse
>;

export interface IParsedCSVFile {
  meta: ParseMeta;
  data: {
    [key: string]: string;
  }[];
  errors: ParseError[];
}

export interface IStep {
  stepName: string;
  stepComponent: JSX.Element;
}
