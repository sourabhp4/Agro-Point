
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const response = NextResponse.json(
      {
        message: "Logout Successful",
        success: true,
        status: 200,
      }
    )
    // response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) })
    response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) })
    return response
  } catch (error) {
    console.log('SignOut: ', error.message)
    return NextResponse.json({ error: 'Something went wrong... Try again after some time', status: 500 })
  }

}
