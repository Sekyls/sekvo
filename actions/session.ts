"use server";
import { connectRedis, redis } from "@/lib/clients/redis";
import { SESSION_EXPIRATION } from "@/lib/constants";
import { randomBytes } from "crypto";
export default async function createUserSession(
  userEmail: string,
  userID: string
) {
  try {
    const sessionID = randomBytes(512).toString("hex");
    await connectRedis();
    await redis.set(
      `SekvoSID:${sessionID}`,
      JSON.stringify({ sessionID, userEmail, userID }),
      { expiration: { type: "EX", value: SESSION_EXPIRATION } }
    );
    return { sessionID };
  } catch (error) {
    throw error;
  }
}
