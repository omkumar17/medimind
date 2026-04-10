import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyJwt, AUTH_COOKIE_NAME } from "../../../../lib/jwt";
import connectToDatabase from "../../../../lib/mongodb";
import User from "../../../../models/User";

export async function GET() {
  await connectToDatabase();

  const token = cookies().get(AUTH_COOKIE_NAME)?.value;

  if (!token) {
    return NextResponse.json({ user: null });
  }

  try {
    const payload = verifyJwt(token);
    const user = await User.findOne({ email: payload.email });
    if (!user) {
      return NextResponse.json({ user: null });
    }
    return NextResponse.json({ user: { email: user.email, role: user.role } });
  } catch {
    return NextResponse.json({ user: null });
  }
}
