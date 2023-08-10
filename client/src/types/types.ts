import { Status } from "./enums";

export interface UsersData {
  id: number;
  email: string;
  name: string;
  status: Status;
  last_login: Date | string;
  register_time: Date | string;
}

export interface ActionsResponse {
  message: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface SignUpData {
  email: string;
  password: string;
  name: string;
}
