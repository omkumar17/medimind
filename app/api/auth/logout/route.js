import { NextResponse } from "next/server";
import { AUTH_COOKIE_NAME } from "../../../../lib/jwt";

export async function GET(request) {
  const response = NextResponse.redirect(new URL("/login", request.url));
  response.cookies.delete(AUTH_COOKIE_NAME, { path: "/" });
  return response;
}
