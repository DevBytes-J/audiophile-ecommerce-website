// app/api/send-email/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();
  // send email logic here
  return NextResponse.json({ message: "Email sent" });
}

// Optional: export default for TS module import
export default POST;
