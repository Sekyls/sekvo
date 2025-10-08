"use server";
import { scrypt } from "crypto";
import { promisify } from "util";
const asyncScryptFunction = promisify(scrypt);
export async function passwordHasher(
  password: string,
  salt: string
): Promise<string> {
  const hashedPassword = (await asyncScryptFunction(
    password.normalize(),
    salt,
    64
  )) as Buffer;
  return hashedPassword.toString("hex");
}
