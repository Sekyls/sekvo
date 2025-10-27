"use server";

import { prisma } from "@/lib/clients/prisma";
import { cookies } from "next/headers";

export default async function getVerifiedUser() {
  const email = (await cookies()).get("email")?.value;
  return await prisma.verifiedUsers.findUnique({
    where: { email },
    select: {
      name: true,
      address: true,
      email: true,
      phoneNumber: true,
      logo: true,
    },
  });
}
