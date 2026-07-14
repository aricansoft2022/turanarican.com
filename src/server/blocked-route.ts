import { NextResponse } from "next/server";

export function blockedRoute() {
  return new NextResponse("Not found", { status: 404 });
}
