import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials";

const credentialsConfig = CredentialsProvider({
  name: "Credentials",
  credentials: {
    email: { label: "Email", type: "email"},
    password: { label: "Password", type: "password" },
  },
  async authorize(credentials) {
    console.log(credentials)
    if (credentials.email === "tejas@gmail.com" && credentials.password === "2") {
      return {
        name: "Tejas",
      };
    } else return null;
  },
});

const config = {
  providers: [GoogleProvider, credentialsConfig],
  secret: 'supersecretkey',
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl;
      if (pathname === "/middleware-page") return !!auth;
      return true;
    },
  },
}

export const { handlers, auth, signIn, signOut } = NextAuth(config);