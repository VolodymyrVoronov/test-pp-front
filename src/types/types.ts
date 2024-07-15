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
}

export interface ILoginErrorResponse {
  error: string;
}

export type LoginResult =
  | { success: true; data: ILoginSuccessResponse }
  | { success: false; error: ILoginErrorResponse | string };
