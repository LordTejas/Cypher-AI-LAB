'use client';
import { useSession } from "next-auth/react";


export default function Home() {
  
  const session = useSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Hello Cypher</h1>
      {JSON.stringify(session, null, 2)}
    </main>
  );
}
