import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const users = await prisma.users.findMany()
    return NextResponse.json({
      code: 200,
      message: 'users',
      data: users
    }, { status: 200 })

  } catch (error) {
    return NextResponse.json({
      code: 500,
      message: 'Internal Server Error',
    }, { status: 500 })
  }
}