import { useCallback, useEffect, useState } from "react";
import { Location } from "@/stores/weather-search/types";

export const useCitySuggestions = (debouncedInput: string | null) => {
  const [citySuggestions, setCitySuggestions] = useState<Location[]>([]);
  const [areCitySuggestionsLoading, setAreCitySuggestionsLoading] =
    useState<boolean>(false);

  const fetchCitySuggestions = useCallback(async () => {
    if (!debouncedInput || debouncedInput.length < 3) return;

    setAreCitySuggestionsLoading(true);
    try {
      const data = await fetch(
        `/api/weather/city-suggestions?query=${debouncedInput}`
      );
      const responseBody: Location[] = await data.json();
      setCitySuggestions(responseBody);
    } catch (error) {
      console.error("Failed to fetch city suggestions:", error);
    } finally {
      setAreCitySuggestionsLoading(false);
    }
  }, [debouncedInput]);

  useEffect(() => {
    fetchCitySuggestions();
  }, [fetchCitySuggestions]);

  return { citySuggestions, areCitySuggestionsLoading };
};
