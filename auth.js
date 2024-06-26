import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import { verifyPassword } from "@/lib/password";

const credentialsConfig = CredentialsProvider({
  name: "Credentials",
  credentials: {
    email: { label: "Email", type: "email" },
    password: { label: "Password", type: "password" },
  },
  async authorize(credentials) {
    console.log(credentials)

    const user = await prisma.users.findFirst({
      where: {
        email: credentials.email,
      }
    });

    console.log("user", user)

    if (!user) {
      return null;
    }

    // Compare the password from the form with the hashed password
    const isValid = verifyPassword(credentials.password, user.password);

    console.log(isValid)

    if (isValid) {
      return user;
    } 

    return null
  },
});

const config = {
  providers: [GoogleProvider, credentialsConfig],
  secret: 'supersecretkey',
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl;
     
      console.log("pathname", pathname, !!auth)
      
      if (pathname === "/dashboard") return !!auth;
      
      return true;
    },
  },
}

export const { handlers, auth, signIn, signOut } = NextAuth(config);