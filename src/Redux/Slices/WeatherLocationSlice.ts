import { createSlice } from "@reduxjs/toolkit";
import {
  CreateWeatherLocation,
  DeleteWeatherLocation,
  WeatherLocationList,
} from "../Thunks/WeatherLocationThunk";
import { WeatherLocation } from "../../model/WeatherLocation";

interface InitialState {
  isLoading: boolean;
  list: WeatherLocation[];
}

let initialState: InitialState = {
  isLoading: false,
  list: [],
};

const WeatherLocationSlice = createSlice({
  name: "Login",
  initialState,
  reducers: {
    updateWWeatherLocation: (state, action) => {
      state.list = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(WeatherLocationList.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(WeatherLocationList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload.data ? action.payload.data : [];
      })
      .addCase(WeatherLocationList.rejected, (state, action) => {
        state.isLoading = false;
      });
    builder
      .addCase(CreateWeatherLocation.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(CreateWeatherLocation.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(CreateWeatherLocation.rejected, (state, action) => {
        state.isLoading = false;
      });
    builder
      .addCase(DeleteWeatherLocation.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(DeleteWeatherLocation.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(DeleteWeatherLocation.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const WeatherLocationReducer = WeatherLocationSlice.reducer;
export const WeatherLocationActions = WeatherLocationSlice.actions;
