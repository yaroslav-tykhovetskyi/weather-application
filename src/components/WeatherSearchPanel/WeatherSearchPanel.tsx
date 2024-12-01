"use client";

import { useDebounce } from "@/hooks/useDebounce/useDebounce";
import { useCallback, useEffect, useRef, useState } from "react";
import { useAppSelector } from "@/stores/hooks";
import { selectSearchQuery } from "@/stores/weather-search/selectors";
import { Location } from "@/stores/weather-search/types";
import SearchInput from "../WeatherSearchInput/WeatherSearchInput";
import { WeatherSearchPanelProps } from "./WeatherSearchPanel.types";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "@/stores/weather-search/weather-search.slice";
import CitySuggestionsList from "../CitySuggestionsList/CitySuggestionsList";
import { SEARCH_DEBOUNCE_TIMEOUT } from "./WeatherSearchPanel.constants";

const WeatherSearchPanel: React.FC<WeatherSearchPanelProps> = ({
  handleSearchClick,
  isDisabled = false,
}) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const searchQuery = useAppSelector(selectSearchQuery);

  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState<string>(searchQuery || "");
  const [isSuggestionsPanelShown, setIsSuggestionsPanelShown] =
    useState<boolean>(false);
  const [areCitySuggestionsLoading, setAreCitySuggestionsLoading] =
    useState<boolean>(false);

  const debouncedInput = useDebounce<string | null>(
    searchText,
    SEARCH_DEBOUNCE_TIMEOUT
  );

  const [citySuggestions, setCitySuggestions] = useState<Location[]>([]);

  const fetchCitySuggestions = useCallback(async () => {
    setAreCitySuggestionsLoading(true);

    const data = await fetch(
      `/api/weather/city-suggestions?query=${debouncedInput}`
    );

    const responseBody: Location[] = await data.json();

    setCitySuggestions(responseBody);

    setAreCitySuggestionsLoading(false);
  }, [debouncedInput]);

  const onInputChange = (newValue: string) => {
    setSearchText(newValue);
  };

  const onCitySuggestionPress = (clickedLocation: Location) => {
    const searchQuery = `${clickedLocation.name}${
      clickedLocation.region && `, ${clickedLocation.region}`
    }${clickedLocation.country && `, ${clickedLocation.country}`}`;

    setSearchText(searchQuery);
    setIsSuggestionsPanelShown(false);
  };

  const onSearchClick = () => {
    handleSearchClick(debouncedInput);
  };

  const renderCitySuggestions = () => {
    return (
      <CitySuggestionsList
        onSuggestionPress={onCitySuggestionPress}
        citySuggestions={citySuggestions}
        isLoading={areCitySuggestionsLoading}
      />
    );
  };

  useEffect(() => {
    if (debouncedInput !== null) {
      dispatch(setSearchQuery(debouncedInput));
    }

    if (debouncedInput && debouncedInput.length >= 3) {
      fetchCitySuggestions();
    }
  }, [dispatch, fetchCitySuggestions, debouncedInput]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node)
      ) {
        setIsSuggestionsPanelShown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [panelRef]);

  return (
    <div className="flex flex-row justify-center" ref={panelRef}>
      <div className="relative w-[70%] md:w-[400px]">
        <SearchInput
          isDisabled={isDisabled}
          searchText={searchText}
          onChange={onInputChange}
          placeholder="Search"
          onFocus={() => setIsSuggestionsPanelShown(true)}
          handleSearch={onSearchClick}
        />
        {isSuggestionsPanelShown && renderCitySuggestions()}
      </div>
    </div>
  );
};

export default WeatherSearchPanel;
