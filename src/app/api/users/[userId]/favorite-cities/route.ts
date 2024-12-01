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
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  const { userId } = await params;
  const { cityName } = await req.json();

  if (!cityName) {
    return NextResponse.json(
      { errorMessage: "Missing required parameters to save favorite city" },
      { status: 400 }
    );
  }
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
}
