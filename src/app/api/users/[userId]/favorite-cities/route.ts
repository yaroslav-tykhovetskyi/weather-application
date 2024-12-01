import {
  FavoriteCitiesResponse,
  FavoriteCity,
} from "@/stores/favorite-cities/types";
import prisma from "@/utils/db/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  const { userId } = await params;

  try {
    const favoriteCitiesFromDb: FavoriteCity[] =
      await prisma.favoriteCity.findMany({
        select: {
          id: true,
          cityName: true,
        },
        where: {
          userId: userId,
        },
      });

    return NextResponse.json<FavoriteCitiesResponse>(
      { favoriteCities: favoriteCitiesFromDb },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching favorite cities", error);
    return NextResponse.json(
      { error: "An error occurred while fetching favorite cities" },
      { status: 500 }
    );
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  const { userId } = await params;
  const { cityName } = await req.json();

  if (!cityName) {
    return NextResponse.json(
      { error: "City name is required" },
      { status: 400 }
    );
  }

  try {
    const savedCity = await prisma.favoriteCity.create({
      data: {
        cityName,
        userId,
      },
    });

    return NextResponse.json<FavoriteCity>(
      { id: savedCity.id, cityName: savedCity.cityName },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving favorite city", error);
    return NextResponse.json(
      { error: "An error occurred while saving favorite city" },
      { status: 500 }
    );
  }
}
