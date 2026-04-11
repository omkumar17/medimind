import { NextResponse } from "next/server";
import { verifyJwt, AUTH_COOKIE_NAME } from "../../../lib/jwt";
import connectToDatabase from "../../../lib/mongodb";
import Prescription from "../../../models/Prescription";
import Record from "../../../models/Record";
import User from "../../../models/User";

export async function POST(request) {

  await connectToDatabase();

  const token =
    request.cookies.get(AUTH_COOKIE_NAME)?.value;

  if (!token) {

    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );

  }

  let currentUser;

  try {

    const payload =
      verifyJwt(token);

    currentUser =
      await User.findOne({
        regno: payload.regno
      });

    if (!currentUser) {

      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );

    }

  } catch (error) {

    return NextResponse.json(
      { message: "Invalid token" },
      { status: 401 }
    );

  }

  const body =
    await request.json();


  const newPrescription =
    new Prescription({

      patientId:
        body.patientId,

      symptoms:
        body.symptoms,

      diagnosis:
        body.diagnosis,

      medicines:
        body.medicines,

      advice:
        body.advice,

      doctorId:
        currentUser.regno,

      sharedWith:
        [currentUser.regno]

    });


  await newPrescription.save();


  await Record.updateMany(

    {
      patientRegno:
        body.patientId
    },

    {
      $addToSet: {

        sharedWithRegnos:
          currentUser.regno

      }
    }

  );


  return NextResponse.json({

    message: "saved",

    prescription:
      newPrescription

  });

}



export async function GET(request) {

  await connectToDatabase();

  const { searchParams } =
    new URL(request.url);

  const patientId =
    searchParams.get("patientId");


  if (patientId) {

    const prescriptions =
      await Prescription.find({
        patientId
      });

    return NextResponse.json(
      prescriptions
    );

  }


  const prescriptions =
    await Prescription.find({});


  return NextResponse.json(
    prescriptions
  );

}