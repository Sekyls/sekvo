"use server";

import { prisma } from "@/lib/clients/prisma";
import { LoginDataSchema } from "@/lib/schema";
import z4 from "zod/v4";
import { passwordHasher } from "./password-hasher";
import createUserSession from "./session";
import { cookies } from "next/headers";
import { SESSION_EXPIRATION } from "@/lib/constants";
import { timingSafeEqual } from "crypto";

export async function logUserIn(credentials: z4.infer<typeof LoginDataSchema>) {
  try {
    const { email, password } = await LoginDataSchema.parseAsync(credentials);
    const userLoginsFromDB = await prisma.verifiedUsers.findUnique({
      where: {
        email,
      },
      select: {
        email: true,
        hashedPassword: true,
        passwordSalt: true,
        id: true,
      },
    });

    if (!userLoginsFromDB) {
      throw new Error("Email does not exist");
    }

    const { hashedPassword: hashedSubmittedPassword } = await passwordHasher(
      password,
      userLoginsFromDB.passwordSalt
    );

    const hashedSubmittedPasswordBuffer = Buffer.from(
      hashedSubmittedPassword,
      "hex"
    );
    const hashedPasswordFromDBBUffer = Buffer.from(
      userLoginsFromDB.hashedPassword,
      "hex"
    );
    if (
      hashedSubmittedPasswordBuffer.length !== hashedPasswordFromDBBUffer.length
    ) {
      throw new Error("Invalid password");
    }
    const passwordsMatches = timingSafeEqual(
      hashedSubmittedPasswordBuffer,
      hashedPasswordFromDBBUffer
    );

    if (!passwordsMatches) {
      throw new Error("Invalid password");
    }

    const { sessionID } = await createUserSession(email, userLoginsFromDB.id);
    (await cookies()).set({
      name: "SID",
      value: sessionID,
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      maxAge: SESSION_EXPIRATION * 1000,
    });
  } catch (error) {
    throw error;
  }
}
