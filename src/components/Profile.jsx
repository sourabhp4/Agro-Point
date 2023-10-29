'use client'

import { useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { BsFillPlusCircleFill } from 'react-icons/bs'

const Profile = ({ user }) => {

  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false)
  const [isOldPasswordVisible, setIsOldPasswordVisible] = useState(false)
  const [userName, setUserName] = useState(user.username)
  const [userInfo, setUserInfo] = useState({
    email: user.email,
    password: '',
    userName: user.username,
    oldPassword: '',
    newPassword: '',
    newRePassword: '',
  })

  const [userNameError, setUserNameError] = useState('')
  const [userPassError, setUserPassError] = useState('')

  const handleSubmitUsername = async (e) => {
    e.preventDefault()
    try {
      if (userInfo.userName === userName) {
        setUserNameError('No change found in the username')
        return
      }
      if (userInfo.email === '' || userInfo.password === '') {
        setUserNameError('Complete all fields')
        return
      }

      const response = await fetch(
        `/api/users/updateUsername`,
        {
          method: "POST",
          headers: {
            Accept: "Application/json",
            "Content-Type": "Application/json",
          },
          body: JSON.stringify({ id: user.id, email: userInfo.email, password: userInfo.password, username: userInfo.userName }),
        }
      )
      const data = await response.json()

      if (data.status !== 200) setUserNameError(data.error)
      else {
        setUserName(userInfo.userName)
        setUserInfo({
          ...userInfo,
          password: ''
        })
        // window.location.reload()
      }

    } catch (err) {
      console.log(err)
      setUserNameError('Something went wrong... Try again')
    }
  }

  const handleSubmitPassword = async (e) => {
    e.preventDefault()
    try {
      if (userInfo.email === '' || userInfo.newPassword === '') {
        setUserPassError('Complete all fields')
        return
      }

      if (userInfo.newPassword.length < 8) {
        setUserPassError('Length of the Password must atleast be 8 characters')
        return
      }

      if (!/[a-z]/.test(userInfo.newPassword)) {
        setUserPassError('Password must contain at least one lowercase letter')
        return
      }

      if (!/[A-Z]/.test(userInfo.newPassword)) {
        setUserPassError('Password must contain at least one uppercase letter')
        return
      }

      if (!/[!@#$%^&*]/.test(userInfo.newPassword)) {
        setUserPassError('Password must contain at least one special symbol (!@#$%^&*)')
        return
      }

      if (userInfo.newPassword !== userInfo.newRePassword) {
        setUserPassError('Both passwords should match')
        return
      }

      const response = await fetch(
        `/api/users/updatePassword`,
        {
          method: "POST",
          headers: {
            Accept: "Application/json",
            "Content-Type": "Application/json",
          },
          body: JSON.stringify({ id: user.id, email: userInfo.email, password: userInfo.oldPassword, newPassword: userInfo.newPassword }),
        }
      )
      const data = await response.json()

      if (data.status !== 200) setUserPassError(data.error)
      else {
        setUserInfo({
          ...userInfo,
          oldPassword: '',
          newPassword: '',
          newRePassword: '',
        })
        // window.location.reload()
      }

    } catch (err) {
      console.log(err)
      setUserPassError('Something went wrong... Try again')
    }
  }

  const togglePassword = () => {
    setIsPasswordVisible((prevState) => !prevState)
  }

  const togglePasswordOld = () => {
    setIsOldPasswordVisible((prevState) => !prevState)
  }

  const togglePasswordNew = () => {
    setIsNewPasswordVisible((prevState) => !prevState)
  }

  return (
    <>
      <div className="flex flex-col md:flex-row justify-center gap-2 md:mx-4">
        <div className="flex flex-col items-center mx-4 w-full md:w-[30vw]">
          <Image
            src='/images/farmer.png'
            alt="avatar"
            width={200}
            height={200}
            className="h-48 w-48 rounded-full"
          />
          <h3 className="pb-2 pt-4 text-2xl font-bold leading-8 text-center text-yellow-700">
            Hey <b className='text-yellow-600'>{userName} </b>... 👋🏼
          </h3>
          <div className="text-black dark:text-white">Welcome to your <b>PROFILE</b></div>
        </div>
        <div className="flex flex-col mx-auto md:mx-none w-[90vw] md:w-[60vw] items-center bg-background-100 dark:to-gray-700 rounded-xl shadow-md">
          {user.isAdmin &&
            <>
              <div className='flex items-center gap-2 mt-4 flex-col md:flex-row'>
                <h2 className='font-bold text-black'>Want to Add Product... ?</h2>
                <Link
                  href='/addproduct'
                  className='flex gap-2 items-center text-lg bg-primary-900 p-2 rounded text-white dark:text-black hover:scale-105 transition-all'
                >
                  <BsFillPlusCircleFill />CLICK HERE
                </Link>
              </div>
              <div className='border border-gray-400 w-4/5 mt-4'></div>
            </>
          }
          <div className="w-full px-4 md:px-12">
            <h3 className='mt-4 text-center text-black'>CHANGE USERNAME</h3>
            <form className="mt-2" onSubmit={handleSubmitUsername}>
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
                  value={userInfo.userName}
                  onChange={({ target }) => {
                    setUserInfo({ ...userInfo, userName: target.value })
                    setUserNameError('')
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
                    value={userInfo.password}
                    className='w-full mr-1 focus:outline-none bg-white'
                    onChange={({ target }) => {
                      setUserInfo({ ...userInfo, password: target.value })
                      setUserNameError('')
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
                href="/forgotPassword"
                className="text-sm text-blue-600 hover:underline"
              >
                <u>Forgot Password</u>
              </Link>

              {userNameError &&
                <div>
                  <p className='text-red-500 text-xs w-fit mx-auto p-2 rounded-2xl transition-all'>{userNameError}</p>
                </div>
              }

              <div className="mt-2">
                <button
                  className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-primary-600 rounded-md hover:bg-primary-800 focus:outline-none focus:bg-primary-800"
                >
                  Update UserName
                </button>
              </div>
            </form>
          </div>

          <div className='border border-gray-400 w-4/5 mt-4'></div>

          <div className="w-full px-4 md:px-12">
            <h3 className='mt-4 text-center text-black'>CHANGE PASSWORD</h3>
            <form className="mt-2" onSubmit={handleSubmitPassword}>
              <div className="mb-4">
                <div className="mb-2">
                  <label
                    htmlFor="oldPassword"
                    className="block text-sm font-semibold text-gray-800"
                  >
                    Enter Old Password
                  </label>
                  <div className="flex flex-row justify-between w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40">
                    <input
                      id="oldPassword"
                      type={isOldPasswordVisible ? "text" : "password"}
                      className='w-full mr-1 focus:outline-none bg-white'
                      autoComplete='true'
                      value={userInfo.oldPassword}
                      onChange={({ target }) => {
                        setUserInfo({ ...userInfo, oldPassword: target.value })
                        setUserPassError('')
                      }}
                    />
                    <label
                      onClick={togglePasswordOld}
                      htmlFor="oldPassword"

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
                  href="/forgotPassword"
                  className="text-sm text-blue-600 hover:underline"
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
                    value={userInfo.newPassword}
                    className='w-full mr-1 focus:outline-none bg-white'
                    onChange={({ target }) => {
                      setUserInfo({ ...userInfo, newPassword: target.value })
                      setUserPassError('')
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
                  value={userInfo.newRePassword}
                  onChange={({ target }) => {
                    setUserInfo({ ...userInfo, newRePassword: target.value })
                    setUserPassError('')
                  }}
                />
              </div>

              {userPassError &&
                <div>
                  <p className='text-red-500  text-xs w-fit mx-auto p-2 rounded-2xl transition-all'>{userPassError}</p>
                </div>
              }

              <div className="mt-2 mb-4">
                <button
                  className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-primary-600 rounded-md hover:bg-primary-800 focus:outline-none focus:bg-primary-800"
                >
                  Update Password
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