import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  const link = `http://localhost:3000/record/${body.id}`;

  return NextResponse.json({ link });
}
