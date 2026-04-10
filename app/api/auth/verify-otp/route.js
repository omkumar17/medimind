import { NextResponse } from "next/server";
import { verifyJwt, signJwt, TEMP_REGISTER_COOKIE_NAME, AUTH_COOKIE_NAME } from "../../../../lib/jwt";
import { getRoleFromEmail } from "../../../../lib/auth";
import connectToDatabase from "../../../../lib/mongodb";
import User from "../../../../models/User";
import Otp from "../../../../models/Otp";

export async function POST(request) {
  await connectToDatabase();

  const { otp } = await request.json();
  const tempToken = request.cookies.get(TEMP_REGISTER_COOKIE_NAME)?.value;

  if (!tempToken) {
    return NextResponse.json({ message: "Registration session expired. Please register again." }, { status: 400 });
  }

  try {
    console.log("Verifying tempToken:", tempToken);
    const payload = verifyJwt(tempToken);

    // Find the OTP in database
    const storedOtp = await Otp.findOne({ email: payload.email, code: otp });
    console.log(`Verifying OTP for ${payload.email}: provided ${otp}, stored ${storedOtp?.code}`); // For testing purposes
    if (!storedOtp) {
      return NextResponse.json({ message: "Invalid or expired OTP." }, { status: 400 });
    }

    // Delete the used OTP
    await Otp.deleteOne({ _id: storedOtp._id });

    const role = getRoleFromEmail(payload.email);

    // Check if user already exists
    const existingUser = await User.findOne({ email: payload.email });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }

    // Create new user
    const newUser = new User({
      email: payload.email,
      role,
    });
    await newUser.save();

    const authToken = signJwt({ email: payload.email, role }, { expiresIn: "7d" });
    const response = NextResponse.json({ message: "OTP verified successfully", role });

    response.cookies.set(AUTH_COOKIE_NAME, authToken, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "lax",
    });
    response.cookies.delete(TEMP_REGISTER_COOKIE_NAME, { path: "/" });

    return response;
  } catch (error) {
    console.error("JWT verification error:", error.message);
    return NextResponse.json({ message: "Invalid or expired registration token." }, { status: 400 });
  }
}
