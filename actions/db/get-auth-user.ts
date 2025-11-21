"use server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/clients/prisma";
import { UserAuth } from "@/lib/misc/types";
import { uint8ArrayToDataURL } from "@/lib/misc/utils";
import { redis } from "@/lib/clients/redis";

export async function getUserAuthStatus(): Promise<UserAuth> {
  let loggedIn: boolean;
  const email = (await cookies()).get("email")?.value;
  const token = (await cookies()).get("SID")?.value;

  if (!email) {
    loggedIn = false;
    return { loggedIn, user: null };
  }
  const user = await prisma.verifiedUsers.findUnique({
    where: { email },
    omit: { createdAt: true, hashedPassword: true, updatedAt: true },
  });
  if (!user) {
    loggedIn = false;
    return { loggedIn, user: null };
  }
  if (!redis.isOpen) await redis.connect();
  const issuedToken = await redis.get(`SekvoSID:${user.email}`);
  const tokenExpired = await redis.ttl(`SekvoSID:${user.email}`);
  if (
    !issuedToken ||
    issuedToken !== token ||
    tokenExpired === -1 ||
    tokenExpired === -2
  ) {
    loggedIn = false;

    return { loggedIn, user: null };
  }
  loggedIn = true;
  return {
    loggedIn,
    user: { ...user, logo: user.logo ? uint8ArrayToDataURL(user.logo) : null },
  };
}
