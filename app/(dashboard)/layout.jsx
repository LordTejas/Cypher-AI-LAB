'use client';

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import SideBar from "@/app/_components/SideBar/SideBar";

export default function Layout({ children }) {

  const router = useRouter()
  const { data: session, status } = useSession()

  // If session is loading, display loading message
  if (status === "loading") {
    return <p>Loading...</p>
  }

  // If no session exists, display access denied message
  if (status === "unauthenticated") {
    alert("Please Login to continue.")
    router.push("/auth/login")
  }

  return (
    <main className="h-screen w-screen grid grid-cols-5">

      <div className="col-span-1 h-full">
        <SideBar />
      </div>

      <div className='col-span-4 h-full bg-neutral-100 flex flex-col justify-between items-center'>
        {children}
        <p>Session: {JSON.stringify(session)}</p>
      </div>

    </main>
  );
}
