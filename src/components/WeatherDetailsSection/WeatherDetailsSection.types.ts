import { CurrentConditions, ForecastData } from "@/stores/weather-search/types";

export interface WeatherDetailsSectionProps {
  current: CurrentConditions;

  forecast: ForecastData;
}
