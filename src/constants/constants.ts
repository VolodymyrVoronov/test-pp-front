export const PATHS = {
  ROOT: "/",
  REGISTER: "/register",
  LOGIN: "/login",
  VERIFY: "/verify",
  MAIN: "/main",
} as const;

export const ROUTES = {
  ROOT: PATHS.ROOT,
  REGISTER: PATHS.REGISTER,
  LOGIN: PATHS.LOGIN,
  VERIFY: PATHS.VERIFY,
  MAIN: PATHS.MAIN,
} as const;

export const API_URL = "http://localhost:8080";
