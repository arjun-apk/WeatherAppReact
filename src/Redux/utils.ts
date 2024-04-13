export const API_URL = process.env.REACT_APP_API_URL + "/api";

export interface ApiResponse<T> {
  status: boolean;
  data: T;
  resultCode: number;
  message: string;
}
