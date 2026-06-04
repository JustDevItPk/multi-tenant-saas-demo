import { NextRequest, NextResponse } from "next/server";

const mockRedisTenants = {
  tenant1: {
    id: "tenant-1",
    name: "Tenant One",
  },
  tenant2: {
    id: "tenant-2",
    name: "Tenant Two",
  },
};

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") || "";

  // Allow localhost and all Vercel domains
  if (
    host.includes("localhost") ||
    host.includes("vercel.app")
  ) {
    return NextResponse.next();
  }

  const subdomain = host.split(".")[0];

  const tenant =
    mockRedisTenants[subdomain as keyof typeof mockRedisTenants];

  if (!tenant) {
    return NextResponse.json(
      { error: "Tenant not found" },
      { status: 404 }
    );
  }

  const requestHeaders = new Headers(request.headers);

  requestHeaders.set("x-tenant-id", tenant.id);
  requestHeaders.set("x-tenant-name", tenant.name);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ["/((?!api|_next|favicon.ico).*)"],
};