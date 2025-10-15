import { deleteUserSession } from "@/actions/auth/session";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    console.log("running");

    await deleteUserSession();
    const response = NextResponse.redirect(new URL("/", req.url));
    response.cookies.delete("SID");
    response.cookies.delete("email");
    return response;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      return NextResponse.json({ error: "Failed to log out" }, { status: 500 });
    }
  }
}
