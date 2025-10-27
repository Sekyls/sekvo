import { NextResponse } from "next/server";
import { LoginDataSchema } from "@/lib/miscellany/schema";
import { SESSION_EXPIRATION } from "@/lib/miscellany/constants";
import { logUserIn } from "@/actions/auth/login-auth";

export async function POST(req: Request) {
  try {
    const reqBody = await req.json();
    const { email, password } = await LoginDataSchema.parseAsync(reqBody);
    const sessionID = await logUserIn(email, password);
    if (sessionID) {
      const response = NextResponse.json({
        success: true,
        status: 201,
        error: null,
      });
      response.cookies.set({
        name: "SID",
        value: sessionID,
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: SESSION_EXPIRATION,
      });
      response.cookies.set({
        name: "email",
        value: email,
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: SESSION_EXPIRATION,
      });
      return response;
    }
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({
        success: false,
        status: 400,
        error: error.message,
      });
    }
  }
}
