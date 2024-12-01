import prisma from "@/utils/db/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ userId: string; cityId: string }> }
) {
  const { cityId } = await params;

  await prisma.favoriteCity.delete({
    where: {
      id: cityId,
    },
  });

  return NextResponse.json({}, { status: 200 });
}
