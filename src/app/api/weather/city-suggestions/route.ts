import { NextRequest, NextResponse } from "next/server";

export type Location = {
  id: number;
  lat: number;
  lan: number;
  name: string;
  region: string;
  country: string;
  tz_id: string;
  localtime_epoch: number;
  localtime: string;
};

export async function GET(req: NextRequest) {
  const query = new URL(req.url).searchParams.get("query");
  const apiKey = process.env.WEATHER_API_KEY;

  const weatherApiResponse = await fetch(
    `http://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${query}`,
    {
      next: {
        revalidate: false,
      },
    }
  );

  const weatherApiResponseBody = await weatherApiResponse.json();

  return NextResponse.json(weatherApiResponseBody);
}
