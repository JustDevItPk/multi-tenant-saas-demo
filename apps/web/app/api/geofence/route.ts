import { prisma } from "../../../lib/prisma";
import { NextResponse } from "next/server";

// Hardcoded polygon used for the geofence demonstration. This is a
// simplification so the demo can run without external spatial files or
// complex setup. In production, use parameterized queries and proper
// validation/error handling.
export async function POST(request: Request) {
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
}