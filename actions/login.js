"use server"

import { signIn } from "@/auth";

export const login = async (formData) => {
  const email = formData.get('email');
  const password = formData.get('password');
  
   const redirectUrl = await signIn("credentials", {
    email,
    password,
    redirect: false,
    redirectTo: '/'
  });

  return redirectUrl;
}

