import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db/prisma";
import bcrypt from "bcryptjs";
import { Prisma } from "@prisma/client";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({}, { status: 200 });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return NextResponse.json({}, { status: 409 });
      }
    }
    throw e;
  }
}
