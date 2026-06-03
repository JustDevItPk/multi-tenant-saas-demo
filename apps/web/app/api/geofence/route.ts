import { prisma } from "../../../lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { lat, lng } = await request.json();

    const result = await prisma.$queryRaw<
      { inside: boolean }[]
    >`
      SELECT ST_Contains(
        ST_GeomFromText(
          'POLYGON((0 0, 0 10, 10 10, 10 0, 0 0))',
          4326
        ),
        ST_SetSRID(
          ST_MakePoint(${lng}, ${lat}),
          4326
        )
      ) AS inside;
    `;

    return NextResponse.json({
      inside: result[0]?.inside ?? false,
    });
  } catch (error) {
    console.error("Geofence error:", error);

    return NextResponse.json(
      {
        error: String(error),
      },
      { status: 500 }
    );
  }
}