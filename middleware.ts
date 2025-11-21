import { NextResponse, NextRequest } from "next/server";
import { prisma } from "./lib/clients/prisma";
import { redis } from "./lib/clients/redis";

export default async function middleware(request: NextRequest) {
  // DASHBOARD
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    const requestToken = request.cookies.get("SID")?.value;
    const requestEmail = request.cookies.get("email")?.value;
    if (!requestToken || !requestEmail) {
      console.log("No token | Email");
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
    const userExist = await prisma.verifiedUsers.findUnique({
      where: { email: requestEmail },
      select: { id: true },
    });
    if (!userExist) {
      console.log("user does not exist");
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
    if (!redis.isOpen) await redis.connect();
    const issuedToken = await redis.get(`SekvoSID:${requestEmail}`);
    const tokenExpired = await redis.ttl(`SekvoSID:${requestEmail}`);
    if (
      !issuedToken ||
      issuedToken !== requestToken ||
      tokenExpired === -1 ||
      tokenExpired === -2
    ) {
      if (!issuedToken) {
        console.log("No redis token found");
      }
      if (issuedToken !== requestToken) {
        console.log("Issued token and cookie token mismatch");
        console.log(
          `issued token:${issuedToken}|`,
          `requesttoken:${requestToken}`
        );
      }
      if (tokenExpired === -1) {
        console.log("Issued token has no expiration");
      }
      if (tokenExpired === -2) {
        console.log("Issued token expired");
      }
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
    return NextResponse.next();
  }

  // LOGIN
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
    // "/auth/otp-verification/:path*",
    "/dashboard/:path*",
    "/auth/login/:path*",
  ],
  runtime: "nodejs",
};
