import { WeatherApiResponse } from "@/stores/weather-search/types";
import { NextRequest, NextResponse } from "next/server";
import { WEATHER_DETAILS_CACHE_DURATION } from "./constants";

const cache: Record<string, { data: WeatherApiResponse; timestamp: number }> =
  {};

export async function GET(req: NextRequest) {
  const query = new URL(req.url).searchParams.get("query");
  const apiKey = process.env.WEATHER_API_KEY;

  if (!query) {
    return NextResponse.json(
      { error: "Search query is required" },
      { status: 400 }
    );
  }

  const currentTime = Date.now();

  if (
    cache[query] &&
    currentTime - cache[query].timestamp < WEATHER_DETAILS_CACHE_DURATION
  ) {
    return NextResponse.json(cache[query].data);
  }

  try {
    const weatherApiResponse = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${query}&days=7`
    );

    if (!weatherApiResponse.ok) {
      return NextResponse.json(
        { error: "Failed to fetch weather data" },
        { status: weatherApiResponse.status }
      );
    }

    const weatherApiResponseBody = await weatherApiResponse.json();

    cache[query] = {
      data: weatherApiResponseBody,
      timestamp: currentTime,
    };

    return NextResponse.json<WeatherApiResponse>(weatherApiResponseBody);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching weather data" },
      { status: 500 }
    );
  }
}
