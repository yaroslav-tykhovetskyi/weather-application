import { UserStore } from "./user/types";
import { WeatherSearchStore } from "./weather-search/types";

export interface RootStore {
  weatherSearch: WeatherSearchStore;
  user: UserStore;
}
