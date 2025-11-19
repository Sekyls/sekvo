"use server";
import { connectRedis, redis } from "@/lib/clients/redis";
import { SESSION_EXPIRATION } from "@/lib/misc/constants";
import { randomBytes } from "crypto";
import { cookies } from "next/headers";

export async function createUserSession(userEmail: string, userID: string) {
  const sessionID = randomBytes(512).toString("hex");
  await connectRedis();
  await redis.set(`SekvoSID:${userEmail}`, sessionID, {
    expiration: { type: "EX", value: SESSION_EXPIRATION },
  });
  return { sessionID };
}

export async function deleteUserSession() {
  const cookieStore = await cookies();
  const userEmail = cookieStore.get("email")?.value;
  const hasSessionCookie = cookieStore.get("SID")?.value;
  if (!hasSessionCookie || !userEmail) {
    throw new Error("Forbidden");
  }
  await connectRedis();
  await redis.del(`SekvoSID:${userEmail}`);
}
