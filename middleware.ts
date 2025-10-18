import { NextResponse, NextRequest } from "next/server";
import { prisma } from "./lib/clients/prisma";
import { redis } from "./lib/clients/redis";

export default async function middleware(request: NextRequest) {
  // OTP PAGE
  if (request.nextUrl.pathname.startsWith("/auth/otp-verification")) {
    const email = request.nextUrl.searchParams.get("email")?.concat(".com");
    console.log(email);
    const checkID = await prisma.pendingUsers.findUnique({
      where: { email },
      select: { id: true },
    });
    if (!checkID) {
      return NextResponse.redirect(new URL("/auth/signup", request.url));
    }
    return NextResponse.next();
  }

  // DASHBOARD
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    const requestToken = request.cookies.get("SID")?.value;
    const requestEmail = request.cookies.get("email")?.value;
    if (!requestToken || !requestEmail) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
    const userExist = await prisma.verifiedUsers.findUnique({
      where: { email: requestEmail },
      select: { id: true },
    });
    if (!redis.isOpen) await redis.connect();
    const issuedToken = await redis.get(`SekvoSID:${requestEmail}`);
    const tokenExpired = await redis.ttl(`SekvoSID:${requestEmail}`);
    if (
      !issuedToken ||
      issuedToken !== requestToken ||
      !userExist ||
      tokenExpired === -1 ||
      tokenExpired === -2
    ) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
    return NextResponse.next();
  }

  if (request.nextUrl.pathname.startsWith("/auth/login")) {
    const requestToken = request.cookies.get("SID")?.value;
    const requestEmail = request.cookies.get("email")?.value;
    if (!requestToken || !requestEmail) {
      return NextResponse.next();
    }
    const userExist = await prisma.verifiedUsers.findUnique({
      where: { email: requestEmail },
      select: { id: true },
    });
    if (!redis.isOpen) await redis.connect();
    const issuedToken = await redis.get(`SekvoSID:${requestEmail}`);
    const tokenExpired = await redis.ttl(`SekvoSID:${requestEmail}`);
    if (
      !issuedToken ||
      issuedToken !== requestToken ||
      !userExist ||
      tokenExpired === -1 ||
      tokenExpired === -2
    ) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/auth/otp-verification/:path*",
    "/dashboard/:path*",
    "/auth/login/:path*",
  ],
  runtime: "nodejs",
};
