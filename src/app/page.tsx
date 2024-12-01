"use client";

import CurrentWeatherSection from "@/components/CurrentWeatherSection/CurrentWeatherSection";
import WeatherForecastSection from "@/components/WeatherForecastSection/WeatherForecastSection";
import WeatherSearchPanel from "@/components/WeatherSearchPanel/WeatherSearchPanel";
import { useAppSelector } from "@/stores/hooks";
import {
  selectIsWeatherSearchLoading,
  selectSearchResult,
} from "@/stores/weather-search/selectors";
import {
  clearWeatherSearchResults,
  fetchWeather,
} from "@/stores/weather-search/weather-search.slice";
import { formatFullLocationName } from "@/utils/formatter";
import Link from "next/link";
import { useEffect } from "react";
import { MdArrowForwardIos } from "react-icons/md";
import { useDispatch } from "react-redux";

export default function HomePage() {
  const searchResult = useAppSelector(selectSearchResult);
  const isWeatherFetchInProgress = useAppSelector(selectIsWeatherSearchLoading);

  const dispatch = useDispatch();

  const handleSearchClick = (inputValue: string | null) => {
    if (inputValue && inputValue.length > 0) {
      dispatch(fetchWeather(inputValue));
    }
  };

  useEffect(() => {
    return () => {
      dispatch(clearWeatherSearchResults());
    };
  }, [dispatch]);

  return (
    <div className="flex flex-col">
      <WeatherSearchPanel
        handleSearchClick={handleSearchClick}
        isDisabled={isWeatherFetchInProgress}
      />
      {searchResult && (
        <>
          <h1 className="text-white text-3xl ml-12 mt-10">
            Brief weather forecast for{" "}
            <span className="italic font-bold">
              {formatFullLocationName(
                searchResult.location.name,
                searchResult.location.region,
                searchResult.location.country
              )}
            </span>
          </h1>
          <div className="flex md:flex-row flex-col p-12 items-center md:items-start justify-between gap-10">
            <CurrentWeatherSection
              current={searchResult.current}
              location={searchResult.location}
            />
            <WeatherForecastSection
              forecast={searchResult.forecast?.forecastday.slice(0, 3) || []}
            />
          </div>
          <Link
            href={`/weather-details?location=${searchResult.location?.name}${
              searchResult.location?.region &&
              `, ${searchResult.location?.region}`
            }${
              searchResult.location?.country &&
              `, ${searchResult.location?.country}`
            }`}
            className="flex flex-row items-center gap-3 bg-white/25 hover:bg-black/25 active:bg-black/50 mx-auto px-10 py-5 rounded-xl mb-10"
          >
            <p>View detailed forecast</p>
            <MdArrowForwardIos />
          </Link>
        </>
      )}
    </div>
  );
}
