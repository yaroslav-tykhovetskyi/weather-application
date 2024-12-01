import { memo } from "react";
import { WeatherDetailsSectionProps } from "./WeatherDetailsSection.types";
import WeatherDetailsCard from "../WeatherDetailsCard/WeatherDetailsCard";

const WeatherDetailsSection = memo(
  ({ current, forecast }: WeatherDetailsSectionProps) => {
    return (
      <div className="p-12">
        <h1 className="mb-4 text-2xl text-white italic font-bold">
          Weather Details
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-center italic font-bold">
          <WeatherDetailsCard
            heading="Wind speed"
            text={`${current.wind_mph} mph`}
          />
          <WeatherDetailsCard
            heading="Humidity"
            text={`${current.humidity}%`}
          />
          <WeatherDetailsCard
            heading="Wind Direction"
            text={current.wind_dir}
          />
          <WeatherDetailsCard
            heading="Sunrise"
            text={forecast.forecastday[0]?.astro.sunrise}
          />
          <WeatherDetailsCard
            heading="Sunset"
            text={forecast.forecastday[0]?.astro.sunset}
          />
          <WeatherDetailsCard
            heading="Air Pressure"
            text={`${current.pressure_mb} hPa`}
          />
          <WeatherDetailsCard
            heading="Feels Like"
            text={`${current.feelslike_c}°C`}
          />
          <WeatherDetailsCard
            heading="Visibility"
            text={`${current.vis_km} km`}
          />
        </div>
      </div>
    );
  }
);

export default WeatherDetailsSection;
