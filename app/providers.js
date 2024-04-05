"use client"

import { SessionProvider } from "next-auth/react";
import { SnackbarProvider } from "notistack";

function Providers({ children }) {

  return <SnackbarProvider>
    <SessionProvider>
      {children}
    </SessionProvider>
  </SnackbarProvider>
}

export default Providers;