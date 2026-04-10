import { NextResponse } from "next/server";
import { signJwt, AUTH_COOKIE_NAME } from "../../../../lib/jwt";
import { getRoleFromEmail } from "../../../../lib/auth";
import connectToDatabase from "../../../../lib/mongodb";
import User from "../../../../models/User";

export async function POST(request) {
  await connectToDatabase();

  const { email, password, role: requestedRole } = await request.json();

  if (!email || !password) {
    return NextResponse.json({ message: "Email and password are required." }, { status: 400 });
  }

  // Find user in database
  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ message: "User not found. Please register first." }, { status: 404 });
  }

  const inferredRole = getRoleFromEmail(email);
  const role = requestedRole || inferredRole;
  const authToken = signJwt({ email, role }, { expiresIn: "7d" });
  const response = NextResponse.json({
    message: `Login successful for ${email}`,
    role,
  });

  response.cookies.set(AUTH_COOKIE_NAME, authToken, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
    sameSite: "lax",
  });

  return response;
}
