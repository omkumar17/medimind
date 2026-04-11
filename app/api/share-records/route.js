import { NextResponse } from "next/server";
import { verifyJwt, AUTH_COOKIE_NAME } from "../../../lib/jwt";
import connectToDatabase from "../../../lib/mongodb";
import Record from "../../../models/Record";
import Prescription from "../../../models/Prescription";
import mongoose from "mongoose";

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
      payload;

  } catch {

    return NextResponse.json(
      { message: "Invalid token" },
      { status: 401 }
    );

  }


  const {
    doctorRegno,
    recordIds,
    prescriptionIds
  } =
    await request.json();


  // SHARE RECORDS

  if (recordIds?.length) {

    const objectIds =
      recordIds.map(
        id =>
          new mongoose.Types.ObjectId(id)
      );

    await Record.updateMany(

      {
        _id: { $in: objectIds },
        patientRegno: currentUser.regno
      },

      {
        $addToSet: {
          sharedWithRegnos: doctorRegno
        }
      }

    );

  }


  // SHARE PRESCRIPTIONS

  if (prescriptionIds?.length) {

    const objectIds =
      prescriptionIds.map(
        id =>
          new mongoose.Types.ObjectId(id)
      );

    await Prescription.updateMany(

      {
        _id: { $in: objectIds },
        patientId: currentUser.regno
      },

      {
        $addToSet: {
          sharedWith: doctorRegno
        }
      }

    );

  }


  return NextResponse.json({

    message: "Items shared successfully"

  });

}