"use server";

import prisma from "@/lib/prisma";

export const register = async (formData) => {
  const email = formData.get('email');
  const password = formData.get('password');

  const data = {
    email,
    password
  };

  const response = await fetch(`${process.env.BASE_URL}/api/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (response.ok) {
    return response.json();
  } 

  return null;
}