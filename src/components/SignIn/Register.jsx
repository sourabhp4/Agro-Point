'use client'

import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'

import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'

const SignIn = (props) => {

  const { data: session } = useSession()

  if (session) {
    window.location.reload()
  }

  const [userInfo, setUserInfo] = useState({ email: '', password: '', rePassword: '' })
  const [userError, setUserError] = useState('')
  const [userMessage, setUserMessage] = useState('')
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      if (userInfo.email === '' || userInfo.password === '') {
        setUserError('Complete all fields')
        return
      }

      if (userInfo.password.length < 8) {
        setUserError('Length of the Password must atleast be 8 characters')
        return
      }

      if (!/[a-z]/.test(userInfo.password)) {
        setUserError('Password must contain at least one lowercase letter')
        return
      }

      if (!/[A-Z]/.test(userInfo.password)) {
        setUserError('Password must contain at least one uppercase letter')
        return
      }

      if (!/[!@#$%^&*]/.test(userInfo.password)) {
        setUserError('Password must contain at least one special symbol (!@#$%^&*)')
        return
      }

      if (userInfo.password !== userInfo.rePassword) {
        setUserError('Both passwords should match')
        return
      }

      setIsLoading(true)

      const response = await fetch(
        `/api/users/register`,
        {
          method: "POST",
          headers: {
            Accept: "Application/json",
            "Content-Type": "Application/json",
          },
          body: JSON.stringify({ email: userInfo.email, password: userInfo.password }),
        }
      )
      const data = await response.json()
      console.log(data)

      if (data.status !== 200) setUserError(data.error)
      else setUserMessage('Registration Successful, Please check for the email from us, to verify your identity. Only successful verification of email will lead to creation of account.')
      setIsLoading(false)
    } catch (err) {
      console.log(err)
      setUserError('Something went wrong... Please try again after some time')
    }
  }

  const togglePassword = () => {
    setIsPasswordVisible((prevState) => !prevState)
  }

  return (
    <>{!session && props.isRegister &&
      <div className="fixed top-0 left-0 w-[100vw] h-[100vh] flex justify-center items-center z-50 bg-black bg-opacity-80">
        <div className="w-[90vw] h-400 p-6 bg-gradient-to-t from-primary-200 to-gray-200 rounded-md shadow-md sm:max-w-xl ">
          <div className="flex justify-end p-1">
            <button type="button" className="text-yellow-900 bg-transparent hover:bg-yellow-800 hover:text-black rounded-lg p-1.5 ml-auto inline-flex items-center " onClick={props.closeModal}>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            </button>
          </div>
          <div className='flex justify-center'>
            <Image src="/images/agro.png" alt="Logo" width={150} height={100} />
          </div>
          <form onSubmit={handleSubmit}>
            <h2 className='text-black text-center sm:text-xl mb-2'>{!isLoading ? 'REGISTRATION' : 'LOADING...'}</h2>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-800"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                className="block w-full px-4 py-2 mt-2 text-gray-900 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                autoComplete='true'
                onChange={({ target }) => {
                  setUserInfo({ ...userInfo, email: target.value })
                  setUserError('')
                }}
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-800"
              >
                Password
              </label>
              <div className="flex flex-row justify-between w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40">
                <input
                  id="password"
                  type={isPasswordVisible ? "text" : "password"}
                  autoComplete='true'
                  className='w-full mr-1 focus:outline-none bg-white'
                  onChange={({ target }) => {
                    setUserInfo({ ...userInfo, password: target.value })
                    setUserError('')
                  }}
                />
                <label
                  onClick={togglePassword}
                  htmlFor="password"

                >
                  {isPasswordVisible ? (
                    <AiFillEyeInvisible className='text-black text-xl' />
                  ) : (
                    <AiFillEye className='text-black text-xl' />
                  )}
                </label>
              </div>
            </div>

            <div className="mb-2">
              <label
                htmlFor="rePassword"
                className="block text-sm font-semibold text-gray-800"
              >
                Re-Enter Password
              </label>
              <input
                id="rePassword"
                type="password"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                autoComplete='true'
                onChange={({ target }) => {
                  setUserInfo({ ...userInfo, rePassword: target.value })
                  setUserError('')
                }}
              />
            </div>

            {userError &&
              <div className='mt-2 w-3/4 mx-auto'>
                <p className='bg-background-100 text-red-700 text-xs text-center w-fit mx-auto p-2 rounded-2xl transition-all'>{userError}</p>
              </div>
            }
            {userMessage &&
              <div className='mt-2 w-3/4 mx-auto'>
              <p className='bg-background-100 text-primary-800 text-xs text-center w-fit mx-auto p-2 rounded-2xl transition-all'>{userMessage}</p>
            </div>
            }

            <div className="mt-2">
              <button
                className="w-full px-4 py-2 mt-4 tracking-wide text-white transition-colors duration-200 transform bg-yellow-700 rounded-md hover:bg-yellow-600 focus:outline-none focus:bg-yellow-600"
                disabled={userMessage || isLoading ? true : false}
              >
                Register
              </button>
            </div>
          </form>

          {/* <div className="relative flex items-center justify-center w-full mt-6 border border-t">
            <div className="absolute px-5 bg-transparent text-black">OR</div>
          </div>

          <div className="flex mt-4 gap-x-2">
            <button
              type="button"
              className="flex items-center text-black justify-center w-full p-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-offset-1 focus:ring-blue-600"
            >
              <FcGoogle /> <span className="mx-2 font-serif">Google</span>
            </button>
          </div> */}

          <p className="mt-4 text-sm text-center text-gray-700">
            Already a user?{" "}
            <span
              className="font-medium text-blue-600 hover:underline"
              onClick={() => {
                setUserInfo({ email: '', password: '', rePassword: '' })
                setUserError('')
                props.setIsRegister(false)
              }
              }
            >
              SignIn Here
            </span>
          </p>
        </div>
      </div>
    }
    </>
  )
}

export default SignIn


function togglePasswordVisibility() {
  setIsPasswordVisible((prevState) => !prevState);
}

{/* <div className="relative w-1/4 container mx-auto mt-20">
      <input
        type={isPasswordVisible ? "text" : "password"}
        placeholder="Password"
        className="w-full
        px-4
        py-2
        text-base
        border border-gray-300
        rounded
        outline-none
        focus:ring-blue-500 focus:border-blue-500 focus:ring-1"
      />
      <button
        className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600"
        onClick={togglePasswordVisibility}
      >
        {isPasswordVisible ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        )}
      </button>
    </div> */}