"use server";
import { prisma } from "@/lib/clients/prisma";
import argon2 from "argon2";
import { createUserSession } from "./session";

export async function logUserIn(email: string, password: string) {
  try {
    const userLoginsFromDB = await prisma.verifiedUsers.findUnique({
      where: {
        email,
      },
      select: {
        email: true,
        hashedPassword: true,
        id: true,
      },
    });

    if (userLoginsFromDB === null) {
      throw new Error("Email does not exist");
    }
    const passwordIsMatch = await argon2.verify(
      userLoginsFromDB.hashedPassword,
      password
    );

    if (!passwordIsMatch) {
      throw new Error("Invalid password");
    }

    const { sessionID } = await createUserSession(email, userLoginsFromDB.id);
    return sessionID;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
}
