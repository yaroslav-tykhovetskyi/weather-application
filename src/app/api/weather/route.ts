import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const query = new URL(req.url).searchParams.get("query");
  const apiKey = process.env.WEATHER_API_KEY;

  const weatherApiResponse = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${query}&days=7`
  );

  const weatherApiResponseBody = await weatherApiResponse.json();
  return NextResponse.json(weatherApiResponseBody);
}
