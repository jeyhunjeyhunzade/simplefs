import toast from "react-hot-toast";
import { AxiosError } from "axios";

export const errorHandler = (error: unknown) => {
  let message = "";

  if (error instanceof AxiosError) {
    message = error.response?.data.message;
  } else if (error instanceof Error) {
    message = error.message;
  } else {
    message = "unkown error";
  }

  toast.error(message);
};

export const successHandler = (response: { message: string }) => {
  toast.success(response.message);
};

interface AccessToken {
  token: string;
  expirationDate: Date;
}

export const checkAuth = (): boolean => {
  const accessToken = localStorage.getItem("token");
  if (!accessToken) {
    return false;
  }

  // const currentDateTime = new Date();
  // if (currentDateTime >= accessToken.expirationDate) {
  //   return false;
  // }

  return true;
};
