import { NextResponse } from "next/server";
import { signJwt, TEMP_REGISTER_COOKIE_NAME } from "../../../../lib/jwt";
import connectToDatabase from "../../../../lib/mongodb";
import Otp from "../../../../models/Otp";

export async function POST(request) {
  await connectToDatabase();

  const { email } = await request.json();

  // Generate a random 6-digit OTP
  const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
  console.log(`Generated OTP for ${email}: ${otpCode}`); // For testing purposes, log the OTP

  // Save OTP to database
  const newOtp = new Otp({
    code: otpCode,
    email,
  });
  await newOtp.save();

  const tempToken = signJwt({ email, action: "register" }, { expiresIn: "30m" });

  const response = NextResponse.json({
    message: `OTP sent to ${email}`,
  });

  response.cookies.set(TEMP_REGISTER_COOKIE_NAME, tempToken, {
    httpOnly: true,
    path: "/",
    maxAge: 1800,
    sameSite: "lax",
  });

  return response;
}
