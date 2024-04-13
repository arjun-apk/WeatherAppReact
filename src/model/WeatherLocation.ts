export interface WeatherLocation {
  id: string;
  location: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  localTime: Date;
  lastUpdated: Date;
  tempC: number;
  tempF: number;
  isDay: number;
  conditionText: string;
  conditionIcon: string;
  conditionCode: number;
}
