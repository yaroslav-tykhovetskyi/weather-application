import { Location } from "@/stores/weather-search/types";

export interface CitySuggestionsListProps {
  isLoading: boolean;
  citySuggestions: Location[];
  onSuggestionPress: (location: Location) => void;
}
