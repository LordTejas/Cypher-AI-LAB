import { NextResponse } from "next/server"
import { auth } from "./auth"


export default auth((req) => {

  const url = new URL(req.url)
  const newUrl = url.origin + '/auth/login'

  console.log("req.auth", req.auth)

  if (req.auth) {
    return NextResponse.next()
  }
  return NextResponse.redirect(newUrl)
})

export const config = {
  matcher: [
    "/dashboard",
    "/quiz",
    "/summarize",
    "/grammer",
    "/settings"
  ]
}