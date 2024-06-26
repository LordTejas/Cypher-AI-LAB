'use client';

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import SideBar from "@/app/_components/SideBar/SideBar";
import { useSnackbar } from "notistack";

export default function Layout({ children }) {

  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter()
  const { data: session, status } = useSession()

  // If session is loading, display loading message
  if (status === "loading") {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <div className="animate-spin w-6 h-6 border-2 border-solid rounded-full border-slate-300 border-r-slate-900">
        </div>
      </div>
    )
  }

  return (
    <main className="h-screen w-screen grid grid-cols-5 overflow-hidden">

      <div className="col-span-1 h-full">
        <SideBar />
      </div>

      <div className='col-span-4 h-full bg-neutral-100 flex flex-col justify-between items-center'>
        {children}
      </div>

    </main>
  );
}
