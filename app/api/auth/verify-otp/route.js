import { NextResponse } from "next/server";
import { verifyJwt, signJwt, TEMP_REGISTER_COOKIE_NAME, AUTH_COOKIE_NAME } from "../../../../lib/jwt";
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

    if (!payload.profile) {
      return NextResponse.json({ message: "Profile data missing. Please register again." }, { status: 400 });
    }
    const profile = payload.profile;
    const role = profile.role;

    const year =
      new Date()
        .getFullYear()
        .toString()
        .slice(-2);

    const prefix =
      role === 'patient'
        ? 'PAT'
        : role === 'doctor'
          ? 'DOC'
          : 'ADM';

    const regPrefix =
      `${prefix}${year}`;


    // find last user with same prefix

    const lastUser =
      await User.findOne({

        regno:
          new RegExp(`^${regPrefix}`)

      })

        .sort({ regno: -1 });


    let nextNumber = 1;


    if (lastUser?.regno) {

      const lastSeq =
        parseInt(
          lastUser.regno.slice(-4)
        );

      nextNumber =
        lastSeq + 1;

    }


    const regno =
      `${regPrefix}${nextNumber
        .toString()
        .padStart(4, "0")
      }`;

    // Check if user already exists
    const existingUser = await User.findOne({ email: payload.email });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }

    // Create new user
    const newUser = new User({
      regno,
      email: payload.email,
      ...profile,
    });
    await newUser.save();

    const authToken = signJwt({ regno, email: payload.email, role }, { expiresIn: "30d" });
    const response = NextResponse.json({ message: "OTP verified successfully. Welcome, " + profile.name, role });

    response.cookies.set(AUTH_COOKIE_NAME, authToken, {
      httpOnly: true,
      path: "/",
      maxAge: 30 * 24 * 60 * 60, // 30 days
      sameSite: "lax",
    });
    response.cookies.delete(TEMP_REGISTER_COOKIE_NAME, { path: "/" });

    return response;
  } catch (error) {
    console.error("JWT verification error:", error.message);
    return NextResponse.json({ message: "Invalid or expired registration token." }, { status: 400 });
  }
}
