'use client';


import { useSession } from "next-auth/react";
import SideBar from "@/app/_components/SideBar/SideBar";

export default function Home() {
  
  const session = useSession();

  return (
    <main className="h-screen w-screen grid grid-cols-5">

      <div className="col-span-1 h-full">
      <SideBar />       
      </div>

      <div className="col-span-4 h-full bg-neutral-100 flex flex-col justify-between items-center">
        <h1>Dashboard</h1>
        <p>Welcome to the dashboard</p>
        <p>Session: {JSON.stringify(session)}</p>
      </div>

    </main>
  );
}
