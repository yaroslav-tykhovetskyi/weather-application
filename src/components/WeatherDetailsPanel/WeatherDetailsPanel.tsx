"use client";

import {
  saveFavoriteCity,
  removeFavoriteCity,
} from "@/stores/favorite-cities/favorite-cities.slice";
import {
  selectFavoriteCities,
  selectAreFavoriteCitiesLoading,
} from "@/stores/favorite-cities/selectors";
import { useAppSelector } from "@/stores/hooks";
import { selectUserId } from "@/stores/user/selectors";
import {
  selectSearchResult,
  selectIsWeatherSearchLoading,
} from "@/stores/weather-search/selectors";
import {
  fetchWeather,
  clearWeatherSearchResults,
} from "@/stores/weather-search/weather-search.slice";
import { useSearchParams } from "next/navigation";
import { useState, useMemo, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CurrentWeatherSection from "../CurrentWeatherSection/CurrentWeatherSection";
import WeatherDetailsSection from "../WeatherDetailsSection/WeatherDetailsSection";
import WeatherForecastSection from "../WeatherForecastSection/WeatherForecastSection";
import { formatFullLocationName } from "../WeatherSearchPanel/WeatherSearchPanel.utils";

const WeatherDetailsPanel = () => {
  const favoriteCities = useAppSelector(selectFavoriteCities);
  const userId = useAppSelector(selectUserId);

  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const weatherSearchResult = useSelector(selectSearchResult);
  const isWeatherSearchResultLoading = useSelector(
    selectIsWeatherSearchLoading
  );
  const areFavoriteCitiesLoading = useSelector(selectAreFavoriteCitiesLoading);

  const [error, setError] = useState<string | null>();

  const fullLocationName = useMemo(() => {
    if (!weatherSearchResult) {
      return "";
    }

    return formatFullLocationName(
      weatherSearchResult?.location.name,
      weatherSearchResult?.location.region,
      weatherSearchResult?.location.country
    );
  }, [weatherSearchResult]);

  const isFavoriteCity = useMemo(() => {
    if (
      !weatherSearchResult ||
      !favoriteCities ||
      favoriteCities.length === 0
    ) {
      return false;
    }

    return (
      favoriteCities.filter((city) => city.cityName === fullLocationName)
        .length !== 0
    );
  }, [weatherSearchResult, favoriteCities, fullLocationName]);

  const getWeatherData = useCallback(() => {
    const location = searchParams.get("location");

    if (!location) {
      setError(
        "Required query parameter containing location was not provided,"
      );
      return;
    }

    dispatch(fetchWeather(location));
  }, [dispatch, searchParams]);

  const handleAddFavoriteCity = () => {
    if (!userId || !fullLocationName) {
      return;
    }

    dispatch(saveFavoriteCity({ userId, cityName: fullLocationName }));
  };

  const handleRemoveFavoriteCity = () => {
    if (!userId || !fullLocationName) {
      return;
    }

    const favoriteCityId = favoriteCities.filter(
      (city) => city.cityName === fullLocationName
    )[0].id;

    dispatch(removeFavoriteCity({ userId, cityId: favoriteCityId }));
  };

  const renderFavoriteCityButton = () => {
    if (!userId) {
      return;
    }

    return (
      <button
        className="bg-white/50 hover:bg-black/25 active:bg-black/50 px-5 py-2 rounded-xl disabled:text-[#808080] disabled:bg-[#808080]/50"
        onClick={
          isFavoriteCity ? handleRemoveFavoriteCity : handleAddFavoriteCity
        }
        disabled={areFavoriteCitiesLoading}
      >
        {isFavoriteCity ? "Remove from favorites" : "Add city to favorites"}
      </button>
    );
  };

  useEffect(() => {
    getWeatherData();

    return () => {
      dispatch(clearWeatherSearchResults());
    };
  }, [dispatch, getWeatherData]);

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <>
      {isWeatherSearchResultLoading || !weatherSearchResult ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <div className="flex flex-col md:flex-row mt-10 mx-12 items-center justify-between">
            <h1 className="text-white text-3xl">
              Detailed weather forecast for{" "}
              <span className="italic font-bold">
                {formatFullLocationName(
                  weatherSearchResult.location.name,
                  weatherSearchResult.location.region,
                  weatherSearchResult.location.country
                )}
              </span>
            </h1>
            {renderFavoriteCityButton()}
          </div>
          <div className="flex md:flex-row flex-col p-12 items-center md:items-start justify-between gap-10">
            <CurrentWeatherSection
              current={weatherSearchResult?.current}
              location={weatherSearchResult?.location}
            />
            <WeatherForecastSection
              forecast={weatherSearchResult?.forecast?.forecastday || []}
            />
          </div>
          <div>
            <WeatherDetailsSection
              current={weatherSearchResult.current}
              forecast={weatherSearchResult.forecast}
            />
          </div>
        </>
      )}
    </>
  );
};

export default WeatherDetailsPanel;
