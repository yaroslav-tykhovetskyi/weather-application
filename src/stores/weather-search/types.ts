export interface ForecastDay {
  date: string;
  day: {
    condition: {
      icon: string;
      text: string;
    };
    maxtemp_c: number;
    mintemp_c: number;
  };
  astro: {
    sunrise: string;
    sunset: string;
  };
}

export interface ForecastData {
  forecastday: ForecastDay[];
}

export interface Location {
  name: string;
  region?: string;
  country: string;
}

export interface CurrentConditions {
  wind_mph: number;
  humidity: number;
  wind_dir: string;
  pressure_mb: number;
  feelslike_c: number;
  vis_km: number;
  temp_c: number;
  condition: {
    icon: string;
    text: string;
  };
}

export interface WeatherApiResponse {
  current: CurrentConditions;
  forecast: ForecastData;
  location: Location;
}

export interface WeatherSearchStore {
  searchQuery?: string;
  searchResults?: WeatherApiResponse;
  isFetching: boolean;
  isError: boolean;
}
