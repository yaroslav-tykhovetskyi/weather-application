import { memo } from "react";
import { WeatherForecastSectionProps } from "./WeatherForecastSection.types";
import Image from "next/image";

const WeatherForecastSection = memo(
  ({ forecast }: WeatherForecastSectionProps) => {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full">
        {forecast.map((day, index) => {
          return (
            <div
              key={index}
              className="bg-white/40 p-2 text-center rounded-lg flex flex-col items-center font-semibold gap-4"
            >
              <p className="italic">
                {new Date(day.date).toLocaleString("en-US", {
                  weekday: "short",
                })}
              </p>
              <Image
                src={`https:${day.day.condition.icon}`}
                width={50}
                height={50}
                alt={day.day.condition.text}
              />
              <div>
                <p className="bg-black/25 px-2 italic rounded-xl text-white mb-2">
                  High: {day.day.maxtemp_c} °C
                </p>
                <p className="bg-black/25 px-2 italic rounded-xl text-white">
                  Low: {day.day.mintemp_c} °C
                </p>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
);

export default WeatherForecastSection;
