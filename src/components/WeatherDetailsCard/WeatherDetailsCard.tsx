import { memo } from "react";
import { WeatherDetailsCardProps } from "./WeatherDetailsCard.types";

const WeatherDetailsCard = memo(
  ({ heading, text }: WeatherDetailsCardProps) => {
    return (
      <div className="bg-white/50 flex p-4 items-center justify-center gap-6 rounded-xl">
        <div className="text-2xl">
          <h3>{heading}</h3>
          <h3 className="text-white bg-black/25 rounded-xl mt-1">{text}</h3>
        </div>
      </div>
    );
  }
);

export default WeatherDetailsCard;
