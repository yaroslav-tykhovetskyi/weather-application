import { CurrentConditions } from "@/stores/weather-search/types";
import {
  SuggestionData,
  SUGGESTIONS_REGISTRY,
  SuggestionType,
} from "./CurrentWeatherSection.constants";

export const pickSuggestion = (
  currentConditions: CurrentConditions
): SuggestionData | null => {
  if (currentConditions.temp_c > 25) {
    return SUGGESTIONS_REGISTRY[SuggestionType.SUNNY];
  }
  if (currentConditions.temp_c < 10) {
    return SUGGESTIONS_REGISTRY[SuggestionType.COLD];
  }
  if (currentConditions.condition.text.includes("rain")) {
    return SUGGESTIONS_REGISTRY[SuggestionType.RAINING];
  }

  return null;
};
