import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export  function GET() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("authToken")?.value;

    return NextResponse.json({ token: token || null });
  } catch (error) {
    console.error("Error reading cookies:", error);
    return NextResponse.json({ error: "Failed to read cookies" }, { status: 500 });
  }
}
