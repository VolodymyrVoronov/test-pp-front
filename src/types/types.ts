export interface IUserData {
  username: string;
  password: string;
}

export type FormType = "register" | "login";

export interface IRegisterSuccessResponse {
  secret: string;
}

export interface IRegisterErrorResponse {
  error: string;
}

export type RegisterResult =
  | { success: true; data: IRegisterSuccessResponse }
  | { success: false; error: IRegisterErrorResponse | string };

export interface ILoginSuccessResponse {
  token: string;
  otp: string;
}

export interface ILoginErrorResponse {
  error: string;
}

export type LoginResult =
  | { success: true; data: ILoginSuccessResponse }
  | { success: false; error: ILoginErrorResponse | string };

export interface IVerifySuccessResponse {
  message: string;
  username: string;
}

export interface IVerifyErrorResponse {
  error: string;
}

export type VerifyResult =
  | { success: true; data: IVerifySuccessResponse }
  | { success: false; error: IVerifyErrorResponse | string };

export interface ICheckAuthSuccessResponse {
  message: string;
}

export interface ICheckAuthErrorResponse {
  error: string;
}

export type CheckAuthResult =
  | { success: true; data: ICheckAuthSuccessResponse }
  | { success: false; error: ICheckAuthErrorResponse | string };

export interface IParsedCSVFile {
  meta: {
    fields: string[];
  };
  data: {
    [key: string]: string;
  }[];
}

export interface IStep {
  stepName: string;
  stepComponent: JSX.Element;
}
