'use client'

import { useState, useEffect } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { BsFillPlusCircleFill } from 'react-icons/bs'
import { useSession } from 'next-auth/react'
import ContentLock from './ContentLock'
import Loading from './Loading'

const Profile = () => {

  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false)
  const [isOldPasswordVisible, setIsOldPasswordVisible] = useState(false)

  const [user, setUser] = useState({
    username: '',
    isAdmin: false,
  })

  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
    username: '',
    oldPassword: '',
    newPassword: '',
    newRePassword: '',
  })

  const { data: session, status } = useSession()

  useEffect(() => {
    if (session?.user?.email) {
      setUserInfo({ email: session.user.email, username: session.user?.username })
      setUser({ id: session.user?.id, username: session.user?.username, isAdmin: session.user?.isAdmin })
    }
  }, [session])

  const [userNameMessage, setUserNameMessage] = useState({ message: '', complete: false })
  const [userPassMessage, setUserPassMessage] = useState({ message: '', complete: false })

  const handleSubmitUsername = async (e) => {
    e.preventDefault()
    try {
      if (userInfo.email === '' || userInfo.password === '') {
        setUserNameMessage({ message: 'Complete all fields', complete: false })
        return
      }
      if (userInfo.username === user.username) {
        setUserNameMessage({ message: 'No change found in the username', complete: false })
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
          body: JSON.stringify({ id: user.id, email: userInfo.email, password: userInfo.password, username: userInfo.username }),
        }
      )
      const data = await response.json()

      if (data.status !== 200) setUserNameMessage({ message: data.error, complete: false })
      else {
        setUserNameMessage({ message: 'Username Updated Successfully', complete: true })
        setUser({ ...user, username: userInfo.username })
        setUserInfo({
          ...userInfo,
          password: ''
        })
      }

    } catch (err) {
      console.log(err)
      setUserNameMessage({ message: 'Something went wrong... Try again', complete: false })
    }
  }

  const handleSubmitPassword = async (e) => {
    e.preventDefault()
    try {
      if (userInfo.email === '' || userInfo.newPassword === '') {
        setUserPassMessage({ message: 'Complete all fields', complete: false })
        return
      }
      console.log('hello')
      if (userInfo.newPassword.length < 8) {
        setUserPassMessage({ message: 'Length of the Password must atleast be 8 characters', complete: false })
        return
      }

      if (!/[a-z]/.test(userInfo.newPassword)) {
        setUserPassMessage({ message: 'Password must contain at least one lowercase letter', complete: false })
        return
      }

      if (!/[A-Z]/.test(userInfo.newPassword)) {
        setUserPassMessage({ message: 'Password must contain at least one uppercase letter', complete: false })
        return
      }

      if (!/[!@#$%^&*]/.test(userInfo.newPassword)) {
        setUserPassMessage({ message: 'Password must contain at least one special symbol (!@#$%^&*)', complete: false })
        return
      }

      if (userInfo.newPassword !== userInfo.newRePassword) {
        setUserPassMessage({ message: 'Both passwords should match', complete: false })
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

      if (data.status !== 200) setUserPassMessage({ message: data.error, complete: false })
      else {
        setUserInfo({
          ...userInfo,
          oldPassword: '',
          newPassword: '',
          newRePassword: '',
        })
        setUserPassMessage({ message: 'Change of Password Successful', complete: true })
      }

    } catch (err) {
      console.log(err)
      setUserPassMessage({ message: 'Something went wrong... Try again', complete: false })
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
    <>{session &&
      <div className="flex flex-col md:flex-row justify-center gap-2 md:mx-4 bg-white dark:bg-gray-900 p-3 rounded-xl">
        <div className="flex flex-col items-center mx-4 w-full md:w-[30vw] sm:mt-4">
          {session.user && session.user.image ?
            <Image
              src={session.user.image}
              alt="profile"
              priority={false}
              width={200}
              height={200}
              className="h-48 w-48 rounded-full"
            />
            :
            <Image
              src='/images/farmer.png'
              alt="avatar"
              priority={false}
              width={200}
              height={200}
              className="h-48 w-48 rounded-full"
            />
          }
          <h3 className="pb-2 pt-4 text-2xl font-bold leading-8 text-center text-primary-800 dark:text-primary-300">
            Hey <b className='text-primary-600 dark:text-primary-200'>{user.username} </b>... 👋🏼
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
                  className='flex gap-2 items-center text-lg bg-primary-900 p-2 rounded text-white hover:scale-105 transition-all'
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
                  value={userInfo.email || ''}
                />
              </div>
              <div className='mb-2'>
                <label
                  htmlFor="username"
                  className="block text-sm font-semibold text-gray-800"
                >
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-gray-900 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  autoComplete='true'
                  value={userInfo.username || ''}
                  onChange={({ target }) => {
                    setUserInfo({ ...userInfo, username: target.value })
                    setUserNameMessage({ message: '', complete: false })
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
                    value={userInfo.password || ''}
                    className='w-full mr-1 focus:outline-none bg-white'
                    onChange={({ target }) => {
                      setUserInfo({ ...userInfo, password: target.value })
                      setUserNameMessage({ message: '', complete: false })
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

              {userNameMessage.message &&
                <div>
                  <p className={(userNameMessage.complete ? 'text-green-600' : 'text-red-500') + ' text-sm w-fit mx-auto p-2 rounded-2xl transition-all'}>{userNameMessage.message}</p>
                </div>
              }

              <div className="mt-2">
                <button
                  className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-primary-600 rounded-md hover:bg-primary-800 focus:outline-none focus:bg-primary-800"
                >
                  Update Username
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
                      value={userInfo.oldPassword || ''}
                      onChange={({ target }) => {
                        setUserInfo({ ...userInfo, oldPassword: target.value })
                        setUserPassMessage({ message: '', complete: false })
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
                    value={userInfo.newPassword || ''}
                    className='w-full mr-1 focus:outline-none bg-white'
                    onChange={({ target }) => {
                      setUserInfo({ ...userInfo, newPassword: target.value })
                      setUserPassMessage({ message: '', complete: false })
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
                  value={userInfo.newRePassword || ''}
                  onChange={({ target }) => {
                    setUserInfo({ ...userInfo, newRePassword: target.value })
                    setUserPassMessage({ message: '', complete: false })
                  }}
                />
              </div>

              {userPassMessage.message &&
                <div>
                  <p className={(userPassMessage.complete ? 'text-green-600' : 'text-red-500') + ' text-sm w-fit mx-auto p-2 rounded-2xl transition-all'}>{userPassMessage.message}</p>
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
    }
      {!session && status === 'unauthenticated' && <ContentLock />}
      {!session && status === 'loading' && <Loading />}
    </>
  )
}

export default Profile