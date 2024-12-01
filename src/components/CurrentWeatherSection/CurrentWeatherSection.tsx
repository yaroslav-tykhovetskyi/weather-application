import { MdLocationOn } from "react-icons/md";
import { formatFullLocationName } from "../WeatherSearchPanel/WeatherSearchPanel.utils";
import { pickSuggestion } from "./CurrentWeatherSection.utils";
import { MdAutoFixHigh } from "react-icons/md";
import { CurrentWeatherSectionProps } from "./CurrentWeatherSection.types";
import Image from "next/image";

const CurrentWeatherSection = ({
  current,
  location,
}: CurrentWeatherSectionProps) => {
  const weatherIcon = current.condition.icon || null;
  const currentDate = new Date();

  const renderPersonalRecommendation = () => {
    const recommendation = pickSuggestion(current);

    if (!recommendation) {
      return;
    }

    return (
      <div className="flex flex-row gap-2 items-center w-full  text-black bg-white/90 p-2 rounded-xl">
        <MdAutoFixHigh />
        {recommendation.suggestionText}
      </div>
    );
  };

  if (!current) {
    return <h1>error</h1>;
  }

  return (
    <div className="flex flex-col mb-8 md: mb-0 items-start gap-2 bg-black/25 p-6 rounded-xl h-fit">
      <div className="flex items-center">
        <div>
          <h1 className="text-3xl text-white">Today</h1>
          <p className="text-white">{currentDate.toLocaleDateString()}</p>
        </div>
        {weatherIcon && (
          <Image
            width={50}
            height={50}
            src={`https:${weatherIcon}`}
            alt="Weather Icon"
          />
        )}
      </div>
      <div>
        <p className="text-5xl text-white">{current.temp_c}°C</p>
        <span className="text-white">{current.condition.text}</span>
      </div>
      <div className="flex flex-row gap-2 w-full items-center text-black bg-white/90 p-2 rounded-xl">
        <MdLocationOn />
        <span>
          {formatFullLocationName(
            location.name,
            location.region,
            location.country
          )}
        </span>
      </div>
      {renderPersonalRecommendation()}
    </div>
  );
};

export default CurrentWeatherSection;
