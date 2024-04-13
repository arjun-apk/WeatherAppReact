import { createAsyncThunk } from "@reduxjs/toolkit";
import { WeatherLocation } from "../../model/WeatherLocation";
import { ApiResponse, API_URL } from "../utils";
import axios from "axios";

export const WeatherLocationList = createAsyncThunk<
  ApiResponse<WeatherLocation[] | null>
>("WeatherLocation/get", async () => {
  try {
    const response = await axios.get(`${API_URL}/WeatherLocation`);
    return response.data;
  } catch (error: any) {
    return error.response.data as ApiResponse<null>;
  }
});

export const CreateWeatherLocation = createAsyncThunk<
  ApiResponse<boolean | null>,
  string
>("WeatherLocation/create", async (location) => {
  try {
    const response = await axios.post(
      `${API_URL}/WeatherLocation?locationName=${location}`
    );
    return response.data;
  } catch (error: any) {
    return error.response.data as ApiResponse<null>;
  }
});

export const DeleteWeatherLocation = createAsyncThunk<
  ApiResponse<boolean | null>,
  string
>("WeatherLocation/delete", async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/WeatherLocation?id=${id}`);
    return response.data;
  } catch (error: any) {
    return error.response.data as ApiResponse<null>;
  }
});
