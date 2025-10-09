"use server";
import { scrypt } from "crypto";
import { promisify } from "util";

const asyncScryptFunction = promisify(scrypt);

export async function passwordHasher(
  password: string,
  passwordSalt: string
): Promise<{ passwordSalt: string; hashedPassword: string }> {
  const createHash = (await asyncScryptFunction(
    password.normalize(),
    passwordSalt,
    64
  )) as Buffer;
  return { passwordSalt, hashedPassword: createHash.toString("hex") };
}
