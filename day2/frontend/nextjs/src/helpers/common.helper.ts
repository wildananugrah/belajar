import { AxiosError } from "axios";

export function errorHandler(error: any, setErrorMessage: any) {
  if (error instanceof AxiosError) {
    setErrorMessage(error.response?.data.message);
    return;
  }
  setErrorMessage(error.message);
}
