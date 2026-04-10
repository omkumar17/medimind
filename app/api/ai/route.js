import { NextResponse } from "next/server";

export async function POST(request) {
  const { symptoms = "" } = await request.json();

  const reply = symptoms
    ? `Based on your symptoms, it may help to rest, stay hydrated, and monitor your condition. If symptoms worsen, please consult a doctor.`
    : "Please provide some symptoms so I can help.";

  return NextResponse.json({ reply });
}
