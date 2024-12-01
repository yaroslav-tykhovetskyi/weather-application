import { WeatherDetailsSectionProps } from "./WeatherDetailsSection.types";

const WeatherDetailsSection = ({
  current,
  forecast,
}: WeatherDetailsSectionProps) => {
  return (
    <div className="p-12">
      <h1 className="mb-4 text-2xl text-white italic font-bold">
        Weather Details
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-center italic font-bold">
        <div className="bg-white/50 flex p-4 items-center justify-center gap-6 rounded-xl">
          <div className="text-2xl">
            <h3>Wind speed</h3>
            <h3
              className="text-white bg-black/25 rounded-xl mt-1"
              aria-label={`Wind Speed: ${current.wind_mph} mph`}
            >
              {current.wind_mph} mph
            </h3>
          </div>
        </div>

        <div className="bg-white/50 flex p-4 items-center justify-center gap-6 rounded-xl">
          <div className="text-2xl">
            <h3>Humidity</h3>
            <h3
              className="text-white bg-black/25 rounded-xl mt-1"
              aria-label={`Humidity: ${current.humidity}%`}
            >
              {current.humidity}%
            </h3>
          </div>
        </div>

        <div className="bg-white/50 flex p-4 items-center justify-center gap-6 rounded-xl">
          <div className="text-2xl">
            <h3>Wind Direction</h3>
            <h3
              className="text-white bg-black/25 rounded-xl mt-1"
              aria-label={`Wind Direction: ${current.wind_dir}`}
            >
              {current.wind_dir}
            </h3>
          </div>
        </div>

        <div className="bg-white/50 flex p-4 items-center justify-center gap-6 rounded-xl">
          <div className="text-2xl">
            <h3>Sunrise</h3>
            <h3
              className="text-white bg-black/25 rounded-xl mt-1 px-2"
              aria-label={`Sunrise: ${forecast.forecastday[0]?.astro.sunrise}`}
            >
              {forecast.forecastday[0]?.astro.sunrise}
            </h3>
          </div>
        </div>

        <div className="bg-white/50 flex p-4 items-center justify-center gap-6 rounded-xl">
          <div className="text-2xl">
            <h3>Sunset</h3>
            <h3
              className="text-white bg-black/25 rounded-xl mt-1 px-2"
              aria-label={`Sunset: ${forecast.forecastday[0]?.astro.sunset}`}
            >
              {forecast.forecastday[0]?.astro.sunset}
            </h3>
          </div>
        </div>

        <div className="bg-white/50 flex p-4 items-center justify-center gap-6 rounded-xl">
          <div className="text-2xl">
            <h3>Air Pressure</h3>
            <h3
              className="text-white bg-black/25 rounded-xl mt-1 px-2"
              aria-label={`Air Pressure: ${current.pressure_mb} hPa`}
            >
              {current.pressure_mb} hPa
            </h3>
          </div>
        </div>

        <div className="bg-white/50 flex p-4 items-center justify-center gap-6 rounded-xl">
          <div className="text-2xl">
            <h3>Feels Like</h3>
            <h3
              className="text-white bg-black/25 rounded-xl mt-1 px-2"
              aria-label={`Feels Like: ${current.feelslike_c}°C`}
            >
              {current.feelslike_c}°C
            </h3>
          </div>
        </div>

        <div className="bg-white/50 flex p-4 items-center justify-center gap-6 rounded-xl">
          <div className="text-2xl">
            <h3>Visibility</h3>
            <h3
              className="text-white bg-black/25 rounded-xl mt-1 px-2"
              aria-label={`Sunset: ${current.vis_km} km`}
            >
              {current.vis_km} km
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDetailsSection;
