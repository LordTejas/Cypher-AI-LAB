import { NextResponse } from 'next/server'
import { customAlphabet, urlAlphabet } from 'nanoid'
import { encodePassword } from '@/lib/password'

// Import Prisma client from @/lib/prisma.js file instead of @prisma/client
// We  do this to prevent multiple instances of PrismaClient in development mode
import prisma from '@/lib/prisma'

const generateUserNameSuffix = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz", 12)
const userId = customAlphabet(urlAlphabet, 16)

export async function POST(request) {
  try {
    const { email, password } = await request.json()
    console.log("Register", email, password);

    // Generate username from email
    const username = `user_${generateUserNameSuffix()}`

    // Hash password using secret key
    const hashedPassword = encodePassword(password)

    const user = {
      userId: userId(), // Generate unique user id
      username,
      email,
      password: hashedPassword
    }

    // Create user
    const newUser = await prisma.users.create({
      data: user
    })

    return NextResponse.json({
      code: 201,
      message: "User created successfully",
      data: newUser
    }, { status: 201 });

  } catch (error) {
    console.error(error.message);
    return NextResponse.json({
      code: 500,
      message: "Internal server error"
    }, { status: 500 });
  }
}