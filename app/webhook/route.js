import { NextResponse } from "next/server";

export function POST() {
  try {

  } catch (error) {
    console.error(error)
    return NextResponse.error(new Error('INTERNAL_SERVER_ERROR'))
  }
}