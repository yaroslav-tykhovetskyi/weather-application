import { CurrentConditions, Location } from "@/stores/weather-search/types";

export interface CurrentWeatherSectionProps {
  current: CurrentConditions;

  location: Location;
}
