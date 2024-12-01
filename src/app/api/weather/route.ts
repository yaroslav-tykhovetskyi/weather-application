import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const query = new URL(req.url).searchParams.get("query");
  const apiKey = process.env.WEATHER_API_KEY;

  if (!query) {
    return NextResponse.json(
      { error: "Search query is required" },
      { status: 400 }
    );
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
    return NextResponse.json(weatherApiResponseBody);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching weather data" },
      { status: 500 }
    );
  }
}
