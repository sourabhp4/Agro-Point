'use client'

import NotFound from "@/components/NotFound"
import SignInButton from "@/components/SignIn/SignInButton"
import { useSearchParams } from "next/navigation"
import { useState } from "react"

const VerifyEmail = () => {

  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  const params = useSearchParams()
  const token = params.get('token')

  const verifyUserEmail = async () => {
    try {
      const response = await fetch(
        `/api/users/verifyEmail`,
        {
          method: "POST",
          headers: {
            Accept: "Application/json",
            "Content-Type": "Application/json",
          },
          body: JSON.stringify({token}),
        }
      )
      const data = await response.json()

      if(data.status !== 200)
        setIsError(true)
      else
        setIsLoading(false)
    } catch (error) {
      setIsError(true)
    }
  }

  useState(() => {
      verifyUserEmail()
  })

  return (
    <>
      {token ?
        <>
          {!isError && isLoading &&
            <div className="bg-background-100 dark:bg-gray-900 p-4 mx-12 rounded-2xl h-[50vh] flex flex-col items-center justify-center">
              <h1 className="text-3xl font-extrabold leading-9 tracking-tight sm:text-4xl sm:leading-10 md:text-5xl md:leading-14 text-center text-primary-400 dark:text-white">
                LOADING ⌛
              </h1>
              <p className="text-center text-black dark:text-primary-200">
                <b>Please don&apos;t close this window.</b>
              </p>
              <p className="text-center text-black dark:text-primary-200">
                Your request for verification is under progress...
              </p>
            </div>
          }
          {!isError && !isLoading &&
            <div className="bg-background-100 dark:bg-gray-900 p-4 mx-12 rounded-2xl h-[50vh] flex flex-col items-center justify-center">
              <h1 className="text-3xl font-extrabold leading-9 tracking-tight sm:text-4xl sm:leading-10 md:text-5xl md:leading-14 text-center text-primary-600 dark:text-white">
                VERIFICATION SUCCESSFUL 🥳
              </h1>
              <p className="text-center text-black dark:text-primary-200">
                Thank you for the verification...😊👍
              </p>
              <div className="mt-4">
                <SignInButton buttonText={'Click to SIGNIN'} />
              </div>
            </div>
          }
          {isError &&
            <div className="bg-background-100 dark:bg-gray-900 p-4 mx-2 sm:mx-12 rounded-2xl h-[50vh] flex flex-col items-center justify-center">
              <h1 className="text-3xl mb-2 font-extrabold leading-9 tracking-tight sm:text-4xl sm:leading-10 md:text-5xl md:leading-14 text-center text-primary-400 dark:text-white">
                ❌
              </h1>
              <h1 className="text-3xl font-extrabold leading-9 tracking-tight sm:text-4xl sm:leading-10 md:text-5xl md:leading-14 text-center text-primary-400 dark:text-white">
                INVALID URL / TIMEOUT
              </h1>
              <p className="text-center text-black dark:text-primary-200">
                <b>Please consider rechecking the RECENT MAIL sent by us.</b>
              </p>
              <p className="text-center text-black dark:text-primary-200 mt-2">
                There may be a chance that you may have already been verified (If URL string is proper).
              </p>
              <div className="mt-4">
                <SignInButton buttonText={'Click to SIGNIN'} />
              </div>
            </div>
          }
        </>
        :
        <NotFound />
      }
    </>
  )
}

export default VerifyEmail