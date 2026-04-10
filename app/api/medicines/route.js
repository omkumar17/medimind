import { NextResponse } from "next/server";

const alternatives = {
  paracetamol: ["Ibuprofen", "Naproxen", "Aspirin"],
  ibuprofen: ["Naproxen", "Diclofenac", "Ketoprofen"],
  amoxicillin: ["Azithromycin", "Cefalexin", "Clarithromycin"],
};

export async function POST(request) {
  const { name = "" } = await request.json();
  const key = name.trim().toLowerCase();
  const result = alternatives[key] || ["No alternatives found. Try another medicine."];

  return NextResponse.json({ alternatives: result });
}
