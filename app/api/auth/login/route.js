import { NextResponse } from "next/server";
import { signJwt, AUTH_COOKIE_NAME } from "../../../../lib/jwt";
import { getRoleFromEmail } from "../../../../lib/auth";
import connectToDatabase from "../../../../lib/mongodb";
import User from "../../../../models/User";

export async function POST(request) {
  await connectToDatabase();

const { identifier, password, role: requestedRole } = await request.json();

if (!identifier || !password) {
    return NextResponse.json({ message: "Email and password are required." }, { status: 400 });
  }

  // Find user in database
const user = await User.findOne({ $or: [{email: identifier}, {regno: identifier}] });
  if (!user) {
    return NextResponse.json({ message: "User not found. Please register first." }, { status: 404 });
  }

  const role = user.role;
const authToken = signJwt({ regno: user.regno, email: user.email, name: user.name, role }, { expiresIn: "30d" });
  const response = NextResponse.json({
message: `Login successful for ${identifier}`,
    role,
  });

  response.cookies.set(AUTH_COOKIE_NAME, authToken, {
    httpOnly: true,
    path: "/",
    maxAge: 30 * 24 * 60 * 60,
    sameSite: "lax",
  });

  return response;
}
