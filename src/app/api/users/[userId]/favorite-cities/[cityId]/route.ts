import { RemoveFavoriteCityDto } from "@/stores/favorite-cities/types";
import prisma from "@/utils/db/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<RemoveFavoriteCityDto> }
) {
  const { cityId } = await params;

  try {
    await prisma.favoriteCity.delete({
      where: {
        id: cityId,
      },
    });

    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    console.error("Error deleting favorite city", error);
    return NextResponse.json(
      { error: "An error occurred while deleting favorite city" },
      { status: 500 }
    );
  }
}
