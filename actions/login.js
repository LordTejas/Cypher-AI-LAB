"use server"

import { signIn } from "@/auth";

export const login = (formData) => {
  const email = formData.get('email');
  const password = formData.get('password');
  
  signIn("credentials", {
    email,
    password,
    redirect: false
  });
}

