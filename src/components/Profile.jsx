'use client'

import { useSession } from 'next-auth/react'
import { useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { BsFillPlusCircleFill } from 'react-icons/bs'

const Profile = () => {

  const { data: session } = useSession()

  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false)
  const [userInfo, setUserInfo] = useState({
    email: 'admin@gmail.com',
    password: '',
    userName: '',
    oldPassword: '',
    newPassword: '',
    newRePassword: '',
  })
  const [userError, setUserError] = useState('')

  const userName = "Admin"

  const handleSubmitUsername = async (e) => {
    e.preventDefault()
    try {
      if (userInfo.email === '' || userInfo.password === '') {
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

  const handleSubmitPassword = async (e) => {
    e.preventDefault()
    try {
      if (userInfo.email === '' || userInfo.newPassword === '') {
        setUserError('Complete all fields')
        return
      }

      if (userInfo.newPassword.length < 8) {
        setUserError('Length of the Password must atleast be 8 characters')
        return
      }

      if (!/[a-z]/.test(userInfo.newPassword)) {
        setUserError('Password must contain at least one lowercase letter')
        return
      }

      if (!/[A-Z]/.test(userInfo.newPassword)) {
        setUserError('Password must contain at least one uppercase letter')
        return
      }

      if (!/[!@#$%^&*]/.test(userInfo.newPassword)) {
        setUserError('Password must contain at least one special symbol (!@#$%^&*)')
        return
      }

      if (userInfo.newPassword !== userInfo.newRePassword) {
        setUserError('Both passwords should match')
        return
      }

      const res = await signIn("credentials", {
        email: userInfo.email,
        password: userInfo.newPassword,
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

  const togglePasswordNew = () => {
    setIsNewPasswordVisible((prevState) => !prevState)
  }

  return (
    <>
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-24">
        <div className="flex flex-col items-center">
          <Image
            src='/images/farmer.png'
            alt="avatar"
            width={200}
            height={200}
            className="h-48 w-48 rounded-full"
          />
          <h3 className="pb-2 pt-4 text-2xl font-bold leading-8  text-yellow-600">
            Hey <b className='text-yellow-700'>{userName} </b>... 👋🏼
          </h3>
          <div className="text-gray-500 dark:text-gray-400">Welcome to your <b>PROFILE</b></div>
        </div>
        <div className="flex flex-col w-[90vw] md:w-[60vw] items-center bg-background-100 dark:to-gray-700 rounded-xl shadow-md">
          <div className="w-full px-4 md:px-12">
            <form className="mt-6" onSubmit={handleSubmitUsername}>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-800"
                >
                  Your Email
                </label>
                <input
                  id="email"
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-gray-900 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  readOnly
                  value={userInfo.email}
                />
              </div>
              <div className='mb-2'>
                <label
                  htmlFor="username"
                  className="block text-sm font-semibold text-gray-800"
                >
                  UserName
                </label>
                <input
                  id="username"
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-gray-900 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  autoComplete='true'
                  value={userInfo.userName || userName}
                  onChange={({ target }) => {
                    setUserInfo({ ...userInfo, userName: target.value })
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
                  className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-primary-800 rounded-md hover:bg-yellow-600 focus:outline-none focus:bg-yellow-600"
                >
                  Update UserName
                </button>
              </div>
            </form>
          </div>
          <div className="w-full px-4 md:px-12">
            <form className="mt-6" onSubmit={handleSubmitPassword}>
              <div className="mb-4">
                <label
                  htmlFor="oldPassword"
                  className="block text-sm font-semibold text-gray-800"
                >
                  Enter Old Password
                </label>
                <input
                  id="oldPassword"
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-gray-900 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  autoComplete='true'
                  onChange={({ target }) => {
                    setUserInfo({ ...userInfo, oldPassword: target.value })
                    setUserError('')
                  }}
                />
                <Link
                  href="/auth/forgotPassword"
                  className="text-sm text-blue-600 hover:underline "
                >
                  <u>Forgot Password</u>
                </Link>
              </div>
              <div className="mb-2">
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-semibold text-gray-800"
                >
                  New Password
                </label>
                <div className="flex flex-row justify-between w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40">
                  <input
                    id="newPassword"
                    type={isNewPasswordVisible ? "text" : "password"}
                    autoComplete='true'
                    className='w-full mr-1 focus:outline-none bg-white'
                    onChange={({ target }) => {
                      setUserInfo({ ...userInfo, newPassword: target.value })
                      setUserError('')
                    }}
                  />
                  <label
                    onClick={togglePasswordNew}
                    htmlFor="newPassword"

                  >
                    {isNewPasswordVisible ? (
                      <AiFillEyeInvisible className='text-black' />
                    ) : (
                      <AiFillEye className='text-black' />
                    )}
                  </label>
                </div>
              </div>

              <div className="mb-2">
                <label
                  htmlFor="newRePassword"
                  className="block text-sm font-semibold text-gray-800"
                >
                  Re-Enter New Password
                </label>
                <input
                  id="newRePassword"
                  type="password"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  autoComplete='true'
                  onChange={({ target }) => {
                    setUserInfo({ ...userInfo, newRePassword: target.value })
                    setUserError('')
                  }}
                />
              </div>

              {userError &&
                <div>
                  <p className='bg-red-500 text-white text-xs w-fit mx-auto p-2 rounded-2xl transition-all'>{userError}</p>
                </div>
              }

              <div className="mt-2 mb-4">
                <button
                  className="w-full px-4 py-2 my-2 tracking-wide text-white transition-colors duration-200 transform bg-primary-800 rounded-md hover:bg-yellow-600 focus:outline-none focus:bg-yellow-600"
                >
                  Update UserName
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile