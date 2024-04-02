import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(request) {
  try {
    const { email } = await request.json()

    const user = await prisma.users.findUnique({
      where: {
        email
      }
    })

    if (!user) {
      return NextResponse.json({
        code: 404,
        message: "User not found"
      }, { status: 404 });
    }

    return NextResponse.json({
      code: 200,
      message: "User found",
      data: user
    }, { status: 200 });

  } catch (error) {
    console.error(error.message);
    return NextResponse.json({
      code: 500,
      message: "Internal server error"
    }, { status: 500 });
  }
}