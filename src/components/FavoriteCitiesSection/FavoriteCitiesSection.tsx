import {
  selectAreFavoriteCitiesLoading,
  selectFavoriteCities,
} from "@/stores/favorite-cities/selectors";
import { useAppSelector } from "@/stores/hooks";
import Link from "next/link";
import { useCallback } from "react";

const FavoriteCitiesSection = () => {
  const favoriteCities = useAppSelector(selectFavoriteCities);
  const areFavoriteCitiesLoading = useAppSelector(
    selectAreFavoriteCitiesLoading
  );

  const renderFavoriteCities = () => {
    return (
      <>
        {favoriteCities.map((city) => (
          <div
            className="bg-white/25 p-5 rounded-xl flex flex-row justify-between items-center"
            key={city.id}
          >
            <p className="text-white text-lg">{city.cityName}</p>
            <Link
              className="bg-white/25 hover:bg-black/25 active:bg-black/50 px-5 py-2 rounded-xl text-white font-semibold"
              href={`/weather-details?location=${city.cityName}`}
            >
              Details...
            </Link>
          </div>
        ))}
      </>
    );
  };

  const renderFavoriteCitiesSkeletons = useCallback(() => {
    return (
      <>
        {[{}, {}, {}, {}, {}].map((item, index) => (
          <div
            className="bg-white/25 h-[50px] p-5 rounded-xl flex flex-row justify-between items-center"
            key={index}
          >
            <div className="bg-black/25 rounded-xl h-[20px] w-[75%]"></div>
          </div>
        ))}
      </>
    );
  }, []);

  return (
    <div>
      <h2 className="text-2xl text-white">Favorite cities:</h2>
      <div className="flex flex-col gap-5 mt-10">
        {areFavoriteCitiesLoading
          ? renderFavoriteCitiesSkeletons()
          : renderFavoriteCities()}
      </div>
    </div>
  );
};

export default FavoriteCitiesSection;
