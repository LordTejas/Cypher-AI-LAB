'use server'

import prisma from "@/lib/prisma"


export const getUserByEmail = async (email) => {
  try {
    const user = await prisma.users.findUnique({
      where: {
        email
      }
    })

    return user

  } catch (error) {
    console.error(error.message)
    return null
  }
}

export const updateUserByEmail = async (data) => {
  try {
    const user = await prisma.users.update({
      where: {
        email: data.email
      },
      data
    })

    return user

  } catch (error) {
    console.error(error.message)
    return null
  }
}