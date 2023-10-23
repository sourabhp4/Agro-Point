import React from 'react'

import { getServerSession } from 'next-auth/next'
import { authOptions } from '../api/auth/[...nextauth]/route'

import SignInButton from '@/components/SignIn/SignInButton'

import { BsFillLockFill } from 'react-icons/bs'

const Profile = async () => {
  const session = await getServerSession(authOptions)

  return (
    <>
      <h1 className='text-center'>YOUR PROFILE</h1>
      {session ? 
        <></>
        :
        <div className='h-[35vh] flex flex-col gap-6 rounded-3xl p-8 items-center bg-gradient-to-t from-gray-700 dark:to-black light:to-white'>
          <BsFillLockFill />
          <SignInButton buttonText={'Sign In to View'} />
        </div>
      }
    </>
  )
}

export default Profile