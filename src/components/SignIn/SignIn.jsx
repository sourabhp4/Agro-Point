'use client'

import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'

import { signIn } from 'next-auth/react'

import Link from 'next/link'

import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'

const SignIn = (props) => {

  const { data: session } = useSession()

  if (session) {
    window.location.reload()
  }

  const [userInfo, setUserInfo] = useState({ email: '', password: '' })
  const [userError, setUserError] = useState('')
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      if (userInfo.email === '' || userInfo.password === ''){
        setUserError('Complete all fields')
        return
      }

      const res = await signIn("credentials", {
        email: userInfo.email,
        password: userInfo.password,
        redirect: false,
      })

      if (res.error) setUserError('Invalid Credentials')
      else {
        window.location.reload()
      }

    } catch (err) {
      console.log(err)
      setUserError('Something went wrong... Try again')
    }
  }

  const togglePassword = () => {
    setIsPasswordVisible((prevState) => !prevState)
  }

  return (
    <>{!session && !props.isRegister &&
      <div className="fixed top-0 left-0 w-[100vw] h-[100vh] flex justify-center items-center z-50 bg-black bg-opacity-80">
        <div className="w-[90vw] h-400 p-6 bg-gradient-to-t from-primary-200 to-gray-200 rounded-md shadow-md sm:max-w-xl ">
          <div className="flex justify-end p-1">
            <button type="button" className="text-yellow-900 bg-transparent hover:bg-yellow-800 hover:text-black rounded-lg p-1.5 ml-auto inline-flex items-center " onClick={props.closeModal}>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            </button>
          </div>
          <div className='flex justify-center'>
            <Image src="/images/agro.png" alt="Logo" width={150} height={100}></Image>
          </div>
          <form className="mt-2" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-800"
              >
                Email
              </label>
              <input
                id="email"
                type="text"
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
                    <AiFillEyeInvisible className='text-black' />
                  ) : (
                    <AiFillEye className='text-black' />
                  )}
                </label>
              </div>
            </div>
            <Link
              href="/auth/forgotPassword"
              className="text-sm text-blue-600 hover:underline"
            >
              <u>Forgot Password</u>
            </Link>

            {userError &&
              <div>
                <p className='bg-red-500 text-white text-xs w-fit mx-auto p-2 rounded-2xl transition-all'>{userError}</p>
              </div>
            }

            <div className="mt-2">
              <button
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-yellow-700 rounded-md hover:bg-yellow-600 focus:outline-none focus:bg-yellow-600"
              >
                Sign In
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
            Not Having account?{" "}
            <span
              className="font-medium text-blue-600 hover:underline"
              onClick={() => {
                  setUserInfo({ email: '', password: '' })
                  setUserError('')
                  props.setIsRegister(true)
                }
              }
            >
              Register Here
            </span>
          </p>
        </div>
      </div>
    }
    </>
  )
}

export default SignIn