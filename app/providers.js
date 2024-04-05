"use client"

import { SessionProvider } from "next-auth/react";
import { SnackbarProvider } from "notistack";

function Providers({ children }) {

  return <SessionProvider>
    <SnackbarProvider preventDuplicate>
      {children}
    </SnackbarProvider>
  </SessionProvider>
}

export default Providers;