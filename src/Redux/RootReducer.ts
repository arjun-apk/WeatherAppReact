import { combineReducers } from "@reduxjs/toolkit";
import { WeatherLocationReducer } from "./Slices/WeatherLocationSlice";

export default combineReducers({
  weatherLocation: WeatherLocationReducer,
});
